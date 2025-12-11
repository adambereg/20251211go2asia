import type { FC } from 'react';
import { Card, CardContent } from '@go2asia/ui';

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface ChecklistViewProps {
  title: string;
  description?: string;
  items?: ChecklistItem[];
}

// Каркас практикума-чеклиста (например, «Переезд на 90 дней во Вьетнам»).
export const ChecklistView: FC<ChecklistViewProps> = ({
  title,
  description,
  items = [],
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-3">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <a href="/atlas" className="hover:text-sky-600">
              Atlas
            </a>
            <span>/</span>
            <span className="text-slate-900">Чеклист</span>
          </nav>
          <h1 className="text-h1 md:text-3xl lg:text-4xl font-bold text-slate-900">
            {title}
          </h1>
          {description && (
            <p className="text-body text-slate-700 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-5 space-y-3">
            {items.length === 0 ? (
              <p className="text-sm text-slate-600">
                Здесь появятся шаги чеклиста. Структура уже готова для
                интеграции с практикумами и геймификацией.
              </p>
            ) : (
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border border-slate-300 bg-slate-50"
                    >
                      {/* Заглушка под будущий чекбокс из @go2asia/ui */}
                    </span>
                    <span className="text-sm text-slate-800">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ChecklistView;


