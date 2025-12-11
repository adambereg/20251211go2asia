import { Chip } from '@go2asia/ui';

export default function ThemeOverviewPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Обзор</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Описание */}
        <div className="px-4 py-4 text-sm text-slate-700 space-y-4">
          <p>
            Эта тема объединяет всю информацию по ключевым вопросам жизни и путешествий
            в Юго-Восточной Азии, собранную из разных разделов Atlas.
          </p>
        </div>

        {/* Основные понятия */}
        <div className="border-t border-slate-100 px-4 py-4">
          <h3 className="font-semibold text-slate-900 mb-3">Основные понятия</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <Chip>TRC</Chip>
            <Chip>eVisa</Chip>
            <Chip>VOA</Chip>
            <Chip>Продление визы</Chip>
          </div>
        </div>

        {/* Что важно знать новичку */}
        <div className="border-t border-slate-100 px-4 py-4">
          <h3 className="font-semibold text-slate-900 mb-3">Что важно знать новичку</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Основные правила и требования</li>
            <li>• Сроки оформления документов</li>
            <li>• Стоимость и способы оплаты</li>
            <li>• Необходимые документы</li>
          </ul>
        </div>

        {/* Частые ошибки */}
        <div className="border-t border-slate-100 px-4 py-4">
          <h3 className="font-semibold text-slate-900 mb-3">Частые ошибки</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Неправильное заполнение документов</li>
            <li>• Пропуск сроков продления</li>
            <li>• Недостаточный срок действия паспорта</li>
          </ul>
        </div>

        {/* Мини-глоссарий */}
        <div className="border-t border-slate-100 px-4 py-4">
          <h3 className="font-semibold text-slate-900 mb-3">Мини-глоссарий</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <div><strong>TRC</strong> — Temporary Resident Certificate</div>
            <div><strong>eVisa</strong> — Электронная виза</div>
            <div><strong>VOA</strong> — Visa on Arrival (виза по прилёту)</div>
          </div>
        </div>
      </section>
    </div>
  );
}

