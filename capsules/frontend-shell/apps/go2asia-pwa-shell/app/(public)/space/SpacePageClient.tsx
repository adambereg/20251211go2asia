'use client';

import { SpaceLayout } from '@/components/space/Shared';
import { DashboardView } from '@/components/space/Dashboard';
import {
  currentUser,
  mockDashboardStats,
  mockQuickActions,
  mockRecommendations,
  mockActivityItems,
  mockWeeklyGoals,
} from '@/components/space/mockData';

export function SpacePageClient() {
  return (
    <SpaceLayout>
      <DashboardView
        user={currentUser}
        stats={mockDashboardStats}
        quickActions={mockQuickActions}
        recommendations={mockRecommendations}
        activities={mockActivityItems}
        weeklyGoals={mockWeeklyGoals}
      />
    </SpaceLayout>
  );
}


