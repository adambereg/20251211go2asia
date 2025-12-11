'use client';

import Link from 'next/link';
import { Card } from '@go2asia/ui';
import { FileText, BookOpen, Bookmark, FileEdit, ArrowRight } from 'lucide-react';
import type { DashboardStats } from '../types';

interface MyContentBlockProps {
  stats: DashboardStats;
}

const contentItems = [
  {
    id: 'posts',
    label: 'Мои посты',
    icon: FileText,
    href: '/space/posts?filter=published',
    countKey: 'postsCount' as const,
  },
  {
    id: 'guides',
    label: 'Подборки/Гайды',
    icon: BookOpen,
    href: '/space/posts?filter=guides',
    countKey: 'guidesCount' as const,
  },
  {
    id: 'saved',
    label: 'Сохранённое',
    icon: Bookmark,
    href: '/space/posts?filter=saved',
    countKey: 'savedCount' as const,
  },
  {
    id: 'drafts',
    label: 'Черновики',
    icon: FileEdit,
    href: '/space/posts?filter=drafts',
    countKey: 'draftsCount' as const,
  },
] as const;

export function MyContentBlock({ stats }: MyContentBlockProps) {
  return (
    <Card className="border-2 border-slate-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Ваш контент</h2>
        <Link
          href="/space/posts"
          className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
        >
          Все
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {contentItems.map((item) => {
          const Icon = item.icon;
          const count = stats[item.countKey];

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <Icon className="h-5 w-5 text-slate-600" />
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">{count}</div>
                <div className="text-xs text-slate-600">{item.label}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}


