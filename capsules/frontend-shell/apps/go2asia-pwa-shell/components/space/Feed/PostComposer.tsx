'use client';

import { useState } from 'react';
import { Avatar } from '@go2asia/ui';
import {
  Image as ImageIcon,
  MapPin,
  Calendar,
  Award,
  BarChart3,
  Globe,
  Users,
  Lock,
  ChevronDown,
} from 'lucide-react';
import type { PostPrivacy, User } from '../types';
import { PRIVACY_LABELS } from '../types';

interface PostComposerProps {
  user: User;
  onSubmit?: (content: string, privacy: PostPrivacy) => void;
}

const PRIVACY_OPTIONS: { value: PostPrivacy; icon: typeof Globe; label: string }[] = [
  { value: 'public', icon: Globe, label: 'Все' },
  { value: 'friends', icon: Users, label: 'Друзья' },
  { value: 'private', icon: Lock, label: 'Только я' },
];

const QUICK_ACTIONS = [
  { icon: ImageIcon, label: 'Фото/Видео', color: 'text-emerald-600' },
  { icon: MapPin, label: 'Место', color: 'text-red-500' },
  { icon: Calendar, label: 'Событие', color: 'text-purple-600' },
  { icon: Award, label: 'Квест', color: 'text-amber-600' },
  { icon: BarChart3, label: 'Опрос', color: 'text-sky-600' },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function PostComposer({ user, onSubmit }: PostComposerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState<PostPrivacy>('public');
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit?.(content, privacy);
    setContent('');
    setIsExpanded(false);
  };

  const selectedPrivacy = PRIVACY_OPTIONS.find((p) => p.value === privacy)!;
  const PrivacyIcon = selectedPrivacy.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      {/* Compact View */}
      {!isExpanded ? (
        <div className="flex items-center gap-3">
          <Avatar initials={getInitials(user.displayName)} size="md" />
          <button
            onClick={() => setIsExpanded(true)}
            className="flex-1 text-left px-4 py-2.5 bg-slate-50 text-slate-500 rounded-full hover:bg-slate-100 transition-colors"
          >
            О чём думаете, {user.displayName.split(' ')[0]}?
          </button>
        </div>
      ) : (
        /* Expanded View */
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar initials={getInitials(user.displayName)} size="md" />
            <div>
              <p className="font-semibold text-slate-900">{user.displayName}</p>
              {/* Privacy Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
                  className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <PrivacyIcon className="w-3.5 h-3.5" />
                  <span>{PRIVACY_LABELS[privacy]}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {showPrivacyMenu && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10">
                    {PRIVACY_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            setPrivacy(option.value);
                            setShowPrivacyMenu(false);
                          }}
                          className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors ${
                            privacy === option.value ? 'text-sky-600 font-medium' : 'text-slate-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Поделитесь опытом, задайте вопрос или расскажите историю..."
            className="w-full min-h-[120px] p-3 text-slate-900 placeholder-slate-400 bg-slate-50 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 resize-none transition-all"
            autoFocus
          />

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg hover:bg-slate-50 transition-colors ${action.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{action.label}</span>
                </button>
              );
            })}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setIsExpanded(false);
                setContent('');
              }}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="px-6 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Опубликовать
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions (Compact) */}
      {!isExpanded && (
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
          {QUICK_ACTIONS.slice(0, 3).map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => setIsExpanded(true)}
                className={`flex items-center gap-2 text-sm hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors ${action.color}`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{action.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

