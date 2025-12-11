import { EmptyStateAtlas } from '@/modules/atlas';

export default function ThemeEventsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">События рядом</h2>
      <EmptyStateAtlas
        title="События по теме"
        description="Интеграция с Pulse Asia: события, релевантные теме (медицина → конгрессы, банки → выставки, визы → инфо-сессии)."
      />
    </div>
  );
}

