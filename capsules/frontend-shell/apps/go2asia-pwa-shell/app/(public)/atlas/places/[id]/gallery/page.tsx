import { EmptyStateAtlas } from '@/modules/atlas';

export default function PlaceGalleryPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Галерея</h2>
      <EmptyStateAtlas
        title="Фото и видео"
        description="Мультимедиа от редакции и от пользователей. Фото, видео, 360° панорамы. Интеграция с Space Asia для пользовательских фото."
      />
    </div>
  );
}

