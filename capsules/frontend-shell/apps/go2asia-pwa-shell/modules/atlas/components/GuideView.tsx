import type { FC } from 'react';
import { Card, CardContent, Chip } from '@go2asia/ui';

export interface GuidePlace {
  id: string;
  title: string;
  subtitle?: string;
}

export interface GuideViewProps {
  title: string;
  audience?: string;
  budgetHint?: string;
  durationHint?: string;
  seasonHint?: string;
  checkInLabel?: string;
  places?: GuidePlace[];
}

// Подборка / гайд: структура с маршрутом, бюджетом, временем и списком мест.
export const GuideView: FC<GuideViewProps> = ({
  title,
  audience,
  budgetHint,
  durationHint,
  seasonHint,
  checkInLabel = 'Точки check-in появятся после запуска квестов',
  places = [],
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-3">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <a href="/atlas" className="hover:text-sky-600">
              Atlas
            </a>
            <span>/</span>
            <span className="text-slate-900">Гайд</span>
          </nav>
          <h1 className="text-h1 md:text-4xl lg:text-5xl font-bold text-slate-900">
            {title}
          </h1>
          <div className="flex flex-wrap gap-2 text-sm text-slate-600">
            {audience && <Chip>{audience}</Chip>}
            {budgetHint && <Chip>Бюджет: {budgetHint}</Chip>}
            {durationHint && <Chip>Время: {durationHint}</Chip>}
            {seasonHint && <Chip>Сезон: {seasonHint}</Chip>}
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Card>
          <CardContent className="p-5 space-y-3">
            <h2 className="text-h3 md:text-2xl font-semibold text-slate-900">
              Маршрут и места
            </h2>
            {places.length === 0 ? (
              <p className="text-sm text-slate-600">
                Структура гайда готова. Места и маршрут будут добавлены после
                настройки контент-квестов и интеграции с Quest Asia.
              </p>
            ) : (
              <ol className="space-y-2 list-decimal list-inside">
                {places.map((place) => (
                  <li key={place.id}>
                    <div className="font-medium text-slate-900">
                      {place.title}
                    </div>
                    {place.subtitle && (
                      <div className="text-sm text-slate-600">
                        {place.subtitle}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-2">
            <h2 className="text-h3 md:text-2xl font-semibold text-slate-900">
              Лайфхаки и сезонные поправки
            </h2>
            <p className="text-sm text-slate-600">
              Здесь появятся советы от редакции, PRO-спейсеров и проверенных
              участников сообщества.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-2">
            <h2 className="text-h3 md:text-2xl font-semibold text-slate-900">
              Check-in точки и квесты
            </h2>
            <p className="text-sm text-slate-600">{checkInLabel}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GuideView;


