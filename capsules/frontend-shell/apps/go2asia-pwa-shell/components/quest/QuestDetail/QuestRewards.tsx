'use client';

/**
 * Quest Asia - Quest Rewards
 * Награды квеста
 */

import { Trophy, Zap } from 'lucide-react';
import type { Quest } from '../types';

interface QuestRewardsProps {
  quest: Quest;
}

export function QuestRewards({ quest }: QuestRewardsProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Награды</h3>
      
      <div className="space-y-4">
        {/* Points */}
        <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <Trophy className="w-6 h-6 text-amber-600" />
          <div>
            <div className="text-sm text-slate-600">Очки</div>
            <div className="text-2xl font-bold text-slate-900">{quest.rewards.points}</div>
          </div>
        </div>

        {/* NFT Badges */}
        {quest.rewards.nftBadges.length > 0 && (
          <div>
            <div className="text-sm text-slate-600 mb-3">NFT-бейджи</div>
            <div className="space-y-2">
              {quest.rewards.nftBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
                >
                  <Zap className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">{badge.name}</div>
                    <div className="text-xs text-slate-600">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Условия */}
        {quest.rewards.conditions && (
          <div className="pt-4 border-t border-slate-200">
            <div className="text-sm text-slate-600 mb-2">Условия получения</div>
            <ul className="space-y-1 text-sm text-slate-700">
              {quest.rewards.conditions.minCheckpoints && (
                <li>• Минимум {quest.rewards.conditions.minCheckpoints} чек-поинтов</li>
              )}
              {quest.rewards.conditions.seasonDeadline && (
                <li>
                  • До {quest.rewards.conditions.seasonDeadline.toLocaleDateString('ru-RU')}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

