export default function CountryCulturePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Культура</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Основы этикета</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                Вьетнамская культура основана на конфуцианских ценностях: уважение к старшим,
                важность семьи и гармонии в обществе. Вьетнамцы дружелюбны и гостеприимны, но
                ценят вежливость и такт.
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Что важно знать</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <div className="text-sm text-slate-700">
                  <strong>Приветствие:</strong> Используйте обе руки при передаче предметов,
                  особенно денег или визиток
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <div className="text-sm text-slate-700">
                  <strong>Одежда:</strong> Скромная одежда в храмах и пагодах (плечи и колени
                  закрыты)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <div className="text-sm text-slate-700">
                  <strong>Еда:</strong> Не оставляйте палочки вертикально в миске с рисом (символ
                  смерти)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <div className="text-sm text-slate-700">
                  <strong>Голова:</strong> Не трогайте голову детей — это считается священным
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-lg font-semibold text-slate-900">Праздники</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">Тет (Новый год по лунному календарю)</div>
                <p className="text-xs text-slate-600">
                  Главный праздник Вьетнама, обычно в конце января — начале февраля. Вся страна
                  закрывается на неделю.
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-semibold text-slate-900 mb-1">День поминовения королей Хунгов</div>
                <p className="text-xs text-slate-600">
                  Национальный праздник в честь легендарных основателей вьетнамской нации.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
              <div className="font-semibold text-amber-900 mb-1 text-sm">Подводные камни</div>
              <p className="text-sm text-amber-800">
                Избегайте публичных проявлений недовольства или гнева. Вьетнамцы ценят спокойствие
                и избегают конфликтов. Не фотографируйте людей без разрешения, особенно в
                сельской местности.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


