'use client';

import Link from 'next/link';
import { MapPin, Gem, Headphones, Users, FileText, ArrowRight, Gift, Link2 } from 'lucide-react';
import { Card, CardContent } from '@go2asia/ui';

export interface PersonalWelcomeProps {
  userName?: string;
  location?: string;
  level?: number;
  pointsToNextLevel?: number;
  balance?: number;
  nfts?: number;
  teamMembers?: number;
  activeQuests?: number;
}

export function PersonalWelcome({
  userName = 'Анна Петрова',
  location = 'Пхукет, Таиланд',
  level = 12,
  pointsToNextLevel = 335,
  balance = 3450,
  nfts = 5,
  teamMembers = 7,
  activeQuests = 2,
}: PersonalWelcomeProps) {
  return (
    <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <span className="text-2xl sm:text-3xl font-bold">{userName[0]}</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">{userName}</h2>
            <div className="flex items-center gap-2 text-xs md:text-sm text-orange-50 mb-4">
              <MapPin size={16} />
              <span>Сейчас: {location}</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Gem size={16} />
                  <span className="text-lg sm:text-xl font-bold">{balance.toLocaleString()}</span>
                </div>
                <p className="text-xs text-orange-50">Points на балансе</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Headphones size={16} />
                  <span className="text-lg sm:text-xl font-bold">{nfts}</span>
                </div>
                <p className="text-xs text-orange-50">накопленных NFT</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Users size={16} />
                  <span className="text-lg sm:text-xl font-bold">{teamMembers}</span>
                </div>
                <p className="text-xs text-orange-50">человек в команде</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                <div className="flex items-center gap-1 mb-1">
                  <FileText size={16} />
                  <span className="text-lg sm:text-xl font-bold">{activeQuests}</span>
                </div>
                <p className="text-xs text-orange-50">активных квеста</p>
              </div>
            </div>

            {/* Level Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Level {level}</span>
                <span className="text-xs text-orange-50">
                  +{pointsToNextLevel} Points до следующего уровня
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all"
                  style={{ width: '75%' }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Link
                href="/quest"
                className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Продолжить квест
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/connect"
                className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Новые ваучеры
                <Gift size={14} />
              </Link>
              <Link
                href="/connect/referrals"
                className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Реферальная ссылка
                <Link2 size={14} />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

