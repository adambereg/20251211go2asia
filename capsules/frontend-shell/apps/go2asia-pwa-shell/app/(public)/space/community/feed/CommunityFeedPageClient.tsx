'use client';

import { SpaceLayout } from '@/components/space/Shared';
import { FeedView } from '@/components/space/Feed';
import { mockPosts, currentUser } from '@/components/space/mockData';

export function CommunityFeedPageClient() {
  return (
    <SpaceLayout>
      <FeedView posts={mockPosts} currentUser={currentUser} />
    </SpaceLayout>
  );
}


