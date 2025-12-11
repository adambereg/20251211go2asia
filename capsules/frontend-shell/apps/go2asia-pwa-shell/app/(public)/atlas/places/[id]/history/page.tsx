import { EmptyStateAtlas } from '@/modules/atlas';

export default function PlaceHistoryPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">История и факты</h2>
      <EmptyStateAtlas
        title="История места"
        description="История места в удобном формате, интересные факты, легенды, особенности, что нельзя делать (этикет), что хорошо знать перед посещением. Интеграция с Blog Asia."
      />
    </div>
  );
}

