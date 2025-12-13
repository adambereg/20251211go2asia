/**
 * Atlas Home Page
 * Главная страница модуля Atlas Asia
 */

import Link from 'next/link';

export default function AtlasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Atlas Asia
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Энциклопедия мест Юго-Восточной Азии. Изучайте страны, города и достопримечательности
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link
          href="/atlas/countries"
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-4xl mb-4">🌏</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Страны</h2>
          <p className="text-gray-600">
            Изучите страны Юго-Восточной Азии: история, культура, визы и многое другое
          </p>
        </Link>

        <Link
          href="/atlas/cities"
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-4xl mb-4">🏙️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Города</h2>
          <p className="text-gray-600">
            Откройте для себя города: районы, инфраструктура, лучшие места
          </p>
        </Link>

        <Link
          href="/atlas/places"
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-4xl mb-4">📍</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Места</h2>
          <p className="text-gray-600">
            Исследуйте достопримечательности, заведения и интересные локации
          </p>
        </Link>
      </div>
    </div>
  );
}



