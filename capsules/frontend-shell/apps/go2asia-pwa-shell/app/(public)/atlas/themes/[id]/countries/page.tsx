import { EmptyStateAtlas } from '@/modules/atlas';

export default function ThemeCountriesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">По странам</h2>
      <EmptyStateAtlas
        title="Страны по теме"
        description="Карточки стран с тематической спецификой (визовая/медицинская/финансовая). Каждая страна — карточка с мини-сводкой и кнопкой 'Подробнее' → ведёт на страницу страны в контексте темы."
      />
    </div>
  );
}

