import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityDistrictsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Районы</h2>
      <EmptyStateAtlas
        title="Районы города"
        description="Карта районов, краткая характеристика: где жить, где безопасно, где шумно. Районы для экспатов и туристов, районы с ночной жизнью и шопингом."
      />
    </div>
  );
}

