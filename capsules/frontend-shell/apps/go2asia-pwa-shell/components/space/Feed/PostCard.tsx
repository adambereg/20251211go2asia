'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, Badge, Chip } from '@go2asia/ui';
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Globe,
  Users,
  Lock,
  CheckCircle2,
  MapPin,
  Award,
} from 'lucide-react';
import type { Post, PostPrivacy } from '../types';
import { PRIVACY_LABELS, ROLE_COLORS } from '../types';
import { AttachmentCard } from '../Shared/AttachmentCard';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onSave?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onComment?: (postId: string) => void;
}

const PRIVACY_ICONS: Record<PostPrivacy, typeof Globe> = {
  public: Globe,
  friends: Users,
  group: Users,
  private: Lock,
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'только что';
  if (diffMins < 60) return `${diffMins} мин`;
  if (diffHours < 24) return `${diffHours} ч`;
  if (diffDays < 7) return `${diffDays} д`;
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function PostCard({ post, onLike, onSave, onShare, onComment }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const PrivacyIcon = PRIVACY_ICONS[post.privacy];
  const timeAgo = formatTimeAgo(post.createdAt);
  const roleColors = ROLE_COLORS[post.author.role];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    onLike?.(post.id);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(post.id);
  };

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <Link href={`/space/${post.author.username}`}>
          <Avatar initials={getInitials(post.author.displayName)} size="md" />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/space/${post.author.username}`}
              className="font-semibold text-slate-900 hover:text-sky-600 transition-colors"
            >
              {post.author.displayName}
            </Link>

            {post.author.verified && (
              <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" aria-label="Подтверждён" />
            )}

            {post.author.role !== 'spacer' && (
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded-full ${roleColors.bg} ${roleColors.text}`}
              >
                {post.author.role.toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
            <span>{timeAgo}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <PrivacyIcon className="w-3.5 h-3.5" />
              <span>{PRIVACY_LABELS[post.privacy]}</span>
            </div>
            {post.location && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[120px]">{post.location.name}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Дополнительные действия"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Nominated Badge */}
      {post.isNominated && post.nominatedTo && (
        <div className="mb-3">
          <Badge variant="info" size="sm">
            <Award className="w-3 h-3" />
            Номинирован в{' '}
            {post.nominatedTo === 'atlas'
              ? 'Atlas'
              : post.nominatedTo === 'blog'
                ? 'Blog'
                : 'Pulse'}
          </Badge>
        </div>
      )}

      {/* Content */}
      <div className="mb-4">
        <p className="text-slate-900 whitespace-pre-wrap leading-relaxed">{post.content}</p>

        {/* Media Grid */}
        {post.media && post.media.length > 0 && (
          <div
            className={`mt-3 grid gap-2 rounded-xl overflow-hidden ${
              post.media.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
            }`}
          >
            {post.media.slice(0, 4).map((media, index) => (
              <div
                key={media.id}
                className={`relative bg-slate-200 overflow-hidden ${
                  post.media!.length === 1 ? 'aspect-video' : 'aspect-square'
                } ${post.media!.length === 3 && index === 0 ? 'row-span-2 aspect-auto' : ''}`}
              >
                <Image
                  src={media.thumbnail || media.url}
                  alt="Медиа"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                {post.media!.length > 4 && index === 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">+{post.media!.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Poll */}
        {post.poll && (
          <div className="mt-3 bg-slate-50 rounded-xl p-4">
            <h4 className="font-semibold text-slate-900 mb-3">{post.poll.question}</h4>
            <div className="space-y-2">
              {post.poll.options.map((option) => {
                const percentage =
                  post.poll!.totalVotes > 0
                    ? Math.round((option.votes / post.poll!.totalVotes) * 100)
                    : 0;
                const isVoted = post.poll!.userVote === option.id;

                return (
                  <button
                    key={option.id}
                    className={`relative w-full text-left p-3 rounded-lg border-2 overflow-hidden transition-all ${
                      isVoted
                        ? 'border-sky-600 bg-sky-50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className={`absolute inset-y-0 left-0 ${
                        isVoted ? 'bg-sky-200/50' : 'bg-slate-100'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                    <span className="relative z-10 flex items-center justify-between text-sm font-medium text-slate-900">
                      <span className="flex items-center gap-2">
                        {isVoted && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
                        {option.text}
                      </span>
                      <span className="text-slate-600">{percentage}%</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-3">{post.poll.totalVotes} голосов</p>
          </div>
        )}

        {/* Attachments */}
        {post.attachments && (
          <div className="mt-3">
            <AttachmentCard attachments={post.attachments} />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map((tag) => (
              <Chip key={tag} size="sm">
                #{tag}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between py-2 border-y border-slate-100 text-sm text-slate-500">
        <span>{likesCount} лайков</span>
        <div className="flex items-center gap-3">
          <span>{post.commentsCount} комментариев</span>
          <span>{post.sharesCount} репостов</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around pt-2 -mx-2">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isLiked ? 'text-red-600' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
          <span className="text-sm font-medium">Нравится</span>
        </button>

        <button
          onClick={() => onComment?.(post.id)}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm font-medium">Комментировать</span>
        </button>

        <button
          onClick={() => onShare?.(post.id)}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">Поделиться</span>
        </button>

        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isSaved ? 'text-sky-600' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
          <span className="text-sm font-medium hidden sm:inline">Сохранить</span>
        </button>
      </div>
    </article>
  );
}

