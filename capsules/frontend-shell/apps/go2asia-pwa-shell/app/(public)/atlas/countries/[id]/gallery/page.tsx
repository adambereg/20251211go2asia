export default function CountryGalleryPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Фотогалерея</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Галерея фотографий</h3>
            <div className="text-sm text-slate-700">
              <p>
                Здесь будет коллекция фотографий страны: пейзажи, города, культура, еда и
                повседневная жизнь. Фотографии от пользователей и редакции.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-slate-200 flex items-center justify-center text-slate-400 text-xs"
                >
                  Фото {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

