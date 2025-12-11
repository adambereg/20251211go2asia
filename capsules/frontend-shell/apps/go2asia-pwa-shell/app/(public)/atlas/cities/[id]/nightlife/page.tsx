import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityNightlifePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Ночная жизнь</h2>
      <EmptyStateAtlas
        title="Вечерние развлечения"
        description="Бары, rooftop-площадки, клубы, вечерние рынки."
      />
    </div>
  );
}

