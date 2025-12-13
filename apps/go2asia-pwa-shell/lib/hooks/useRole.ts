'use client';

import { useUser } from '@clerk/nextjs';

export type Role = 'spacer' | 'vip' | 'pro-curator' | 'partner' | 'admin';

/**
 * Hook для получения роли пользователя
 * Роль берётся из publicMetadata.role (Clerk Public Metadata)
 * В production роль также доступна в sessionClaims.role благодаря Customize Session Token
 */
export function useRole(): Role {
  const { user } = useUser();
  // Роль хранится в publicMetadata.role
  return (user?.publicMetadata?.role as Role) || 'spacer';
}














