import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

type FeatureType = 'community' | 'teams' | 'rf' | 'referral' | 'rewards' | 'quests';

export interface FeatureCardProps {
  type: FeatureType;
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
  className?: string;
}

const featureStyles: Record<FeatureType, { bg: string; border: string; text: string }> = {
  community: {
    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
  },
  teams: {
    bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
  },
  rf: {
    bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    text: 'text-emerald-600',
  },
  referral: {
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
    border: 'border-amber-200',
    text: 'text-amber-600',
  },
  rewards: {
    bg: 'bg-gradient-to-br from-indigo-50 to-blue-50',
    border: 'border-indigo-200',
    text: 'text-indigo-600',
  },
  quests: {
    bg: 'bg-gradient-to-br from-rose-50 to-pink-50',
    border: 'border-rose-200',
    text: 'text-rose-600',
  },
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  type,
  icon: Icon,
  title,
  description,
  cta,
  onClick,
  className = '',
}) => {
  const styles = featureStyles[type];

  return (
    <div
      className={`${styles.bg} ${styles.border} border-2 rounded-2xl p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all ${className}`}
    >
      <div className="mb-4">
        <Icon className={`w-8 h-8 md:w-10 md:h-10 ${styles.text}`} />
      </div>
      <h3 className="font-bold text-slate-900 mb-2 text-base md:text-lg">{title}</h3>
      <p className="text-sm md:text-base text-slate-700 mb-4 leading-relaxed">{description}</p>
      <button
        onClick={onClick}
        className={`text-sm md:text-base font-semibold ${styles.text} hover:opacity-80 inline-flex items-center gap-1 group`}
      >
        {cta}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
