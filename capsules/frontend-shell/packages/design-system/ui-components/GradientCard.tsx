import React from 'react';

type ModuleType = 'atlas' | 'pulse' | 'blog' | 'guru' | 'space' | 'rielt' | 'quest' | 'rf' | 'connect' | 'partner';

export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  module: ModuleType;
  children: React.ReactNode;
  hover?: boolean;
}

const moduleGradients: Record<ModuleType, string> = {
  atlas: 'from-sky-500 to-sky-600',
  pulse: 'from-sky-500 to-sky-600',
  blog: 'from-sky-500 to-sky-600',
  guru: 'from-sky-500 to-sky-600',
  space: 'from-sky-500 to-sky-600',
  rielt: 'from-emerald-500 to-emerald-600',
  quest: 'from-purple-500 to-purple-600',
  rf: 'from-blue-500 to-blue-600',
  connect: 'from-amber-500 to-amber-600',
  partner: 'from-orange-500 to-orange-600',
};

export const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ module, className = '', hover = true, children, ...props }, ref) => {
    const gradientClass = moduleGradients[module];
    const baseStyles = `bg-gradient-to-br ${gradientClass} text-white rounded-xl p-6 transition-all duration-200`;
    const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
    const combinedClassName = `${baseStyles} ${hoverStyles} ${className}`;

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

GradientCard.displayName = 'GradientCard';
