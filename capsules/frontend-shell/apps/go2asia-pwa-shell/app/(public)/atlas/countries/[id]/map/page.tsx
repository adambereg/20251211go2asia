export default function CountryMapPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Карта</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Интерактивная карта</h3>
            <div className="text-sm text-slate-700">
              <p>
                Здесь будет интерактивная карта страны с отмеченными городами, достопримечательностями,
                Russian Friendly заведениями и полезными локациями.
              </p>
            </div>
            <div className="aspect-video rounded-lg bg-slate-200 flex items-center justify-center text-slate-400 text-sm mt-4">
              Карта будет здесь
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

