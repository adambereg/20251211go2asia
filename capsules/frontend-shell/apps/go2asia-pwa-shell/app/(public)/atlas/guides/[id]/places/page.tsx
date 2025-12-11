import { EmptyStateAtlas } from '@/modules/atlas';

export default function GuidePlacesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Подборки мест</h2>
      <EmptyStateAtlas
        title="Рекомендуемые места"
        description="Авто-подтягивание из Places по тегам гайда. 'Рекомендуемые места из гайда', 'Похожие места', 'Партнёрские места Russian Friendly' (если применимо)."
      />
    </div>
  );
}

