import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'right',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-sky-600 hover:bg-sky-700 text-white',
      secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
      ghost: 'bg-white/10 hover:bg-white/20 backdrop-blur text-white',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    };

    const iconSizes = {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {Icon && iconPosition === 'left' && <Icon size={iconSizes[size]} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon size={iconSizes[size]} />}
      </button>
    );
  }
);

Button.displayName = 'Button';
