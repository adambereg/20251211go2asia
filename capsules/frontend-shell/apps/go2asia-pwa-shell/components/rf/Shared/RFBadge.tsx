import { Badge } from '@go2asia/ui';
import { Handshake } from 'lucide-react';

interface RFBadgeProps {
  className?: string;
}

export function RFBadge({ className }: RFBadgeProps) {
  return (
    <Badge variant="russian-friendly" className={className}>
      <Handshake size={12} className="mr-1" />
      Russian Friendly
    </Badge>
  );
}

