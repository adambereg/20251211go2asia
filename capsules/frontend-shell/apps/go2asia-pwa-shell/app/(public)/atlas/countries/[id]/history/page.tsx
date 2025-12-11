export default function CountryHistoryPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">История</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Краткая хронология</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                Вьетнам имеет богатую историю, насчитывающую более 4000 лет. Страна прошла через
                множество эпох: от древних королевств до французского колониализма, войн за
                независимость и современного развития.
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Ключевые эпохи</h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Древние королевства (до 111 г. до н.э.)</div>
                <p className="text-sm text-slate-600">
                  Формирование первых государств, влияние китайской культуры и буддизма.
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Китайское господство (111 г. до н.э. - 938 г. н.э.)</div>
                <p className="text-sm text-slate-600">
                  Тысячелетнее китайское влияние, борьба за независимость.
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Французский колониализм (1858-1954)</div>
                <p className="text-sm text-slate-600">
                  Колонизация Индокитая, влияние французской культуры, архитектуры и кухни.
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Война за независимость (1945-1975)</div>
                <p className="text-sm text-slate-600">
                  Вьетнамская война, объединение страны, восстановление.
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Современный период (с 1986)</div>
                <p className="text-sm text-slate-600">
                  Đổi Mới (обновление), экономические реформы, быстрый рост экономики.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
              <div className="font-semibold text-amber-900 mb-1 text-sm">Важно знать</div>
              <p className="text-sm text-amber-800">
                Вьетнамцы очень гордятся своей историей и борьбой за независимость. Уважайте
                исторические памятники и избегайте политических тем в разговорах.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


