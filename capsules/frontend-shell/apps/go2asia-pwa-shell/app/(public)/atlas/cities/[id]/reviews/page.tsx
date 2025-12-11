import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityReviewsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Отзывы</h2>
      <EmptyStateAtlas
        title="Отзывы туристов и экспатов"
        description="UGC отзывы, рейтинги, личные советы, топ комментарии."
      />
    </div>
  );
}

