import { EmptyStateAtlas } from '@/modules/atlas';

export default function ThemeGuidesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Гайды по теме</h2>
      <EmptyStateAtlas
        title="Подборка гайдов"
        description="Список гайдов, отфильтрованных по теме. Например, для темы 'Визы и миграция': 'Визы в Таиланд: полное руководство', 'Как продлить визу во Вьетнаме'."
      />
    </div>
  );
}

