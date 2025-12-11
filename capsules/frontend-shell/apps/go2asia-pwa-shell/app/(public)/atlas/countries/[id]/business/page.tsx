export default function CountryBusinessPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Бизнес</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Формы компаний</h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">ООО (Limited Liability Company)</div>
                <div className="text-sm text-slate-600">
                  Наиболее популярная форма для иностранных инвесторов. Минимальный уставный
                  капитал от $10,000. Требуется минимум 1 учредитель.
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Акционерное общество (Joint Stock Company)</div>
                <div className="text-sm text-slate-600">
                  Для крупных проектов. Минимальный уставный капитал от $50,000. Требуется
                  минимум 3 акционеров.
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Представительство (Representative Office)</div>
                <div className="text-sm text-slate-600">
                  Для маркетинга и исследований без коммерческой деятельности. Не может вести
                  бизнес напрямую.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Базовые налоги</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">НДС (VAT)</div>
                <div className="text-xs text-slate-600">0%, 5%, 10% в зависимости от вида деятельности</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Налог на прибыль</div>
                <div className="text-xs text-slate-600">20% (стандартная ставка)</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Подоходный налог</div>
                <div className="text-xs text-slate-600">5-35% (прогрессивная шкала)</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1 text-sm">Социальное страхование</div>
                <div className="text-xs text-slate-600">21.5% от зарплаты (работодатель)</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Банки и финтех</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                Вьетнам имеет развитую банковскую систему. Популярные банки: Vietcombank, BIDV,
                Techcombank. Для экспатов удобны международные банки: HSBC, ANZ. Финтех активно
                развивается: MoMo, ZaloPay для платежей.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
              <div className="font-semibold text-amber-900 mb-1 text-sm">Важно</div>
              <p className="text-sm text-amber-800">
                Информация предоставлена на высоком уровне. Для конкретных юридических вопросов
                обращайтесь к местным юристам. Регулятор: Министерство планирования и инвестиций
                (MPI).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


