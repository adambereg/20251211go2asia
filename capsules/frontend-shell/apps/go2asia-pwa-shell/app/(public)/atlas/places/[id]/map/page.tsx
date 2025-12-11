import { EmptyStateAtlas } from '@/modules/atlas';

export default function PlaceMapPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">На карте</h2>
      <EmptyStateAtlas
        title="Карта и маршруты"
        description="Точка места на OpenStreetMap, кнопка 'Маршрут' (Google Maps / Apple / Grab), ближайшие POI: кафе, инфоцентры, рынки, банкоматы, остановки, транспортные хабы. Интеграция с Guru Asia и Pulse Asia."
      />
    </div>
  );
}

