export default function CountryLivingPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Проживание</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Стоимость жизни</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                Вьетнам — одна из самых доступных стран для жизни в Юго-Восточной Азии. Стоимость
                жизни значительно ниже, чем в Таиланде или Сингапуре, особенно за пределами
                крупных городов.
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Аренда жилья</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Хошимин</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>Студия: $300-500/мес</div>
                  <div>1-комн.: $400-700/мес</div>
                  <div>2-комн.: $600-1200/мес</div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Ханой</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>Студия: $250-450/мес</div>
                  <div>1-комн.: $350-600/мес</div>
                  <div>2-комн.: $500-1000/мес</div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Дананг</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>Студия: $200-400/мес</div>
                  <div>1-комн.: $300-500/мес</div>
                  <div>2-комн.: $400-800/мес</div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Нячанг</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>Студия: $180-350/мес</div>
                  <div>1-комн.: $250-450/мес</div>
                  <div>2-комн.: $350-700/мес</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Популярные районы для экспатов</h3>
            <div className="space-y-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Хошимин: Район 1, Район 2, Район 7</div>
                <p className="text-xs text-slate-600">
                  Центральные районы с развитой инфраструктурой, коворкингами и международными
                  школами.
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Ханой: Тай Хо, Ба Динь</div>
                <p className="text-xs text-slate-600">
                  Озёрные районы с хорошей экологией и близостью к центру города.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Ежемесячные расходы (примерно)</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex justify-between">
                <span>Еда (кафе/рестораны):</span>
                <span className="font-semibold">$200-400</span>
              </div>
              <div className="flex justify-between">
                <span>Транспорт (байк/такси):</span>
                <span className="font-semibold">$50-100</span>
              </div>
              <div className="flex justify-between">
                <span>Коммунальные услуги:</span>
                <span className="font-semibold">$30-60</span>
              </div>
              <div className="flex justify-between">
                <span>Интернет и мобильная связь:</span>
                <span className="font-semibold">$10-20</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold">
                <span>Итого (без аренды):</span>
                <span>$290-580/мес</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


