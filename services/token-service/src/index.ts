/**
 * Token Service for Go2Asia
 * Manages Points, G2A Token, and NFT balances
 * Phase 1: Only Points support
 * Phase 3: Extended with G2A Token and NFT
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
          service: 'token-service',
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

    // Token endpoints (will be implemented in Phase 1)
    if (url.pathname === '/balance' && request.method === 'GET') {
      // TODO: Implement balance retrieval (Points in Phase 1)
      return new Response(
        JSON.stringify({ message: 'Balance endpoint - to be implemented' }),
        {
          status: 501,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Go2Asia Token Service',
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

