import type { FC, ReactNode } from 'react';
import { Card, CardContent } from '@go2asia/ui';

export interface TopicHubViewProps {
  title: string;
  description?: string;
  // Список разделов внутри тематического хаба (например «Визы и миграция»)
  sections?: {
    id: string;
    title: string;
    description?: string;
  }[];
  children?: ReactNode;
}

// Тематический хаб Atlas (Визы, Налоги, Образование и т.д.)
export const TopicHubView: FC<TopicHubViewProps> = ({
  title,
  description,
  sections = [],
  children,
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <a href="/atlas" className="hover:text-sky-600">
              Atlas
            </a>
            <span>/</span>
            <span className="text-slate-900">{title}</span>
          </nav>
          <h1 className="text-h1 md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-body text-slate-700 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {sections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <Card key={section.id} hover>
                <CardContent className="p-5">
                  <h2 className="text-h3 md:text-2xl font-semibold text-slate-900 mb-2">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-sm text-slate-600">
                      {section.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {children}
      </main>
    </div>
  );
};

export default TopicHubView;


