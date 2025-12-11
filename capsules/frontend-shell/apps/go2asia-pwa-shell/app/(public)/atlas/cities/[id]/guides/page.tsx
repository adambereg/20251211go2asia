import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityGuidesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Гайды</h2>
      <EmptyStateAtlas
        title="Маршруты по городу"
        description="Маршруты 1 день / 3 дня / 5 дней, подборки для первого туриста, маршруты 'фототур', 'еда', 'семейный отдых', UGC-гайды пользователей."
      />
    </div>
  );
}

