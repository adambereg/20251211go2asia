import type { Metadata } from 'next';
import { ReviewsListView } from '@/components/rf/Merchant/Reviews';

export const metadata: Metadata = {
  title: 'Управление отзывами | Кабинет партнёра | Russian Friendly',
  description: 'Просмотр и ответы на отзывы клиентов',
};

export default function MerchantReviewsPage() {
  return <ReviewsListView />;
}

