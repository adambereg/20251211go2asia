/**
 * Auth Service for Go2Asia
 * Handles Clerk webhooks and user management
 */

export interface Env {
  ENVIRONMENT: string;
  // Clerk configuration (to be added via Cloudflare Dashboard)
  CLERK_SECRET_KEY?: string; // Backend API Secret Key
  CLERK_WEBHOOK_SECRET?: string; // Webhook Signing Secret
  // Database (to be added when database is set up)
  DATABASE_URL?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Health check endpoint
    if (url.pathname === '/health' || url.pathname === '/ready') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'auth-service',
          environment: env.ENVIRONMENT,
          timestamp: new Date().toISOString(),
        }),
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );
    }

    // Clerk webhook endpoint (will be implemented in Phase 1)
    if (url.pathname === '/webhooks/clerk' && request.method === 'POST') {
      // TODO: Implement Clerk webhook handler
      return new Response(
        JSON.stringify({ message: 'Clerk webhook endpoint - to be implemented' }),
        {
          status: 501,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Go2Asia Auth Service',
        environment: env.ENVIRONMENT,
        path: url.pathname,
      }),
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  },
};

