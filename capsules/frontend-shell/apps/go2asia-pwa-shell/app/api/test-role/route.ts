import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/**
 * Тестовый endpoint для проверки роли в sessionClaims
 * GET /api/test-role
 * 
 * Используется для проверки настройки Customize Session Token в Clerk Dashboard
 */
export async function GET() {
  try {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Пользователь не авторизован',
        },
        { status: 401 }
      );
    }

    // Проверяем роль из sessionClaims (благодаря Customize Session Token)
    const role = (sessionClaims?.role as string) || 'spacer';

    // Также проверяем publicMetadata для сравнения
    const publicMetadataRole = (sessionClaims as any)?.publicMetadata?.role as string | undefined;
    const userMetadata = (sessionClaims as any)?.user_metadata;

    return NextResponse.json({
      success: true,
      userId,
      role: {
        fromSessionClaims: role,
        fromPublicMetadata: publicMetadataRole,
        match: role === publicMetadataRole,
      },
      sessionClaims: {
        role,
        sub: sessionClaims?.sub,
        email: (sessionClaims as any)?.email,
        user_metadata: userMetadata,
        publicMetadata: (sessionClaims as any)?.publicMetadata,
      },
      message: role === 'admin' 
        ? '✅ Роль admin успешно получена из sessionClaims.role!' 
        : `Роль: ${role}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Неизвестная ошибка',
      },
      { status: 500 }
    );
  }
}

