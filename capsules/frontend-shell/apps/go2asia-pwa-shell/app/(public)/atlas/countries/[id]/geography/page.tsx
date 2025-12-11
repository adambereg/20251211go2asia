export default function CountryGeographyPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">География</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Общая информация</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                Вьетнам расположен в Юго-Восточной Азии на полуострове Индокитай. Страна имеет
                вытянутую форму (S-образную) и протянулась на 1650 км с севера на юг вдоль
                побережья Южно-Китайского моря.
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Регионы</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Север</div>
                <p className="text-xs text-slate-600">
                  Ханой, Сапа, Халонг. Горы, прохладный климат зимой.
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Центр</div>
                <p className="text-xs text-slate-600">
                  Хюэ, Дананг, Хойан. Тропический климат, пляжи.
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Юг</div>
                <p className="text-xs text-slate-600">
                  Хошимин, дельта Меконга. Жаркий климат круглый год.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Климат</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                Вьетнам имеет тропический и субтропический климат с муссонами. Климат сильно
                различается между севером и югом:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Север:</strong> Прохладная зима (15-20°C), жаркое лето (30-35°C), сезон
                  дождей с мая по октябрь
                </li>
                <li>
                  <strong>Центр:</strong> Тропический климат, сезон дождей с сентября по декабрь
                </li>
                <li>
                  <strong>Юг:</strong> Жарко круглый год (25-35°C), сезон дождей с мая по ноябрь
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
              <div className="font-semibold text-blue-900 mb-1 text-sm">Лучшее время для посещения</div>
              <p className="text-sm text-blue-800">
                Сухой сезон (ноябрь-апрель) — идеальное время для путешествий. В сезон дождей
                возможны тайфуны, особенно в центральных регионах.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


