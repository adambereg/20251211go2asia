import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityTransportPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Транспорт</h2>
      <EmptyStateAtlas
        title="Как передвигаться по городу"
        description="Как добраться из аэропорта, городские виды транспорта (метро, автобусы, тук-туки), схема метро, стоимость, локальные лайфхаки, аренда байков."
      />
    </div>
  );
}

