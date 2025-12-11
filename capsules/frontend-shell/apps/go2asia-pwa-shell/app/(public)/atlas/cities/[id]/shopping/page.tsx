import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityShoppingPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Шопинг</h2>
      <EmptyStateAtlas
        title="Где делать покупки"
        description="Рынки, моллы, товары по выгодным ценам, рекомендации."
      />
    </div>
  );
}

