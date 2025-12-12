/**
 * Referral Service for Go2Asia
 * Manages referral codes and referral relationships
 */

export interface Env {
  ENVIRONMENT: string;
  // Add database URL and other env vars as needed
  // DATABASE_URL?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Health check endpoint
    if (url.pathname === '/health' || url.pathname === '/ready') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'referral-service',
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

    // Referral endpoints (will be implemented in Phase 1)
    if (url.pathname.startsWith('/codes') && request.method === 'GET') {
      // TODO: Implement referral code generation and validation
      return new Response(
        JSON.stringify({ message: 'Referral codes endpoint - to be implemented' }),
        {
          status: 501,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Go2Asia Referral Service',
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

