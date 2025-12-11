import { EmptyStateAtlas } from '@/modules/atlas';

export default function ThemeVersionsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Версии и обновления</h2>
      <EmptyStateAtlas
        title="Changelog"
        description="Для 'Виз' — важнейший блок. Может выглядеть как changelog: '17 ноября 2025 — изменены правила eVisa во Вьетнаме', '4 октября 2025 — Таиланд увеличил срок безвизового въезда'."
      />
    </div>
  );
}

