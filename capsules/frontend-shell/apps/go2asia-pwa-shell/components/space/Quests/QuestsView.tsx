'use client';

import { useState } from 'react';
import { Card, Chip, Button, Badge } from '@go2asia/ui';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Clock, CheckCircle2, Star, ArrowRight } from 'lucide-react';
import type { Quest } from '../types';
import { mockQuestsExtended } from '../mockData';

type QuestsTab = 'available' | 'active' | 'completed' | 'rewards' | 'stats';

const TABS: { id: QuestsTab; label: string }[] = [
  { id: 'available', label: 'Доступные квесты' },
  { id: 'active', label: 'Мои активные' },
  { id: 'completed', label: 'Завершённые' },
  { id: 'rewards', label: 'История наград' },
  { id: 'stats', label: 'Статистика прогресса' },
];

const DIFFICULTY_LABELS = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
};

const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

export function QuestsView() {
  const [activeTab, setActiveTab] = useState<QuestsTab>('available');

  const getFilteredQuests = (): Quest[] => {
    switch (activeTab) {
      case 'active':
        return mockQuestsExtended.filter((q) => q.status === 'active');
      case 'completed':
        return mockQuestsExtended.filter((q) => q.status === 'completed');
      default:
        return mockQuestsExtended.filter((q) => q.status === 'available');
    }
  };

  const quests = getFilteredQuests();

  return (
    <div className="space-y-6">
      {/* Вкладки */}
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

      {/* Список квестов */}
      {activeTab === 'stats' ? (
        <Card className="border-2 border-slate-200 p-4 md:p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Статистика прогресса
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">12</div>
              <div className="text-sm text-slate-600">Завершено квестов</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-sky-600">4,200</div>
              <div className="text-sm text-slate-600">Points заработано</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-slate-600">Активных квестов</div>
            </div>
          </div>
        </Card>
      ) : activeTab === 'rewards' ? (
        <Card className="border-2 border-slate-200 p-4 md:p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            История наград
          </h2>
          <div className="space-y-3">
            {mockQuestsExtended
              .filter((q) => q.status === 'completed')
              .map((quest) => (
                <div
                  key={quest.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <div>
                      <div className="font-medium text-slate-900">
                        {quest.title}
                      </div>
                      <div className="text-sm text-slate-500">
                        {quest.completedAt &&
                          new Date(quest.completedAt).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-sky-600">
                    +{quest.points} Points
                  </div>
                </div>
              ))}
          </div>
        </Card>
      ) : quests.length === 0 ? (
        <Card className="border-2 border-slate-200 p-8">
          <div className="text-center text-slate-500">
            Нет квестов в этой категории
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quests.map((quest) => (
            <Card
              key={quest.id}
              className="border-2 border-slate-200 p-4 md:p-6 hover:border-sky-300 transition-colors"
            >
              {quest.image && (
                <div className="relative h-32 w-full mb-4 rounded-lg overflow-hidden bg-slate-200">
                  <Image
                    src={quest.image}
                    alt={quest.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{quest.title}</h3>
                  <Badge
                    className={DIFFICULTY_COLORS[quest.difficulty]}
                    size="sm"
                  >
                    {DIFFICULTY_LABELS[quest.difficulty]}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{quest.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sky-600">
                    <Star className="h-4 w-4" />
                    <span className="font-medium">{quest.points} Points</span>
                  </div>
                  {quest.status === 'active' && quest.progress !== undefined && (
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-500 rounded-full"
                          style={{ width: `${quest.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">
                        {quest.progress}%
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  variant="primary"
                  className="w-full"
                  icon={quest.status === 'active' ? Clock : Trophy}
                  iconPosition="left"
                >
                  {quest.status === 'active'
                    ? 'Продолжить'
                    : quest.status === 'completed'
                      ? 'Просмотреть'
                      : 'Начать квест'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
