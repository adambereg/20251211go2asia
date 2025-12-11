import { EmptyStateAtlas } from '@/modules/atlas';

export default function PlaceNearbyPlacesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Достопримечательности рядом</h2>
      <EmptyStateAtlas
        title="Ближайшие объекты"
        description="Список ближайших объектов с дистанцией, рейтингом, фото и кнопкой 'Открыть'. Похожее на Foursquare UX 'Nearby'."
      />
    </div>
  );
}

