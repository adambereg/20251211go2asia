import { EmptyStateAtlas } from '@/modules/atlas';

export default function ThemePlacesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Подборки мест</h2>
      <EmptyStateAtlas
        title="Места по теме"
        description="Как тема проявляется в объектах. Пример: тема 'Медицина' — лучшие госпитали Таиланда, русскоговорящие врачи во Вьетнаме, международные клиники Сингапура. Тема 'Банки и финтех' — топ банков, обменники, офисы MoneyGram/Western Union."
      />
    </div>
  );
}

