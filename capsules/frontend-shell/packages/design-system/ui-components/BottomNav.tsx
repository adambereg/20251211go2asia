import React from 'react';
import { Home, Globe, Calendar, BookOpen, User } from 'lucide-react';

type ModuleType = 'home' | 'atlas' | 'pulse' | 'blog' | 'space';

export interface BottomNavProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeModule,
  onModuleChange,
  className = '',
}) => {
  const navItems = [
    { id: 'home' as ModuleType, icon: Home, label: 'Главная' },
    { id: 'atlas' as ModuleType, icon: Globe, label: 'Atlas' },
    { id: 'pulse' as ModuleType, icon: Calendar, label: 'Pulse' },
    { id: 'blog' as ModuleType, icon: BookOpen, label: 'Blog' },
    { id: 'space' as ModuleType, icon: User, label: 'Space' },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 md:hidden ${className}`}
      aria-label="Навигация по модулям"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`
                flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? 'text-sky-600'
                    : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                }
              `}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} className={isActive ? 'stroke-[2.5]' : ''} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
