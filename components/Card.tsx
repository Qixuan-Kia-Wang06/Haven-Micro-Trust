import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  alert?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, icon, alert = false }) => {
  return (
    <div className={`bg-white rounded-none md:rounded-lg shadow-sm border ${alert ? 'border-red-800 ring-1 ring-red-100' : 'border-neutral-200'} p-6 md:p-8 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-4 mb-6 border-b border-neutral-100 pb-4">
          {icon && <div className={`${alert ? 'text-red-800' : 'text-amber-600'}`}>{icon}</div>}
          {title && <h3 className={`text-xl md:text-2xl font-serif font-semibold tracking-tight ${alert ? 'text-red-900' : 'text-neutral-900'}`}>{title}</h3>}
        </div>
      )}
      <div className="text-neutral-600 leading-relaxed font-light">
        {children}
      </div>
    </div>
  );
};