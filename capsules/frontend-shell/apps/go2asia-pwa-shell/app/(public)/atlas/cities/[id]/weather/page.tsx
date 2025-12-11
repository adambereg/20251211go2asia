import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityWeatherPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Погода и сезонность</h2>
      <EmptyStateAtlas
        title="Климат города"
        description="Климат, месячная сезонность, лучшие месяцы для поездки, температуры по сезонам."
      />
    </div>
  );
}

