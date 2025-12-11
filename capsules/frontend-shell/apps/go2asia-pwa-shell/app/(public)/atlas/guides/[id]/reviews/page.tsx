import { EmptyStateAtlas } from '@/modules/atlas';

export default function GuideReviewsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Отзывы и опыт</h2>
      <EmptyStateAtlas
        title="UGC-контент"
        description="Комментарии, 'Я прошёл этот маршрут' (отчёты пользователей), фото/видео-галерея от UGC. Позже можно связать с Space Asia (посты друзей)."
      />
    </div>
  );
}

