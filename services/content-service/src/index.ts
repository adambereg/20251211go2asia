/**
 * Content API Service for Go2Asia
 * Aggregates content from domain services (Atlas, Pulse, Media)
 */

export interface Env {
  ENVIRONMENT: string;
  // Add service URLs and other env vars as needed
  // ATLAS_SERVICE_URL?: string;
  // PULSE_SERVICE_URL?: string;
  // MEDIA_SERVICE_URL?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Health check endpoint
    if (url.pathname === '/health' || url.pathname === '/ready') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'content-service',
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

    // Content aggregation endpoints (will be implemented in Phase 1)
    if (url.pathname === '/feed' && request.method === 'GET') {
      // TODO: Aggregate feeds from Atlas/Pulse/Media services
      return new Response(
        JSON.stringify({ message: 'Content feed endpoint - to be implemented' }),
        {
          status: 501,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Go2Asia Content Service',
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

