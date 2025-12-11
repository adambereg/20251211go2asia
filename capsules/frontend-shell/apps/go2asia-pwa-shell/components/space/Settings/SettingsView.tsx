'use client';

import { useState } from 'react';
import { Card, Button, Chip, Badge } from '@go2asia/ui';
import { Globe, Bell, Eye, Languages, Smartphone, Shield } from 'lucide-react';

export function SettingsView() {
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'friends' | 'private'>('public');
  const [showNearby, setShowNearby] = useState(true);
  const [language, setLanguage] = useState<'ru' | 'en' | 'th'>('ru');

  return (
    <div className="space-y-6">
      {/* Приватность */}
      <Card className="border-2 border-slate-200 p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Приватность</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Видимость профиля
            </label>
            <div className="flex gap-2">
              {(['public', 'friends', 'private'] as const).map((value) => (
                <Chip
                  key={value}
                  selected={profileVisibility === value}
                  onClick={() => setProfileVisibility(value)}
                  size="md"
                >
                  {value === 'public' ? 'Публичный' : value === 'friends' ? 'Друзья' : 'Приватный'}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-700">Показывать "рядом"</div>
              <div className="text-xs text-slate-500">Для PRO пользователей</div>
            </div>
            <Button
              variant={showNearby ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setShowNearby(!showNearby)}
            >
              {showNearby ? 'Включено' : 'Выключено'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Уведомления */}
      <Card className="border-2 border-slate-200 p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Уведомления</h2>
        </div>
        <div className="space-y-3">
          {[
            { id: 'likes', label: 'Лайки' },
            { id: 'comments', label: 'Комментарии' },
            { id: 'follows', label: 'Подписки' },
            { id: 'mentions', label: 'Упоминания' },
            { id: 'points', label: 'Points' },
            { id: 'quests', label: 'Квесты' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-sm text-slate-700">{item.label}</span>
              <Button variant="primary" size="sm">
                Включено
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Язык */}
      <Card className="border-2 border-slate-200 p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Languages className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Язык</h2>
        </div>
        <div className="flex gap-2">
          {(['ru', 'en', 'th'] as const).map((lang) => (
            <Chip
              key={lang}
              selected={language === lang}
              onClick={() => setLanguage(lang)}
              size="md"
            >
              {lang === 'ru' ? 'Русский' : lang === 'en' ? 'English' : 'ไทย'}
            </Chip>
          ))}
        </div>
      </Card>

      {/* Устройства */}
      <Card className="border-2 border-slate-200 p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Smartphone className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Активные устройства</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <div className="text-sm font-medium text-slate-900">Windows PC</div>
              <div className="text-xs text-slate-500">Текущее устройство • Последняя активность: сейчас</div>
            </div>
            <Badge variant="verified" size="sm">Активно</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <div className="text-sm font-medium text-slate-900">iPhone 14</div>
              <div className="text-xs text-slate-500">Последняя активность: 2 часа назад</div>
            </div>
            <Button variant="ghost" size="sm">Выйти</Button>
          </div>
        </div>
      </Card>

      {/* Верификация */}
      <Card className="border-2 border-slate-200 p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Верификация (KYC)</h2>
        </div>
        <div className="space-y-3">
          <div className="text-sm text-slate-600">
            Верификация необходима для будущих Web3 функций и расширенных возможностей PRO
          </div>
          <Button variant="primary" icon={Shield} iconPosition="left">
            Начать верификацию
          </Button>
        </div>
      </Card>
    </div>
  );
}
