import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  dark?: boolean;
  showText?: boolean;
}

export const HypecraftLogo: React.FC<LogoProps> = ({ className = '', size = 'md', dark = false, showText = true }) => {
  const logoHeights = {
    sm: 'h-8',
    md: 'h-10 md:h-12',
    lg: 'h-12 md:h-14',
    xl: 'h-16 md:h-20',
  };

  const textSizes = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-xl tracking-[0.22em]',
    lg: 'text-2xl md:text-3xl tracking-[0.25em]',
    xl: 'text-3xl md:text-5xl tracking-[0.28em]',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className={`relative overflow-hidden rounded-xs transition-transform duration-300 group-hover:scale-105 ${dark ? 'bg-white p-1 shadow-md border border-[#D9A21B]/40' : ''}`}>
        <img
          src="/logo.png"
          alt="Hypecraft Official Logo"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.endsWith('/logo.png')) {
              target.src = '/logo.jpg';
            } else if (target.src.endsWith('/logo.jpg')) {
              target.src = '/images/hypecraft_official_logo_1786276054478.jpg';
            }
          }}
          className={`${logoHeights[size]} w-auto object-contain block`}
        />
      </div>
      
      {showText && (
        <div className={`font-serif font-bold uppercase ${textSizes[size]}`}>
          <span className={dark ? 'text-white' : 'text-[#071936]'}>
            HYPE
          </span>
          <span className="text-[#D9A21B] ml-1">
            CRAFT
          </span>
        </div>
      )}
    </div>
  );
};

