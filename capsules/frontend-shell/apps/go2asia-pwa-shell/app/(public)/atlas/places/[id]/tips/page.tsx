import { EmptyStateAtlas } from '@/modules/atlas';

export default function PlaceTipsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Практическая информация</h2>
      <EmptyStateAtlas
        title="Полезные советы"
        description="Что взять с собой, как добраться, безопасность, часы пик, ограничения / дресс-код."
      />
    </div>
  );
}

