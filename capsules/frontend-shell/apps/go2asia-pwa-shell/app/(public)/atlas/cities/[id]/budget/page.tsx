import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityBudgetPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Цены и бюджет</h2>
      <EmptyStateAtlas
        title="Калькулятор стоимости"
        description="Цены на еду, проезд, отели, развлечения, пример затрат в день."
      />
    </div>
  );
}

