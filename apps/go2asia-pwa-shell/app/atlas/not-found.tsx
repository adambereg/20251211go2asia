/**
 * Atlas Not Found Page
 * Страница 404 для модуля Atlas
 */

import Link from 'next/link';

export default function AtlasNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Страница не найдена</h2>
        <p className="text-gray-600 mb-8">
          Запрашиваемая страница не существует или была перемещена
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/atlas"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
          >
            На главную Atlas
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white text-sky-600 border-2 border-sky-600 rounded-lg font-medium hover:bg-sky-50 transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}



