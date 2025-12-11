'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Globe, MapPin, Trophy, Building, Handshake, Link2, Briefcase, Settings, HelpCircle, Info, BookOpen, Users, Calendar } from 'lucide-react';
import { cn } from '@go2asia/ui';
import { useAppShell } from './AppShellProvider';

interface SideDrawerProps {}

// Модули для бокового меню (согласно скриншотам)
const modules = [
  {
    href: '/atlas',
    icon: Globe,
    title: 'Atlas Asia',
    description: 'Энциклопедия мест',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
  },
  {
    href: '/pulse',
    icon: Calendar,
    title: 'Pulse Asia',
    description: 'События и афиша',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
  },
  {
    href: '/blog',
    icon: BookOpen,
    title: 'Blog Asia',
    description: 'Статьи и гайды',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
  },
  {
    href: '/guru',
    icon: MapPin,
    title: 'Guru Asia',
    description: 'Рекомендации от гидов',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
  },
  {
    href: '/space',
    icon: Users,
    title: 'Space Asia',
    description: 'Социальная сеть',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
  },
  {
    href: '/quest',
    icon: Trophy,
    title: 'Quest Asia',
    description: 'Квесты и челленджи',
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
  },
  {
    href: '/rielt',
    icon: Building,
    title: 'Rielt.Market',
    description: 'Поиск жилья',
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
  },
  {
    href: '/rf',
    icon: Handshake,
    title: 'Russian Friendly',
    description: 'Партнёры и скидки',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
  },
  {
    href: '/connect',
    icon: Link2,
    title: 'Connect Asia',
    description: 'Баланс и награды',
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-600',
  },
];

const quickLinks = [
  { href: '/settings', icon: Settings, label: 'Настройки' },
  { href: '/help', icon: HelpCircle, label: 'Помощь' },
  { href: '/about', icon: Info, label: 'О проекте' },
];

export function SideDrawer({}: SideDrawerProps) {
  const pathname = usePathname();
  const { isSideDrawerOpen: isOpen, closeSideDrawer: onClose } = useAppShell();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer - открывается справа */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-xl z-50',
          'transform transition-transform duration-300 ease-in-out',
          'flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-sky-600" />
              <span className="text-lg font-bold text-slate-900">Все модули</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              aria-label="Закрыть меню"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 space-y-4">
              {/* Модули */}
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = pathname === module.href || pathname.startsWith(module.href + '/');

                return (
                  <Link
                    key={module.href}
                    href={module.href}
                    onClick={onClose}
                    className={cn(
                      'block rounded-xl border-2 p-4 transition-all',
                      'hover:shadow-md hover:-translate-y-0.5',
                      module.bgColor,
                      module.borderColor,
                      isActive && 'ring-2 ring-sky-500 ring-offset-2'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn('p-2 rounded-lg', module.bgColor)}>
                        <Icon className={cn('w-6 h-6', module.textColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={cn('font-bold text-base mb-1', module.textColor)}>
                          {module.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {module.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* Партнёрская панель */}
              <div className="pt-4 border-t border-slate-200">
                <Link
                  href="/partner"
                  onClick={onClose}
                  className="block rounded-xl border-2 border-slate-200 bg-slate-50 p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-slate-100">
                      <Briefcase className="w-6 h-6 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-slate-900 mb-1">
                        Партнёрская панель
                      </h3>
                      <p className="text-sm text-slate-600">
                        Управление заведением
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Быстрые ссылки */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Быстрые ссылки</h4>
                <ul className="space-y-2">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Icon size={18} />
                          <span className="text-sm">{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-4 md:p-6 flex-shrink-0">
            <p className="text-xs text-slate-500 text-center">
              Go2Asia v1.0. © 2024
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

