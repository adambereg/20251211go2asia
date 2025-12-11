import type { Metadata } from 'next';
import { VouchersListView, CodeRedeem } from '@/components/rf/Merchant/Vouchers';

export const metadata: Metadata = {
  title: 'Управление ваучерами | Кабинет партнёра | Russian Friendly',
  description: 'Создание и управление ваучерами для вашего заведения',
};

export default function MerchantVouchersPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <VouchersListView />
      </div>
      <div className="lg:col-span-1">
        <CodeRedeem />
      </div>
    </div>
  );
}

