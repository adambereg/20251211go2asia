import { EmptyStateAtlas } from '@/modules/atlas';

export default function GuideRoutePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Маршрут / План</h2>
      <EmptyStateAtlas
        title="Маршрут по дням"
        description="День 1 / День 2 / ... с таймингом. В каждом шаге — связанные Places (карточки) с быстрыми действиями: 'на карте', 'в избранное', 'построить маршрут'. Опционально: альтернативы ('если дождь / если с детьми')."
      />
    </div>
  );
}

