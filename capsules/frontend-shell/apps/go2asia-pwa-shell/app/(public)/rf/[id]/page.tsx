import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PartnerDetailView } from '@/components/rf/PartnerDetail';
import { mockPartners } from '@/components/rf/mockData';

interface PartnerPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PartnerPageProps): Promise<Metadata> {
  const { id } = await params;
  const partner = mockPartners.find((p) => p.id === id);

  if (!partner) {
    return {
      title: 'Партнёр не найден | Russian Friendly',
    };
  }

  return {
    title: `${partner.name} | Russian Friendly | Go2Asia`,
    description: partner.description,
    openGraph: {
      title: partner.name,
      description: partner.description,
      images: [partner.coverImage],
      type: 'website',
    },
  };
}

export default async function PartnerPage({ params }: PartnerPageProps) {
  const { id } = await params;
  const partner = mockPartners.find((p) => p.id === id);

  if (!partner) {
    notFound();
  }

  return <PartnerDetailView partner={partner} />;
}

