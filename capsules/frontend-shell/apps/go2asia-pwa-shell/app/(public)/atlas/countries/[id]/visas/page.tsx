export default function CountryVisasPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Визы</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Типы виз</h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Туристическая виза (30 дней)</div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>• Безвизовый въезд для граждан РФ на 15 дней</div>
                  <div>• Продление до 30 дней через визовую компанию</div>
                  <div>• Стоимость: бесплатно (безвиз) или $25-50 (виза)</div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Визовая экскурсия (1-3 месяца)</div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>• Для длительного пребывания</div>
                  <div>• Требуется приглашение или турагентство</div>
                  <div>• Стоимость: $50-200 в зависимости от срока</div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Бизнес-виза (до 1 года)</div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>• Для работы или бизнеса</div>
                  <div>• Требуется спонсорство компании</div>
                  <div>• Стоимость: $135-200</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Пошаговая инструкция (туристическая виза)</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>
                  <strong>Безвизовый въезд:</strong> Граждане РФ могут въехать без визы на 15
                  дней
                </li>
                <li>
                  <strong>Продление:</strong> Обратитесь в визовую компанию за 7 дней до истечения
                  срока
                </li>
                <li>
                  <strong>Выезд и повторный въезд:</strong> Выезжайте в соседнюю страну (например,
                  Камбоджу) и возвращайтесь для нового 15-дневного периода
                </li>
                <li>
                  <strong>Документы:</strong> Загранпаспорт со сроком действия не менее 6 месяцев,
                  обратный билет (рекомендуется)
                </li>
              </ol>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <div className="font-semibold text-red-900 mb-1 text-sm">Важно: Риски и нюансы</div>
              <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                <li>Частые выезды-въезды могут вызвать вопросы у пограничников</li>
                <li>Рекомендуется делать визу для пребывания более 1 месяца</li>
                <li>Проверяйте актуальные правила на официальном сайте посольства</li>
                <li>Дата последней проверки: 17.11.2025</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


