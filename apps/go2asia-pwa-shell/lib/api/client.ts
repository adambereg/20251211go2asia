/**
 * Base API Client
 * Базовый HTTP-клиент для всех запросов к backend API
 */

import { ApiError, NetworkError, TimeoutError } from './errors';

export interface RequestConfig extends RequestInit {
  timeout?: number;
}

const DEFAULT_TIMEOUT = 10000; // 10 секунд

/**
 * Fetch с таймаутом
 */
async function fetchWithTimeout(
  url: string,
  config: RequestConfig = {}
): Promise<Response> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchConfig } = config;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchConfig,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new TimeoutError('Request timeout');
    }
    throw new NetworkError('Network request failed');
  }
}

/**
 * Базовый API клиент
 * @param endpoint - путь к эндпоинту (без baseUrl)
 * @param config - конфигурация запроса
 * @returns Promise с данными ответа
 */
export async function apiClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  // Если NEXT_PUBLIC_API_URL не установлен, используем относительные пути для локальных API routes
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const url = baseUrl ? `${baseUrl}${endpoint}` : endpoint;

  try {
    const response = await fetchWithTimeout(url, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      }

      throw new ApiError(
        response.status,
        `API error: ${response.statusText}`,
        errorData
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError || error instanceof NetworkError || error instanceof TimeoutError) {
      throw error;
    }
    throw new NetworkError('Unknown error occurred');
  }
}
