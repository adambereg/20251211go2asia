/**
 * Error Message Component
 * Компонент для отображения сообщений об ошибках
 */

import { isApiError, isNetworkError, isTimeoutError } from '@/lib/api/errors';

interface ErrorMessageProps {
  error: unknown;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  let message = 'Произошла ошибка';
  let title = 'Ошибка';

  if (isApiError(error)) {
    if (error.status === 404) {
      title = 'Не найдено';
      message = 'Запрашиваемый ресурс не найден';
    } else if (error.status === 403) {
      title = 'Доступ запрещён';
      message = 'У вас нет доступа к этому ресурсу';
    } else if (error.status >= 500) {
      title = 'Ошибка сервера';
      message = 'Произошла ошибка на сервере. Попробуйте позже';
    } else {
      message = error.message || 'Произошла ошибка при загрузке данных';
    }
  } else if (isNetworkError(error)) {
    title = 'Ошибка сети';
    message = 'Не удалось подключиться к серверу. Проверьте подключение к интернету';
  } else if (isTimeoutError(error)) {
    title = 'Таймаут';
    message = 'Запрос занял слишком много времени. Попробуйте снова';
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4">
        <svg
          className="w-16 h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
        >
          Попробовать снова
        </button>
      )}
    </div>
  );
}



