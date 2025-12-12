import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide";
  
  const variants = {
    // Primary: Black bg, Gold text, minimal border
    primary: "bg-neutral-900 text-amber-500 border border-neutral-800 hover:bg-black hover:border-amber-500/50 shadow-lg",
    // Secondary: Gold bg, White text
    secondary: "bg-amber-600 text-white hover:bg-amber-700 shadow-md",
    // Outline: Black border, Black text
    outline: "border-2 border-neutral-900 text-neutral-900 bg-transparent hover:bg-neutral-900 hover:text-amber-500",
    // Danger: Deep Red
    danger: "bg-red-800 text-white hover:bg-red-900 focus:ring-red-800",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded",
    md: "px-6 py-3 text-sm rounded-md",
    lg: "px-8 py-4 text-base rounded-md",
    xl: "px-10 py-5 text-lg rounded-lg", 
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : children}
    </button>
  );
};