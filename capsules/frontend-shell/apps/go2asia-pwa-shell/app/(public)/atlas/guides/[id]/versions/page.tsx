import { EmptyStateAtlas } from '@/modules/atlas';

export default function GuideVersionsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Версии / Обновления</h2>
      <EmptyStateAtlas
        title="История изменений"
        description="Дата последнего апдейта, changelog (коротко), кто автор: редакция/партнёр/юзер, CTA 'сообщить об ошибке'."
      />
    </div>
  );
}

