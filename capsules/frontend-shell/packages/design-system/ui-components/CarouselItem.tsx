import React from 'react';

export interface CarouselItemProps {
  image: string;
  title: string;
  subtitle: string;
  type?: string;
  onClick: () => void;
  className?: string;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  image,
  title,
  subtitle,
  type,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 w-48 md:w-64 bg-white rounded-xl border-2 border-slate-200 overflow-hidden hover:shadow-lg hover:border-sky-300 hover:-translate-y-1 transition-all text-left ${className}`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        {type && <div className="text-xs text-sky-600 font-medium mb-1">{type}</div>}
        <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>
    </button>
  );
};
