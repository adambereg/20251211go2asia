import { EmptyStateAtlas } from '@/modules/atlas';

export default function GuideEventsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">События рядом</h2>
      <EmptyStateAtlas
        title="Ближайшие события"
        description="Интеграция с Pulse: ближайшие ивенты в городе/стране, фильтр по датам, CTA: 'Добавить в календарь', 'Пойти'."
      />
    </div>
  );
}

