import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityAccommodationPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Проживание</h2>
      <EmptyStateAtlas
        title="Где остановиться"
        description="Лучшие районы для жилья, подборки бюджетных и премиум отелей, апартаменты на Airbnb, русскоязычные хозяева, ссылки на партнёрские отели."
      />
    </div>
  );
}

