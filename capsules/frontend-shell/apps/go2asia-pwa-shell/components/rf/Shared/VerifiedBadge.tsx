import { Badge } from '@go2asia/ui';
import { CheckCircle2 } from 'lucide-react';

interface VerifiedBadgeProps {
  className?: string;
}

export function VerifiedBadge({ className }: VerifiedBadgeProps) {
  return (
    <Badge variant="verified" className={className}>
      <CheckCircle2 size={12} className="mr-1" />
      Проверено PRO
    </Badge>
  );
}

