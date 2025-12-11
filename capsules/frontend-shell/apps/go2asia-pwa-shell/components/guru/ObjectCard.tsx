'use client';

/**
 * Guru Asia - ObjectCard
 * Унифицированная карточка для всех типов объектов
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Home,
  User,
  Trophy,
  Star,
  Clock,
  Navigation,
  Heart,
  Wifi,
  Coffee,
  Volume2,
  VolumeX,
  Zap,
  Baby,
  Check,
} from 'lucide-react';
import { Button } from '@go2asia/ui';
import type {
  GuruObjectWithDistance,
  GuruObjectType,
  PlaceObject,
  EventObject,
  HousingObject,
  PersonObject,
  QuestObject,
} from './types';
import {
  isPlaceObject,
  isEventObject,
  isHousingObject,
  isPersonObject,
  isQuestObject,
  MARKER_COLORS,
} from './types';
import { formatDistance, formatWalkingTime } from './utils/geo';

// =============================================================================
// Типы
// =============================================================================

interface ObjectCardProps {
  object: GuruObjectWithDistance;
  isSelected?: boolean;
  compact?: boolean;
  onClick?: () => void;
  onSave?: () => void;
  onRoute?: () => void;
}

// =============================================================================
// Иконки по типу
// =============================================================================

const TypeIcon: React.FC<{ type: GuruObjectType; className?: string }> = ({
  type,
  className = 'w-4 h-4',
}) => {
  switch (type) {
    case 'place':
      return <MapPin className={className} />;
    case 'event':
      return <Calendar className={className} />;
    case 'housing':
      return <Home className={className} />;
    case 'person':
      return <User className={className} />;
    case 'quest':
      return <Trophy className={className} />;
    default:
      return <MapPin className={className} />;
  }
};

// =============================================================================
// Бейджи
// =============================================================================

const Badge: React.FC<{
  children: React.ReactNode;
  variant: 'rf' | 'pro' | 'event' | 'quest' | 'verified' | 'free' | 'type';
  color?: string;
}> = ({ children, variant, color }) => {
  const baseClasses = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium';

  const variantClasses: Record<string, string> = {
    rf: 'bg-orange-100 text-orange-700',
    pro: 'bg-purple-100 text-purple-700',
    event: 'bg-purple-100 text-purple-700',
    quest: 'bg-amber-100 text-amber-700',
    verified: 'bg-blue-100 text-blue-700',
    free: 'bg-green-100 text-green-700',
    type: 'bg-slate-100 text-slate-600',
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]}`}
      style={color ? { backgroundColor: `${color}20`, color } : undefined}
    >
      {children}
    </span>
  );
};

// =============================================================================
// Статус (открыто/закрыто)
// =============================================================================

const StatusIndicator: React.FC<{
  isOpen: boolean;
  label?: string;
}> = ({ isOpen, label }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${
        isOpen ? 'text-green-600' : 'text-slate-500'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isOpen ? 'bg-green-500' : 'bg-slate-400'
        }`}
      />
      {label || (isOpen ? 'Открыто' : 'Закрыто')}
    </span>
  );
};

// =============================================================================
// Уровень цен
// =============================================================================

const PriceLevel: React.FC<{ level: 1 | 2 | 3 }> = ({ level }) => {
  return (
    <span className="text-sm text-slate-600">
      {'$'.repeat(level)}
      <span className="text-slate-300">{'$'.repeat(3 - level)}</span>
    </span>
  );
};

// =============================================================================
// Удобства места
// =============================================================================

const PlaceAmenities: React.FC<{ place: PlaceObject }> = ({ place }) => {
  const amenities = [];

  if (place.hasWifi) {
    amenities.push({ icon: Wifi, label: 'Wi-Fi' });
  }
  if (place.hasPowerOutlets) {
    amenities.push({ icon: Zap, label: 'Розетки' });
  }
  if (place.hasCoffee) {
    amenities.push({ icon: Coffee, label: 'Кофе' });
  }
  if (place.isQuiet) {
    amenities.push({ icon: VolumeX, label: 'Тихо' });
  }
  if (place.isKidFriendly) {
    amenities.push({ icon: Baby, label: 'Детское' });
  }

  if (amenities.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {amenities.slice(0, 4).map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1 text-xs text-slate-500"
          title={label}
        >
          <Icon className="w-3 h-3" />
          <span className="hidden sm:inline">{label}</span>
        </span>
      ))}
    </div>
  );
};

// =============================================================================
// Детали по типу
// =============================================================================

const PlaceDetails: React.FC<{ place: PlaceObject }> = ({ place }) => (
  <>
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <StatusIndicator isOpen={place.isOpen ?? false} />
      {place.openingHours && (
        <span className="text-slate-400">• {place.openingHours}</span>
      )}
    </div>
    <div className="flex items-center gap-3">
      {place.rating && (
        <span className="inline-flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          {place.rating.toFixed(1)}
        </span>
      )}
      {place.priceLevel && <PriceLevel level={place.priceLevel} />}
      {place.categories[0] && (
        <span className="text-sm text-slate-500 capitalize">
          {place.categories[0]}
        </span>
      )}
    </div>
    <PlaceAmenities place={place} />
  </>
);

const EventDetails: React.FC<{ event: EventObject }> = ({ event }) => {
  const startDate = new Date(event.startDate);
  const isToday = startDate.toDateString() === new Date().toDateString();

  return (
    <>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        {event.isHappeningNow ? (
          <StatusIndicator isOpen={true} label="Идёт сейчас" />
        ) : (
          <span className="inline-flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {isToday
              ? `Сегодня в ${startDate.toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`
              : startDate.toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {event.rating && (
          <span className="inline-flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            {event.rating.toFixed(1)}
          </span>
        )}
        {event.isFree ? (
          <Badge variant="free">Бесплатно</Badge>
        ) : event.price ? (
          <span className="text-sm text-slate-600">{event.price}</span>
        ) : null}
      </div>
      {event.organizer && (
        <p className="text-xs text-slate-500 truncate">
          Организатор: {event.organizer}
        </p>
      )}
    </>
  );
};

const HousingDetails: React.FC<{ housing: HousingObject }> = ({ housing }) => (
  <>
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <StatusIndicator
        isOpen={housing.availableNow ?? false}
        label={housing.availableNow ? 'Свободно' : 'Занято'}
      />
      {housing.housingType && (
        <span className="text-slate-400 capitalize">
          •{' '}
          {housing.housingType === 'apartment'
            ? 'Квартира'
            : housing.housingType === 'room'
            ? 'Комната'
            : housing.housingType === 'hostel'
            ? 'Хостел'
            : 'Отель'}
        </span>
      )}
    </div>
    <div className="flex items-center gap-3">
      {housing.rating && (
        <span className="inline-flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          {housing.rating.toFixed(1)}
        </span>
      )}
      <span className="text-sm font-medium text-primary">
        {housing.pricePerNight.toLocaleString('ru-RU')} ₽/ночь
      </span>
    </div>
    {(housing.rooms || housing.area) && (
      <p className="text-xs text-slate-500">
        {housing.rooms && `${housing.rooms} комн`}
        {housing.rooms && housing.area && ' • '}
        {housing.area && `${housing.area} м²`}
      </p>
    )}
  </>
);

const PersonDetails: React.FC<{ person: PersonObject }> = ({ person }) => (
  <>
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <StatusIndicator
        isOpen={person.isAvailableNow ?? false}
        label={person.isAvailableNow ? 'Готов встретиться' : 'Занят'}
      />
    </div>
    <div className="flex items-center gap-2 flex-wrap">
      {person.isPRO && <Badge variant="pro">PRO</Badge>}
      {person.isMentor && <Badge variant="type">Ментор</Badge>}
      {person.isGuide && <Badge variant="type">Гид</Badge>}
      {person.rating && (
        <span className="inline-flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          {person.rating.toFixed(1)}
        </span>
      )}
    </div>
    {person.bio && (
      <p className="text-xs text-slate-500 line-clamp-2">{person.bio}</p>
    )}
  </>
);

const QuestDetails: React.FC<{ quest: QuestObject }> = ({ quest }) => (
  <>
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <span className="inline-flex items-center gap-1">
        <Clock className="w-4 h-4" />
        {quest.duration} мин
      </span>
      <span className="text-slate-400">•</span>
      <span className="capitalize">
        {quest.level === 'beginner'
          ? 'Новичок'
          : quest.level === 'advanced'
          ? 'Продвинутый'
          : 'Эксперт'}
      </span>
    </div>
    <div className="flex items-center gap-2 flex-wrap">
      {quest.isNew && <Badge variant="event">Новый</Badge>}
      {quest.isTrending && <Badge variant="rf">🔥 Популярный</Badge>}
      {quest.hasRewards && (
        <span className="text-xs text-amber-600">{quest.rewards}</span>
      )}
    </div>
    <p className="text-xs text-slate-500">
      {quest.checkpointsCount} точек на маршруте
    </p>
  </>
);

// =============================================================================
// Ссылка на модуль
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
// Основной компонент
// =============================================================================

export const ObjectCard: React.FC<ObjectCardProps> = ({
  object,
  isSelected = false,
  compact = false,
  onClick,
  onSave,
  onRoute,
}) => {
  const typeColor = MARKER_COLORS[object.type];

  // Открыть маршрут в Google Maps
  const handleRoute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${object.lat},${object.lng}`;
    window.open(url, '_blank');
    onRoute?.();
  };

  // Сохранить
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave?.();
  };

  return (
    <div
      className={`
        bg-white rounded-xl border transition-all duration-200 cursor-pointer
        ${isSelected ? 'border-primary ring-2 ring-primary/20 shadow-lg' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'}
        ${compact ? 'p-3' : 'p-4'}
      `}
      onClick={onClick}
    >
      <div className="flex gap-4">
        {/* Обложка */}
        <div
          className={`
            relative flex-shrink-0 rounded-lg overflow-hidden bg-slate-100
            ${compact ? 'w-16 h-16' : 'w-20 h-20'}
          `}
        >
          {object.cover ? (
            <Image
              src={object.cover}
              alt={object.title}
              fill
              className="object-cover"
              sizes={compact ? '64px' : '80px'}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <TypeIcon type={object.type} className="w-8 h-8 text-slate-400" />
            </div>
          )}

          {/* Бейдж RF */}
          {object.isRF && (
            <div
              className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
              style={{ backgroundColor: '#F97316' }}
            >
              RF
            </div>
          )}
        </div>

        {/* Контент */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Заголовок и бейджи */}
          <div className="flex items-start gap-2">
            <h3
              className={`font-semibold text-slate-900 line-clamp-1 flex-1 ${
                compact ? 'text-sm' : 'text-base'
              }`}
            >
              {object.title}
            </h3>
            <Badge variant="type" color={typeColor}>
              <TypeIcon type={object.type} className="w-3 h-3" />
              {compact ? '' : object.type === 'place' ? 'Место' : 
                object.type === 'event' ? 'Событие' :
                object.type === 'housing' ? 'Жильё' :
                object.type === 'person' ? '' :
                'Квест'}
            </Badge>
          </div>

          {/* Расстояние и время */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {formatDistance(object.distance)}
            </span>
            <span>•</span>
            <span>{formatWalkingTime(object.walkingTime)}</span>
            {object.city && (
              <>
                <span>•</span>
                <span>{object.city}</span>
              </>
            )}
          </div>

          {/* Детали по типу */}
          {!compact && (
            <div className="space-y-1">
              {isPlaceObject(object) && <PlaceDetails place={object} />}
              {isEventObject(object) && <EventDetails event={object} />}
              {isHousingObject(object) && <HousingDetails housing={object} />}
              {isPersonObject(object) && <PersonDetails person={object} />}
              {isQuestObject(object) && <QuestDetails quest={object} />}
            </div>
          )}
        </div>
      </div>

      {/* Действия */}
      {!compact && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
          <Link href={getObjectLink(object)} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              Открыть
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRoute}
            title="Маршрут"
          >
            <Navigation className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSave}
            title="Сохранить"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ObjectCard;

