import { Badge } from '@go2asia/ui';
import { Ticket } from 'lucide-react';

interface VoucherRibbonProps {
  className?: string;
}

export function VoucherRibbon({ className }: VoucherRibbonProps) {
  return (
    <Badge variant="new" className={className}>
      <Ticket size={12} className="mr-1" />
      Есть ваучер
    </Badge>
  );
}


