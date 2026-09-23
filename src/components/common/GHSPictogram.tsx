import React from 'react';
import { GHSHazardType } from '../../types';

interface GHSPictogramProps {
  type: GHSHazardType;
  size?: 'sm' | 'md' | 'lg';
  showDiamond?: boolean;
}

export const GHSPictogram: React.FC<GHSPictogramProps> = ({
  type,
  size = 'md',
  showDiamond = true
}) => {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10'
  };

  const renderIconContent = () => {
    switch (type) {
      case 'flammable':
        // Flame
        return (
          <path
            d="M12 2C12 2 13.5 5 12 7C10.5 9 8 9.5 8 13C8 16.5 10.5 19 12 19C13.5 19 16 16.5 16 13C16 10.5 14 8.5 14 8.5C14 8.5 15.5 10 15 12C14.5 14 13.5 14.5 13 16C12.5 14.5 13 13 13 12C13 9 11 7 12 2Z"
            fill="#1E293B"
          />
        );
      case 'corrosive':
        // Corrosive acid tubes pouring on surface and hand
        return (
          <g fill="#1E293B">
            <rect x="5" y="5" width="2" height="7" rx="0.5" transform="rotate(-35 5 5)" />
            <rect x="17" y="4" width="2" height="7" rx="0.5" transform="rotate(35 17 4)" />
            <circle cx="8" cy="12" r="0.8" />
            <circle cx="15" cy="11.5" r="0.8" />
            <rect x="4" y="15" width="7" height="3" rx="0.5" />
            <path d="M13 16 C13 15 15 14.5 17 15 L20 16 L20 18 L13 18 Z" />
          </g>
        );
      case 'acute_toxicity':
        // Skull & crossbones
        return (
          <g fill="#1E293B">
            <circle cx="12" cy="9" r="4.5" />
            <circle cx="10.5" cy="8.5" r="1.2" fill="#FFFFFF" />
            <circle cx="13.5" cy="8.5" r="1.2" fill="#FFFFFF" />
            <rect x="10.5" y="12.5" width="3" height="2" rx="0.5" />
            <path d="M6 17 L18 19 M18 17 L6 19" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 'irritant':
        // Exclamation mark
        return (
          <g fill="#1E293B">
            <rect x="10.5" y="6" width="3" height="7" rx="1.5" />
            <circle cx="12" cy="16" r="1.6" />
          </g>
        );
      case 'oxidizer':
        // Flame over circle
        return (
          <g fill="#1E293B">
            <circle cx="12" cy="14" r="4" stroke="#1E293B" strokeWidth="1.5" fill="none" />
            <path d="M12 4 C11 6 9 8 10 11 C11 11 13 11 14 11 C15 8 13 6 12 4 Z" />
          </g>
        );
      case 'aquatic_toxic':
        // Dead tree and fish
        return (
          <g fill="#1E293B">
            {/* Bare tree */}
            <path d="M8 17 L8 8 M8 11 L6 9 M8 13 L10 11 M8 15 L5 14" stroke="#1E293B" strokeWidth="1.4" strokeLinecap="round" />
            {/* Dead floating fish */}
            <path d="M13 14 C15 12 18 13 20 14 C18 15 15 16 13 14 Z" />
            <path d="M19 14 L21 12 M19 14 L21 16" stroke="#1E293B" strokeWidth="1.2" />
            {/* Water ripples */}
            <path d="M4 18 Q12 19 20 18" stroke="#1E293B" strokeWidth="1.2" fill="none" />
          </g>
        );
      default:
        return null;
    }
  };

  if (!showDiamond) {
    return (
      <svg viewBox="0 0 24 24" className={`${sizeMap[size]}`} fill="none">
        {renderIconContent()}
      </svg>
    );
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} shrink-0`}>
      <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
        {/* Red diamond square rotated 45 deg */}
        <polygon
          points="16,2 30,16 16,30 2,16"
          stroke="#DC2626"
          strokeWidth="3"
          strokeLinejoin="miter"
          fill="#FFFFFF"
        />
        {/* Centered symbol inside */}
        <g transform="translate(4, 4) scale(1)">
          {renderIconContent()}
        </g>
      </svg>
    </div>
  );
};
