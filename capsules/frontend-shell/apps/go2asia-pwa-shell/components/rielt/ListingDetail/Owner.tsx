'use client';

/**
 * Rielt.Market Asia - Owner
 * Владелец/Агент (профиль, чат)
 */

import Image from 'next/image';
import { MessageCircle, Star, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Listing } from '../types';

interface OwnerProps {
  listing: Listing;
}

export function Owner({ listing }: OwnerProps) {
  const owner = listing.owner;

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Владелец</h2>
      
      <div className="flex items-start gap-4">
        {/* Аватар */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
          {owner.avatar ? (
            <Image
              src={owner.avatar}
              alt={owner.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-400">
              {owner.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Информация */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-900">{owner.name}</h3>
            {owner.isRFPartner && (
              <span className="px-2 py-0.5 bg-emerald-500 text-white rounded text-xs font-bold">
                RF
              </span>
            )}
            {owner.isPRO && (
              <span className="px-2 py-0.5 bg-purple-500 text-white rounded text-xs font-bold">
                PRO
              </span>
            )}
          </div>

          {/* Рейтинг */}
          {owner.rating && (
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-slate-700">
                {owner.rating.toFixed(1)}
              </span>
            </div>
          )}

          {/* Время ответа */}
          {owner.responseTime && (
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
              <Clock className="w-4 h-4" />
              <span>{owner.responseTime}</span>
            </div>
          )}

          {/* Дата регистрации */}
          {owner.joinedAt && (
            <div className="text-sm text-slate-500 mb-4">
              На платформе с {new Date(owner.joinedAt).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
              })}
            </div>
          )}

          {/* Кнопка "Написать" */}
          <Link
            href={`/space/users/${owner.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Написать владельцу
          </Link>
        </div>
      </div>
    </div>
  );
}

