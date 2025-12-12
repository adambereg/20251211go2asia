/**
 * API Gateway for Go2Asia
 * Routes requests to appropriate backend microservices
 */

export interface Env {
  ENVIRONMENT: string;
  // Add other environment variables as needed
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Health check endpoint
    if (url.pathname === '/health' || url.pathname === '/ready') {
      return new Response(
        JSON.stringify({
          status: 'ok',
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

    // Basic routing logic (will be expanded in Phase 1)
    // For now, return a simple response
    return new Response(
      JSON.stringify({
        message: 'Go2Asia API Gateway',
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

