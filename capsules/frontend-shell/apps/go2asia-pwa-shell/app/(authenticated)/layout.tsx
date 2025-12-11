/**
 * Global layout for authenticated routes
 * 
 * IMPORTANT: All authenticated routes MUST be dynamic because they:
 * - Use Clerk hooks (useAuth, useUser, useSession)
 * - Use SDK hooks (react-query with API calls)
 * - Require user context and client-side state
 * 
 * Netlify does NOT support SSG/ISR for routes with Clerk hooks.
 */
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

