/**
 * Common API Types
 * Общие типы для API-ответов
 */

export interface ApiResponse<T> {
  status: 'ok' | 'error';
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}
