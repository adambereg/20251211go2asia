'use client';

/**
 * Quest Asia - Empty State
 * Компонент пустого состояния
 */

import { useRouter } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const router = useRouter();

  const handleAction = () => {
    if (actionHref) {
      router.push(actionHref);
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-12 text-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 mb-6 max-w-md">{description}</p>
        {actionLabel && actionHref && (
          <button
            onClick={handleAction}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

