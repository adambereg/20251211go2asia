import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/**
 * Определение публичных маршрутов (не требуют аутентификации)
 */
const isPublicRoute = createRouteMatcher([
  '/',
  '/atlas(.*)',
  '/pulse(.*)',
  '/blog(.*)',
  '/guru(.*)',
  '/quest(.*)',
  '/rf(.*)',
  '/rielt(.*)',
  '/space(.*)',
  '/about(.*)',
  '/help(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

/**
 * Определение маршрутов аутентификации (доступны всем)
 */
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

/**
 * Определение защищённых маршрутов (требуют аутентификации)
 */
const isProtectedRoute = createRouteMatcher([
  '/connect(.*)',
  '/profile(.*)',
  '/settings(.*)',
  '/partner(.*)',
  '/rf/merchant(.*)',
  '/rf/pro(.*)',
  '/space/me(.*)',
  '/space/posts(.*)',
  '/space/balance(.*)',
  '/space/referrals(.*)',
  '/space/settings(.*)',
  '/quest/my(.*)',
  '/quest/[id]/run(.*)',
]);

/**
 * Определение админских маршрутов (требуют роль admin)
 */
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

/**
 * Определение PRO маршрутов (требуют роль pro-curator или admin)
 */
const isPRORoute = createRouteMatcher(['/rf/pro(.*)', '/quest/pro(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const pathname = req.nextUrl.pathname;

  // Маршруты аутентификации доступны всем (публичные)
  if (isAuthRoute(req)) {
    return NextResponse.next();
  }

  // Если маршрут защищённый и пользователь не авторизован - редирект на вход
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Проверка прав доступа для админских маршрутов
  // Роль доступна в sessionClaims.role благодаря Customize Session Token
  if (isAdminRoute(req)) {
    const role = (sessionClaims?.role as string) || 'spacer';
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Проверка прав доступа для PRO маршрутов
  // Роль доступна в sessionClaims.role благодаря Customize Session Token
  if (isPRORoute(req)) {
    const role = (sessionClaims?.role as string) || 'spacer';
    if (role !== 'pro-curator' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Публичные маршруты доступны всем
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Пропускаем статические файлы и API routes
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Включаем все маршруты кроме статических файлов
    '/(api|trpc)(.*)',
  ],
};














