'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Award, BookOpen, Home, Star, ChevronRight } from 'lucide-react';
import type { Attachments, AttachmentType } from '../types';

interface AttachmentCardProps {
  attachments: Attachments;
}

const ATTACHMENT_CONFIG: Record<
  AttachmentType,
  {
    icon: typeof MapPin;
    color: string;
    bgColor: string;
    label: string;
  }
> = {
  place: {
    icon: MapPin,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    label: 'Место',
  },
  event: {
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    label: 'Событие',
  },
  quest: {
    icon: Award,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    label: 'Квест',
  },
  guide: {
    icon: BookOpen,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    label: 'Гайд',
  },
  housing: {
    icon: Home,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    label: 'Жильё',
  },
};

function getAttachmentLink(attachments: Attachments): string {
  switch (attachments.type) {
    case 'place':
      return `/atlas/places/${attachments.place?.id}`;
    case 'event':
      return `/pulse/${attachments.event?.id}`;
    case 'quest':
      return `/quest/${attachments.quest?.id}`;
    case 'guide':
      return `/atlas/guides/${attachments.guide?.id}`;
    case 'housing':
      return `/rielt/listings/${attachments.housing?.id}`;
    default:
      return '#';
  }
}

export function AttachmentCard({ attachments }: AttachmentCardProps) {
  const config = ATTACHMENT_CONFIG[attachments.type];
  const Icon = config.icon;
  const link = getAttachmentLink(attachments);

  // Get data based on attachment type
  let title = '';
  let description = '';
  let image: string | undefined;
  let extra: React.ReactNode = null;

  switch (attachments.type) {
    case 'place':
      if (attachments.place) {
        title = attachments.place.name;
        description = attachments.place.address;
        image = attachments.place.image;
        if (attachments.place.rating) {
          extra = (
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4" fill="currentColor" />
              <span className="text-sm font-medium">{attachments.place.rating}</span>
            </div>
          );
        }
      }
      break;
    case 'event':
      if (attachments.event) {
        title = attachments.event.title;
        description = new Date(attachments.event.date).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        image = attachments.event.image;
        extra = (
          <span className="text-sm text-slate-500">{attachments.event.location}</span>
        );
      }
      break;
    case 'quest':
      if (attachments.quest) {
        title = attachments.quest.title;
        description = attachments.quest.description;
        image = attachments.quest.image;
        extra = (
          <span className="text-sm font-medium text-amber-600">
            +{attachments.quest.points} Points
          </span>
        );
      }
      break;
    case 'guide':
      if (attachments.guide) {
        title = attachments.guide.title;
        description = attachments.guide.excerpt;
        image = attachments.guide.image;
      }
      break;
    case 'housing':
      if (attachments.housing) {
        title = attachments.housing.title;
        description = attachments.housing.price;
        image = attachments.housing.image;
      }
      break;
  }

  if (!title) return null;

  return (
    <Link
      href={link}
      className={`flex gap-3 p-3 rounded-xl border border-slate-200 ${config.bgColor} hover:border-slate-300 transition-colors group`}
    >
      {/* Image */}
      {image && (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Type Badge */}
        <div className="flex items-center gap-1.5 mb-1">
          <Icon className={`w-3.5 h-3.5 ${config.color}`} />
          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
        </div>

        {/* Title */}
        <h4 className="font-semibold text-slate-900 line-clamp-1 group-hover:text-sky-600 transition-colors">
          {title}
        </h4>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-1 mt-0.5">{description}</p>

        {/* Extra */}
        {extra && <div className="mt-1">{extra}</div>}
      </div>

      {/* Arrow */}
      <div className="flex items-center">
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}

