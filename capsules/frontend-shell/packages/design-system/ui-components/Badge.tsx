import React from 'react';
import { Lock, Crown, CheckCircle } from 'lucide-react';

export interface BadgeProps {
  type: 'lock' | 'pro' | 'rf' | 'rf-full';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className = '' }) => {
  if (type === 'lock') {
    return (
      <div className={`absolute top-2 right-2 bg-white/20 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-medium ${className}`}>
        <Lock size={12} />
        <span className="hidden sm:inline">После входа</span>
      </div>
    );
  }

  if (type === 'pro') {
    return (
      <div className={`absolute top-2 right-2 bg-purple-500 px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold ${className}`}>
        <Crown size={12} />
        PRO
      </div>
    );
  }

  if (type === 'rf') {
    return (
      <span className={`px-1.5 py-0.5 bg-green-600 text-white rounded text-xs font-bold shadow-lg ${className}`}>
        RF
      </span>
    );
  }

  if (type === 'rf-full') {
    return (
      <div className={`px-3 py-1.5 bg-emerald-500 text-white rounded-lg font-semibold text-sm flex items-center gap-1.5 ${className}`}>
        <CheckCircle size={16} />
        Russian Friendly
      </div>
    );
  }

  return null;
};
