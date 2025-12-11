'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BottomNav as UIBottomNav } from '@go2asia/ui';

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Определяем активный модуль на основе pathname
  const getActiveModule = (): 'home' | 'atlas' | 'pulse' | 'blog' | 'space' => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/atlas')) return 'atlas';
    if (pathname.startsWith('/pulse')) return 'pulse';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/space')) return 'space';
    return 'home';
  };

  const handleModuleChange = (module: 'home' | 'atlas' | 'pulse' | 'blog' | 'space') => {
    const routes: Record<string, string> = {
      home: '/',
      atlas: '/atlas',
      pulse: '/pulse',
      blog: '/blog',
      space: '/space',
    };
    router.push(routes[module] || '/');
  };

  return (
    <UIBottomNav
      activeModule={getActiveModule()}
      onModuleChange={handleModuleChange}
    />
  );
}
