/**
 * Loading Spinner Component
 * Компонент индикатора загрузки
 */

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin`}
        role="status"
        aria-label="Загрузка"
      >
        <span className="sr-only">Загрузка...</span>
      </div>
    </div>
  );
}



