import { PROLayout } from '@/components/rf/PRO';

export default function PRODashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PROLayout>{children}</PROLayout>;
}

