'use client';

/**
 * Компонент для настройки интеграции Clerk с SDK
 * Вызывает setupClerkAuth() для передачи функции получения токена в SDK mutator
 */

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { setupClerkAuth } from '@go2asia/sdk/clerk-integration';

export function ClerkAuthSetup() {
  const { getToken, isLoaded } = useAuth();

  useEffect(() => {
    // Настраиваем SDK для использования Clerk токена только после загрузки Clerk
    if (isLoaded && getToken) {
      setupClerkAuth(getToken);
    }
  }, [getToken, isLoaded]);

  // Компонент не рендерит ничего
  return null;
}


