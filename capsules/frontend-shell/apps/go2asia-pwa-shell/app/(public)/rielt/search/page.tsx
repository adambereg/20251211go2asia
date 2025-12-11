/**
 * Rielt.Market Asia - Search Results Page
 * Страница результатов поиска с фильтрацией
 */

import { SearchResultsClient } from './SearchResultsClient';

// Отключаем статическую генерацию для этой страницы, так как она использует клиентские компоненты с картой
export const dynamic = 'force-dynamic';

export default function SearchResultsPage() {
  return <SearchResultsClient />;
}

