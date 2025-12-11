export default function CountryCalculatorPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Калькулятор стоимости</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Расчёт стоимости жизни</h3>
            <div className="text-sm text-slate-700">
              <p>
                Здесь будет интерактивный калькулятор для расчёта примерной стоимости жизни в
                стране в зависимости от города, образа жизни и потребностей.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 mt-4">
              <div className="text-sm text-slate-600">
                Калькулятор будет включать:
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 mt-2 ml-2">
                <li>Аренда жилья (студия, 1-комн., 2-комн.)</li>
                <li>Еда (кафе, рестораны, готовка дома)</li>
                <li>Транспорт (байк, такси, общественный)</li>
                <li>Коммунальные услуги</li>
                <li>Развлечения и досуг</li>
                <li>Здоровье и фитнес</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

