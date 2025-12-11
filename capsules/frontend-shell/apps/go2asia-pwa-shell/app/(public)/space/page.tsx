import type { Metadata } from 'next';
import { SpacePageClient } from './SpacePageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Space Asia - Персональное пространство | Go2Asia',
  description: 'Ваше персональное пространство в экосистеме Go2Asia',
};

export default function SpacePage() {
  return <SpacePageClient />;
}
