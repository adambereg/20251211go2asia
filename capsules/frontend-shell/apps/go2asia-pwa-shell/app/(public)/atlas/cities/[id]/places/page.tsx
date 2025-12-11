import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityPlacesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Достопримечательности</h2>
      <EmptyStateAtlas
        title="Места города"
        description="Разделение: природа / культура / фото-поинты / must-see. Топ места, карта POI."
      />
    </div>
  );
}

