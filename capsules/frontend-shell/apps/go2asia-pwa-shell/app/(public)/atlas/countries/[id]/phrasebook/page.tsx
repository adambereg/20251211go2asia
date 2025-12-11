export default function CountryPhrasebookPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Разговорник</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Основные фразы</h3>
            <div className="space-y-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="font-semibold text-slate-900 mb-1">Привет / Здравствуйте</div>
                <div className="text-sm text-slate-600">Xin chào (Син чао)</div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="font-semibold text-slate-900 mb-1">Спасибо</div>
                <div className="text-sm text-slate-600">Cảm ơn (Кам он)</div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="font-semibold text-slate-900 mb-1">Пожалуйста</div>
                <div className="text-sm text-slate-600">Xin lỗi (Син лой) / Không có gì (Конг ко зи)</div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="font-semibold text-slate-900 mb-1">Извините</div>
                <div className="text-sm text-slate-600">Xin lỗi (Син лой)</div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="font-semibold text-slate-900 mb-1">Сколько стоит?</div>
                <div className="text-sm text-slate-600">Bao nhiêu tiền? (Бао ньеу тиен?)</div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="font-semibold text-slate-900 mb-1">Я не понимаю</div>
                <div className="text-sm text-slate-600">Tôi không hiểu (Той конг хьеу)</div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="font-semibold text-slate-900 mb-1">Где туалет?</div>
                <div className="text-sm text-slate-600">Nhà vệ sinh ở đâu? (Ня ве синх о дау?)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

