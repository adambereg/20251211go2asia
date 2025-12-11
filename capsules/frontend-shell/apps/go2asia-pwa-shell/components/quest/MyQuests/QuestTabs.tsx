'use client';

/**
 * Quest Asia - Quest Tabs
 * Вкладки для страницы "Мои квесты"
 */

import { BookOpen, Trophy, FileEdit } from 'lucide-react';

type TabType = 'active' | 'completed' | 'drafts';

interface QuestTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  activeCount: number;
  completedCount: number;
  draftsCount: number;
}

export function QuestTabs({
  activeTab,
  onTabChange,
  activeCount,
  completedCount,
  draftsCount,
}: QuestTabsProps) {
  const tabs = [
    {
      id: 'active' as TabType,
      label: 'Активные',
      icon: BookOpen,
      count: activeCount,
    },
    {
      id: 'completed' as TabType,
      label: 'Завершённые',
      icon: Trophy,
      count: completedCount,
    },
    {
      id: 'drafts' as TabType,
      label: 'Черновики',
      icon: FileEdit,
      count: draftsCount,
    },
  ];

  return (
    <div className="border-b border-slate-200">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  isActive
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`
                    ml-2 py-0.5 px-2 rounded-full text-xs font-semibold
                    ${
                      isActive
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-slate-100 text-slate-600'
                    }
                  `}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

