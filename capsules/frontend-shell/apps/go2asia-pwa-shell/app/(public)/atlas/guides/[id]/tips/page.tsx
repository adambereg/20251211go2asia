import { EmptyStateAtlas } from '@/modules/atlas';

export default function GuideTipsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Практическая информация</h2>
      <EmptyStateAtlas
        title="Полезные советы"
        description="Как добраться, бюджет (минимум / комфорт / 'со вкусом'), время/сезон, что взять с собой (чек-лист), ограничения/риски."
      />
    </div>
  );
}

