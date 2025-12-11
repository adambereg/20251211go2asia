import { EmptyStateAtlas } from '@/modules/atlas';

export default function ThemeTipsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Практическая информация</h2>
      <EmptyStateAtlas
        title="Полезные материалы"
        description="Список документов, шаблоны заполнения, чеклисты 'Перед поездкой', факторы отказов, сроки и стоимость. Для 'Связь и интернет': тарифы по странам, покрытие 4G/5G, где купить SIM, VPN рекомендации."
      />
    </div>
  );
}

