'use client';

import { useState } from 'react';
import { Card, Chip, Button } from '@go2asia/ui';
import { PostCard } from '../Feed/PostCard';
import { Edit, Trash2, Eye, Link2 } from 'lucide-react';
import type { Post } from '../types';
import { mockPosts, mockDrafts, currentUser } from '../mockData';

type PostsTab = 'all' | 'published' | 'drafts' | 'saved' | 'guides' | 'reports';

const TABS: { id: PostsTab; label: string }[] = [
  { id: 'all', label: 'Все посты' },
  { id: 'published', label: 'Опубликованные' },
  { id: 'drafts', label: 'Черновики' },
  { id: 'saved', label: 'Сохранённые' },
  { id: 'guides', label: 'Подборки / Гайды' },
  { id: 'reports', label: 'Отчёты' },
];

export function PostsView() {
  const [activeTab, setActiveTab] = useState<PostsTab>('all');

  const getFilteredPosts = (): Post[] => {
    switch (activeTab) {
      case 'published':
        return mockPosts.filter((post) => post.author.id === currentUser.id);
      case 'drafts':
        return mockDrafts;
      case 'saved':
        return mockPosts.filter((post) => post.isSaved);
      case 'guides':
        return mockPosts.filter((post) => post.type === 'guide');
      case 'reports':
        return mockPosts.filter(
          (post) =>
            post.type === 'place-report' ||
            post.type === 'event-report' ||
            post.type === 'quest-report'
        );
      default:
        return [
          ...mockPosts.filter((post) => post.author.id === currentUser.id),
          ...mockDrafts,
        ];
    }
  };

  const posts = getFilteredPosts();

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {TABS.map((tab) => (
          <Chip
            key={tab.id}
            selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            size="md"
          >
            {tab.label}
          </Chip>
        ))}
      </div>

      {posts.length === 0 ? (
        <Card className="border-2 border-slate-200 p-8">
          <div className="text-center text-slate-500">
            Нет постов в этой категории
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-2 border-slate-200 p-4 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <PostCard post={post} />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="ghost" size="sm" icon={Eye} iconPosition="left">
                    Просмотреть
                  </Button>
                  <Button variant="ghost" size="sm" icon={Edit} iconPosition="left">
                    Редактировать
                  </Button>
                  <Button variant="ghost" size="sm" icon={Link2} iconPosition="left">
                    Копировать ссылку
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    iconPosition="left"
                    className="text-red-600"
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
