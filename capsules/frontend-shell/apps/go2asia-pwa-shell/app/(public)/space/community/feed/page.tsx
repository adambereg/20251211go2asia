import type { Metadata } from 'next';
import { CommunityFeedPageClient } from './CommunityFeedPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Лента сообщества | Space Asia | Go2Asia',
  description: 'Лента постов и активности сообщества Space Asia',
};

export default function CommunityFeedPage() {
  return <CommunityFeedPageClient />;
}
