/**
 * Atlas Layout
 * Layout для модуля Atlas с ErrorBoundary
 */

import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function AtlasLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </ErrorBoundary>
  );
}



