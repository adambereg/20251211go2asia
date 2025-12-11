import { EmptyStateAtlas } from '@/modules/atlas';

export default function PlaceReviewsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Отзывы</h2>
      <EmptyStateAtlas
        title="Отзывы пользователей"
        description="Отзывы пользователей, рейтинг, лайки, галерея пользователей, оценки: красота, доступность, цена, комфорт. Интеграция с Space Asia. Активация Points за отзывы и фото."
      />
    </div>
  );
}

