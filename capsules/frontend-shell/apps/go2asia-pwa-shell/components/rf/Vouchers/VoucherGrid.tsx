'use client';

import { VoucherCard } from './VoucherCard';
import type { Voucher } from '../types';

interface VoucherGridProps {
  vouchers: Voucher[];
}

export function VoucherGrid({ vouchers }: VoucherGridProps) {
  if (vouchers.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vouchers.map((voucher) => (
        <VoucherCard key={voucher.id} voucher={voucher} />
      ))}
    </div>
  );
}

