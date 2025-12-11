'use client';

/**
 * Guru Asia - GuruMapView
 * Интерактивная карта OSM с маркерами объектов
 */

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { ArrowRight } from 'lucide-react';
import type { GuruObjectWithDistance, Coordinates, RadiusOption } from './types';
import { MARKER_COLORS, OBJECT_TYPE_LABELS } from './types';
import { formatDistance, formatWalkingTime } from './utils/geo';

// =============================================================================
// Типы
// =============================================================================

interface GuruMapViewProps {
  objects: GuruObjectWithDistance[];
  userPosition: Coordinates | null;
  radius: RadiusOption;
  selectedObjectId: string | null;
  onObjectSelect: (objectId: string) => void;
  onMapMove?: (center: Coordinates) => void;
  className?: string;
}

interface MapControllerProps {
  center: Coordinates | null;
  onMapMove?: (center: Coordinates) => void;
}

// =============================================================================
// Кастомные иконки маркеров
// =============================================================================

const createMarkerIcon = (color: string, isSelected: boolean = false) => {
  const size = isSelected ? 32 : 24;
  const svgMarker = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
            fill="${color}" 
            stroke="${isSelected ? '#1e293b' : 'white'}" 
            stroke-width="${isSelected ? 2 : 1}"/>
      <circle cx="12" cy="9" r="2.5" fill="white"/>
    </svg>
  `;

  return L.divIcon({
    html: svgMarker,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

// Иконка позиции пользователя
const userMarkerIcon = L.divIcon({
  html: `
    <div class="user-marker">
      <div class="user-marker-pulse"></div>
      <div class="user-marker-dot"></div>
    </div>
  `,
  className: 'user-marker-container',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// =============================================================================
// Компонент управления картой
// =============================================================================

const MapController: React.FC<MapControllerProps> = ({ center, onMapMove }) => {
  const map = useMap();

  // Центрируем карту при изменении center
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], map.getZoom());
    }
  }, [center, map]);

  // Слушаем движение карты
  useMapEvents({
    moveend: () => {
      if (onMapMove) {
        const mapCenter = map.getCenter();
        onMapMove({ lat: mapCenter.lat, lng: mapCenter.lng });
      }
    },
  });

  return null;
};

// =============================================================================
// Функция получения ссылки на объект
// =============================================================================

function getObjectLink(object: GuruObjectWithDistance): string {
  switch (object.type) {
    case 'place':
      return `/atlas/places/${object.id}`;
    case 'event':
      return `/pulse/${object.id}`;
    case 'housing':
      return `/housing/${object.id}`;
    case 'person':
      return `/space/profile/${object.id}`;
    case 'quest':
      return `/quest/${object.id}`;
    default:
      return '#';
  }
}

// =============================================================================
// Компонент маркера объекта
// =============================================================================

interface ObjectMarkerProps {
  object: GuruObjectWithDistance;
  isSelected: boolean;
  onClick: () => void;
}

const ObjectMarker: React.FC<ObjectMarkerProps> = ({
  object,
  isSelected,
  onClick,
}) => {
  const color = MARKER_COLORS[object.type];
  const icon = useMemo(
    () => createMarkerIcon(color, isSelected),
    [color, isSelected]
  );
  const objectLink = getObjectLink(object);

  return (
    <Marker
      position={[object.lat, object.lng]}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup>
        <div className="p-2 min-w-[220px]">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: color }}
            >
              {OBJECT_TYPE_LABELS[object.type]}
            </span>
            {object.isRF && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-500 text-white">
                RF
              </span>
            )}
          </div>
          <h3 className="font-semibold text-slate-900 mb-1 text-sm">{object.title}</h3>
          <p className="text-xs text-slate-500 mb-2">
            {formatDistance(object.distance)} • {formatWalkingTime(object.walkingTime)}
          </p>
          {object.rating && (
            <p className="text-xs text-slate-600 mb-3">
              ⭐ {object.rating.toFixed(1)}
            </p>
          )}
          <Link
            href={objectLink}
            className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Подробнее
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

// =============================================================================
// Основной компонент карты
// =============================================================================

export const GuruMapView: React.FC<GuruMapViewProps> = ({
  objects,
  userPosition,
  radius,
  selectedObjectId,
  onObjectSelect,
  onMapMove,
  className = '',
}) => {
  // Центр карты: позиция пользователя или дефолтная (Новосибирск)
  const center = userPosition || { lat: 54.9833, lng: 82.8964 };

  // Zoom в зависимости от радиуса
  const zoom = useMemo(() => {
    if (radius <= 600) return 16;
    if (radius <= 800) return 15.5;
    if (radius <= 1000) return 15;
    return 14.5;
  }, [radius]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        className="w-full h-full rounded-xl z-0"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        {/* Тайлы OSM */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Контроллер карты */}
        <MapController center={userPosition} onMapMove={onMapMove} />

        {/* Круг радиуса */}
        {userPosition && (
          <Circle
            center={[userPosition.lat, userPosition.lng]}
            radius={radius}
            pathOptions={{
              color: '#0ea5e9',
              fillColor: '#0ea5e9',
              fillOpacity: 0.1,
              weight: 2,
              dashArray: '5, 5',
            }}
          />
        )}

        {/* Маркер пользователя */}
        {userPosition && (
          <Marker position={[userPosition.lat, userPosition.lng]} icon={userMarkerIcon}>
            <Popup>
              <div className="p-1">
                <p className="font-medium text-slate-900">Вы здесь</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Маркеры объектов */}
        {objects.map((object) => (
          <ObjectMarker
            key={object.id}
            object={object}
            isSelected={selectedObjectId === object.id}
            onClick={() => onObjectSelect(object.id)}
          />
        ))}
      </MapContainer>

      {/* Стили для кастомных маркеров */}
      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }

        .user-marker-container {
          background: transparent !important;
          border: none !important;
        }

        .user-marker {
          position: relative;
          width: 24px;
          height: 24px;
        }

        .user-marker-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 14px;
          height: 14px;
          background: #0ea5e9;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .user-marker-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          background: rgba(14, 165, 233, 0.3);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .leaflet-popup-content {
          margin: 8px 12px;
        }

        .leaflet-popup-tip {
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default GuruMapView;

