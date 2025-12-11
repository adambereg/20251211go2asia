import { EmptyStateAtlas } from '@/modules/atlas';

export default function PlaceNearbyServicesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Что рядом</h2>
      <EmptyStateAtlas
        title="Еда, кафе, рынки, бары"
        description="Кафе рядом, бары, street food, торговые центры, рынки. Интеграция с Russian Friendly (выделить партнёрские заведения) и Guru Asia (показывать открытые сейчас)."
      />
    </div>
  );
}

