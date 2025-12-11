import { EmptyStateAtlas } from '@/modules/atlas';

export default function PlacePartnersPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Партнёрские предложения</h2>
      <EmptyStateAtlas
        title="Скидки и промо"
        description="Скидки, купоны, промо, теги Russian Friendly, кто рекомендует (PRO-партнёр). Интеграция с Russian Friendly Asia и PRO-партнёры (Connect Asia)."
      />
    </div>
  );
}

