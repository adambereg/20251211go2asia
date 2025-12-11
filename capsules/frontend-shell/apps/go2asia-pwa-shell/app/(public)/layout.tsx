/**
 * Global layout for public routes
 * 
 * IMPORTANT: All public routes are dynamic by default to prevent SSG issues
 * with Clerk hooks, SDK hooks, and client-side state management.
 * 
 * Exceptions: Only Atlas and Blog modules may use SSG if explicitly configured.
 */
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

