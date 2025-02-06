import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, size = 'md', to }) => {
  const sizeClasses = {
    sm: 'px-4 py-1 text-xs',
    md: 'px-6 py-1.5 text-sm',
    lg: 'px-8 py-2 text-base',
  };

  return (
    <Link className={`flex items-center justify-center border font-medium rounded-full hover:bg-[#175F3F] transition-all duration-200 ease-in-out text-white bg-[#1D4634] ${sizeClasses[size]}`}
      href={`${to}`}>
        {children}
    </Link>
  )
}