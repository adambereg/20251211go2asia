'use client';

/**
 * Rielt.Market Asia - EmptyState
 * Пустое состояние (нет результатов)
 */

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      {description && <p className="text-slate-600">{description}</p>}
    </div>
  );
}



















