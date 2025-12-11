import React from 'react';
import { LucideIcon } from 'lucide-react';
import { GradientCard } from './GradientCard';
import { Badge } from './Badge';

type ModuleType = 'atlas' | 'pulse' | 'blog' | 'guru' | 'space' | 'rielt' | 'quest' | 'rf' | 'connect' | 'partner';

export interface ModuleTileProps {
  module: ModuleType;
  icon: LucideIcon;
  title: string;
  description: string;
  locked?: boolean;
  isPro?: boolean;
  onClick: () => void;
  className?: string;
}

export const ModuleTile: React.FC<ModuleTileProps> = ({
  module,
  icon: Icon,
  title,
  description,
  locked = false,
  isPro = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-left w-full h-full flex flex-col relative ${className}`}
    >
      <GradientCard module={module} className="p-4 md:p-6">
        {locked && <Badge type="lock" />}
        {isPro && !locked && <Badge type="pro" />}

        <div className="mb-2 md:mb-3">
          <Icon size={28} className="w-7 h-7 md:w-8 md:h-8" />
        </div>
        <h3 className="font-bold text-base md:text-lg mb-1">{title}</h3>
        <p className="text-xs md:text-sm opacity-90">{description}</p>
      </GradientCard>
    </button>
  );
};
