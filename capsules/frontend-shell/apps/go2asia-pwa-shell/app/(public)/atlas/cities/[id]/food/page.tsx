import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityFoodPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Еда и кафе</h2>
      <EmptyStateAtlas
        title="Гастрономия города"
        description="Street food районы, топ-заведения, куда пойти вечером, местные блюда и где их пробовать, партнеры Russian Friendly."
      />
    </div>
  );
}

