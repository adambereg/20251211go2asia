import React from 'react';
import { ModuleHero, ModuleHeroProps } from './ModuleHero';

export interface ModuleLayoutProps {
  hero: ModuleHeroProps;
  children: React.ReactNode;
  className?: string;
}

export const ModuleLayout: React.FC<ModuleLayoutProps> = ({
  hero,
  children,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-slate-50 ${className}`}>
      <ModuleHero {...hero} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};


























