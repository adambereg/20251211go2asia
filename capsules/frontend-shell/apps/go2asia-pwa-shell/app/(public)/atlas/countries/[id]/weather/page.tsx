export default function CountryWeatherPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Погода и климат</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Климатические зоны</h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Северный Вьетнам</div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>• Прохладная зима: 15-20°C (декабрь-февраль)</div>
                  <div>• Жаркое лето: 30-35°C (май-август)</div>
                  <div>• Сезон дождей: май-октябрь</div>
                  <div>• Лучшее время: октябрь-апрель</div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Центральный Вьетнам</div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>• Тропический климат круглый год</div>
                  <div>• Температура: 25-30°C</div>
                  <div>• Сезон дождей: сентябрь-декабрь (возможны тайфуны)</div>
                  <div>• Лучшее время: январь-август</div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Южный Вьетнам</div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>• Жарко круглый год: 25-35°C</div>
                  <div>• Сезон дождей: май-ноябрь (кратковременные ливни)</div>
                  <div>• Сухой сезон: декабрь-апрель</div>
                  <div>• Лучшее время: декабрь-март</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
              <div className="font-semibold text-blue-900 mb-1 text-sm">Совет</div>
              <p className="text-sm text-blue-800">
                В сезон дождей ливни обычно кратковременные (1-2 часа), после чего снова солнечно.
                Берите зонт и лёгкую дождевик. В центральных регионах возможны тайфуны в
                сентябре-ноябре.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

