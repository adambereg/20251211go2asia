export default function CountryReviewsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Отзывы экспатов</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Отзывы от экспатов</h3>
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-slate-900">Алексей М.</div>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <span>⭐</span>
                    <span>5.0</span>
                  </div>
                </div>
                <div className="text-sm text-slate-600 mb-2">Хошимин, живу 2 года</div>
                <p className="text-sm text-slate-700">
                  Отличное место для цифровых кочевников. Низкая стоимость жизни, хороший интернет,
                  вкусная еда. Единственный минус — жаркий климат и влажность. Но к этому быстро
                  привыкаешь.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-slate-900">Мария К.</div>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <span>⭐</span>
                    <span>4.5</span>
                  </div>
                </div>
                <div className="text-sm text-slate-600 mb-2">Дананг, живу 1 год</div>
                <p className="text-sm text-slate-700">
                  Прекрасный баланс между работой и отдыхом. Пляжи рядом, коворкинги хорошие,
                  люди дружелюбные. Русскоязычное сообщество есть, но не очень большое. Рекомендую
                  для семей с детьми.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

