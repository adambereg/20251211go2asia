import { EmptyStateAtlas } from '@/modules/atlas';

export default function ThemeReviewsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Отзывы и опыт</h2>
      <EmptyStateAtlas
        title="UGC-контент"
        description="Истории людей, комментарии, советы и предупреждения. Интеграция с Space Asia для обсуждений по теме."
      />
    </div>
  );
}

