import React from 'react';
import { Globe, Search, Grid3x3 } from 'lucide-react';
import { Avatar } from './Avatar';

export interface TopAppBarProps {
  onMenuClick: () => void;
  onHomeClick: () => void;
  onSearchClick?: () => void;
  user?: {
    initials: string;
    name: string;
    email: string;
  };
  onAuthClick?: () => void;
  onProfileClick?: () => void;
  className?: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onMenuClick,
  onHomeClick,
  onSearchClick,
  user,
  onAuthClick,
  onProfileClick,
  className = '',
}) => {
  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <button
            onClick={onHomeClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Globe className="w-8 h-8 text-sky-600" />
            <span className="text-xl font-bold text-slate-900">Go2Asia</span>
          </button>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Главная навигация">
            <button className="text-slate-600 hover:text-sky-600 transition-colors font-medium">
              Atlas
            </button>
            <button className="text-slate-600 hover:text-sky-600 transition-colors font-medium">
              Pulse
            </button>
            <button className="text-slate-600 hover:text-sky-600 transition-colors font-medium">
              Blog
            </button>
            <button className="text-slate-600 hover:text-sky-600 transition-colors font-medium">
              Space
            </button>
          </nav>

          {/* Действия */}
          <div className="flex items-center gap-3">
            {onSearchClick && (
              <button
                onClick={onSearchClick}
                className="p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-50 rounded-lg transition-all"
                aria-label="Поиск"
              >
                <Search size={20} />
              </button>
            )}
            <button
              onClick={onMenuClick}
              className="p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-50 rounded-lg transition-all"
              aria-label="Все модули"
            >
              <Grid3x3 size={20} />
            </button>
            {user ? (
              <button onClick={onProfileClick}>
                <Avatar size="sm" initials={user.initials} />
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors text-sm"
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
