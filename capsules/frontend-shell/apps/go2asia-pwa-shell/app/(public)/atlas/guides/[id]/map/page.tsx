import { EmptyStateAtlas } from '@/modules/atlas';

export default function GuideMapPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Карта</h2>
      <EmptyStateAtlas
        title="Карта маршрута"
        description="Встроенная OSM-карта с треком/точками, фильтр точек по дням/категориям, кнопки: 'Открыть в Guru/Maps', 'Скачать GPX/KML'."
      />
    </div>
  );
}

