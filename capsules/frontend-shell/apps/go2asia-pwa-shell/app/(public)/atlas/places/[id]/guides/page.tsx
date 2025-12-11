import { EmptyStateAtlas } from '@/modules/atlas';

export default function PlaceGuidesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Гайды, маршруты</h2>
      <EmptyStateAtlas
        title="Маршруты и гайды"
        description="Маршруты на 1 день / 3 дня / 5 дней, тематические маршруты, куда включено место, гайды пользователей (UGC). Интеграция с Guides Module (Atlas → Guides) и Space Asia."
      />
    </div>
  );
}

