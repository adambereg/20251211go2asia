import type { FC, ReactNode } from 'react';
import { Card, CardContent } from '@go2asia/ui';

export type CalculatorType = 'cost-of-living' | 'visa';

export interface CalculatorScaffoldProps {
  type: CalculatorType;
  title: string;
  description?: string;
  formSlot?: ReactNode;
  resultSlot?: ReactNode;
}

// Каркас калькуляторов Atlas (стоимость жизни, визовый калькулятор).
export const CalculatorScaffold: FC<CalculatorScaffoldProps> = ({
  type,
  title,
  description,
  formSlot,
  resultSlot,
}) => {
  const helperHint =
    type === 'cost-of-living'
      ? 'После интеграции с данными из Rielt.Market, AIRent и Atlas расчёт будет учитывать реальные вилки цен по районам.'
      : 'После интеграции с визовым API и редакционными правилами калькулятор будет подсчитывать варианты виз по гражданству и цели визита.';

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-3">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <a href="/atlas" className="hover:text-sky-600">
              Atlas
            </a>
            <span>/</span>
            <span className="text-slate-900">Калькулятор</span>
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="text-h3 md:text-2xl font-semibold text-slate-900">
              Ввод данных
            </h2>
            {formSlot ?? (
              <p className="text-sm text-slate-600">
                Форма калькулятора ещё не подключена. Здесь будут поля для
                ввода параметров и выбора сценариев.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="text-h3 md:text-2xl font-semibold text-slate-900">
              Результат
            </h2>
            {resultSlot ?? (
              <p className="text-sm text-slate-600">
                Результаты расчёта появятся здесь после подключения логики
                калькулятора и SDK.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-slate-500 leading-relaxed">
              {helperHint}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CalculatorScaffold;


