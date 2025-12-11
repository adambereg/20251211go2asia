import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ModuleHeroProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}

export const ModuleHero: React.FC<ModuleHeroProps> = ({
  icon: Icon,
  title,
  description,
  gradientFrom = 'from-sky-500',
  gradientTo = 'to-sky-600',
  className = '',
}) => {
  return (
    <section className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          <h1 className="text-h1 md:text-4xl lg:text-5xl font-bold text-white">
            {title}
          </h1>
        </div>
        <p className="text-body text-white/90">
          {description}
        </p>
      </div>
    </section>
  );
};


























