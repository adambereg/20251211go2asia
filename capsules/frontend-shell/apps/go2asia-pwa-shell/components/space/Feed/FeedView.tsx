'use client';

import { useState } from 'react';
import { EmptyState, Skeleton } from '@go2asia/ui';
import { MessageSquare, Bookmark, Users, TrendingUp } from 'lucide-react';
import { FeedFilters } from './FeedFilters';
import { PostCard } from './PostCard';
import { PostComposer } from './PostComposer';
import type { FeedFilter, Post, User } from '../types';

interface FeedViewProps {
  posts: Post[];
  currentUser: User;
  isLoading?: boolean;
}

const EMPTY_STATES: Record<FeedFilter, { icon: typeof MessageSquare; title: string; description: string }> = {
  my: {
    icon: MessageSquare,
    title: 'У вас ещё нет постов',
    description: 'Поделитесь своим первым опытом с сообществом',
  },
  friends: {
    icon: Users,
    title: 'Нет постов от друзей',
    description: 'Добавьте друзей, чтобы видеть их публикации',
  },
  groups: {
    icon: Users,
    title: 'Нет постов из групп',
    description: 'Вступите в группы, чтобы видеть их контент',
  },
  trending: {
    icon: TrendingUp,
    title: 'Пока нет трендов',
    description: 'Популярные посты появятся здесь',
  },
  saved: {
    icon: Bookmark,
    title: 'Нет сохранённых постов',
    description: 'Сохраняйте интересные материалы для быстрого доступа',
  },
  following: {
    icon: Users,
    title: 'Нет постов от подписок',
    description: 'Подпишитесь на интересных авторов',
  },
};

export function FeedView({ posts, currentUser, isLoading = false }: FeedViewProps) {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('my');
  const [localPosts, setLocalPosts] = useState<Post[]>(posts);

  // Filter posts based on active filter
  const filteredPosts = localPosts.filter((post) => {
    switch (activeFilter) {
      case 'my':
        return true; // Show all for demo
      case 'friends':
        return post.privacy === 'friends' || post.author.isFriend;
      case 'groups':
        return post.groupId !== undefined;
      case 'trending':
        return post.likesCount > 50;
      case 'saved':
        return post.isSaved;
      case 'following':
        return post.author.isFollowing;
      default:
        return true;
    }
  });

  const handleNewPost = (content: string) => {
    const newPost: Post = {
      id: `post-new-${Date.now()}`,
      author: currentUser,
      type: 'text',
      privacy: 'public',
      content,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      savesCount: 0,
      isLiked: false,
      isSaved: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLocalPosts([newPost, ...localPosts]);
  };

  const emptyState = EMPTY_STATES[activeFilter];
  const EmptyIcon = emptyState.icon;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Filters */}
      <FeedFilters active={activeFilter} onChange={setActiveFilter} />

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Composer */}
        <div className="mb-6">
          <PostComposer user={currentUser} onSubmit={handleNewPost} />
        </div>

        {/* Posts */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-start gap-3 mb-4">
                  <Skeleton variant="circular" className="h-12 w-12" />
                  <div className="flex-1">
                    <Skeleton variant="text" className="h-5 w-2/5" />
                    <Skeleton variant="text" className="h-4 w-1/3 mt-1" />
                  </div>
                </div>
                <Skeleton variant="text" className="h-4 w-full" />
                <Skeleton variant="text" className="h-4 w-11/12 mt-2" />
                <Skeleton variant="text" className="h-4 w-3/5 mt-2" />
                <Skeleton variant="rectangular" className="h-48 w-full mt-4 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {/* Load More */}
            <div className="text-center py-4">
              <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors">
                Показать ещё
              </button>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={<EmptyIcon className="w-12 h-12" />}
            title={emptyState.title}
            description={emptyState.description}
          />
        )}
      </div>
    </div>
  );
}

