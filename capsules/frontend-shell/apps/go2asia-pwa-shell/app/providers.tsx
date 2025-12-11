'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// Условный импорт ReactQueryDevtools только в development
let ReactQueryDevtools: any = null;
if (process.env.NODE_ENV === 'development') {
  try {
    ReactQueryDevtools = require('@tanstack/react-query-devtools').ReactQueryDevtools;
  } catch (e) {
    // DevTools не установлены - это нормально для production
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Время, в течение которого данные считаются свежими
            staleTime: 60 * 1000, // 1 минута
            // Время кэширования данных
            gcTime: 5 * 60 * 1000, // 5 минут (было cacheTime)
            // Повторные попытки при ошибке
            retry: 2,
            // Рефетч при фокусе окна
            refetchOnWindowFocus: false,
            // Рефетч при переподключении
            refetchOnReconnect: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query DevTools только в development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

