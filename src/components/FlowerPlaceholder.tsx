import React from 'react';
import { Product } from '../types';

interface FlowerPlaceholderProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FlowerPlaceholder: React.FC<FlowerPlaceholderProps> = ({
  product,
  className = '',
  size = 'md'
}) => {
  // If custom real photo URL is set, render it with fallback
  if (product.customImageUrl) {
    return (
      <div className={`relative overflow-hidden bg-[#FFF9F5] flex items-center justify-center ${className}`}>
        <img
          src={product.customImageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            // fallback to placeholder illustration if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Botanical vector representations with fuzzy-wire aesthetic
  const renderFlowerArt = () => {
    switch (product.flowerType) {
      case 'Tulip':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="tulipStem" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#87A96B" />
                <stop offset="100%" stopColor="#556B2F" />
              </linearGradient>
              <linearGradient id="tulipPetal1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F8C8DC" />
                <stop offset="100%" stopColor="#D88C9A" />
              </linearGradient>
              <linearGradient id="tulipPetal2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FADADD" />
                <stop offset="100%" stopColor="#E5989B" />
              </linearGradient>
            </defs>
            {/* Stem */}
            <path d="M100 110 Q98 140 102 185" stroke="url(#tulipStem)" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 0.5" />
            {/* Leaves with fuzzy wire loops */}
            <path d="M100 150 Q130 140 135 115 Q125 155 102 165" fill="#A3C185" opacity="0.85" />
            <path d="M99 155 Q70 145 65 125 Q75 160 98 170" fill="#93B874" opacity="0.85" />
            {/* Back petal */}
            <path d="M100 45 C85 55 80 85 100 115 C120 85 115 55 100 45 Z" fill="#D88C9A" opacity="0.6" />
            {/* Left petal */}
            <path d="M85 55 C65 70 70 100 95 118 C85 100 78 80 85 55 Z" fill="url(#tulipPetal1)" stroke="#D88C9A" strokeWidth="2" strokeDasharray="3 2" />
            {/* Right petal */}
            <path d="M115 55 C135 70 130 100 105 118 C115 100 122 80 115 55 Z" fill="url(#tulipPetal1)" stroke="#D88C9A" strokeWidth="2" strokeDasharray="3 2" />
            {/* Center petal */}
            <path d="M100 50 C86 65 88 98 100 120 C112 98 114 65 100 50 Z" fill="url(#tulipPetal2)" stroke="#C97B89" strokeWidth="2.5" />
            {/* Fuzzy wire texture loops indicator */}
            <circle cx="100" cy="85" r="4" fill="#FFF9F5" opacity="0.7" />
          </svg>
        );

      case 'Lily':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lilyPetal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF5F7" />
                <stop offset="100%" stopColor="#F8C8DC" />
              </linearGradient>
            </defs>
            <path d="M100 120 Q102 155 100 185" stroke="#7E9F65" strokeWidth="6" strokeLinecap="round" />
            <path d="M100 150 Q135 150 145 130 Q125 165 102 165" fill="#8FAE72" opacity="0.8" />
            {/* 6 curved graceful lily petals */}
            <path d="M100 95 Q80 40 100 25 Q120 40 100 95 Z" fill="url(#lilyPetal)" stroke="#D88C9A" strokeWidth="2" />
            <path d="M100 95 Q50 65 40 85 Q70 95 100 95 Z" fill="url(#lilyPetal)" stroke="#D88C9A" strokeWidth="2" />
            <path d="M100 95 Q150 65 160 85 Q130 95 100 95 Z" fill="url(#lilyPetal)" stroke="#D88C9A" strokeWidth="2" />
            <path d="M100 95 Q60 125 50 140 Q85 125 100 95 Z" fill="url(#lilyPetal)" stroke="#D88C9A" strokeWidth="2" />
            <path d="M100 95 Q140 125 150 140 Q115 125 100 95 Z" fill="url(#lilyPetal)" stroke="#D88C9A" strokeWidth="2" />
            {/* Stamens */}
            <path d="M100 95 Q90 75 85 70" stroke="#B87D4B" strokeWidth="2" strokeLinecap="round" />
            <circle cx="85" cy="70" r="3" fill="#D97706" />
            <path d="M100 95 Q100 70 100 65" stroke="#B87D4B" strokeWidth="2" strokeLinecap="round" />
            <circle cx="100" cy="65" r="3" fill="#D97706" />
            <path d="M100 95 Q110 75 115 70" stroke="#B87D4B" strokeWidth="2" strokeLinecap="round" />
            <circle cx="115" cy="70" r="3" fill="#D97706" />
          </svg>
        );

      case 'Sunflower':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 120 Q100 155 100 185" stroke="#65884B" strokeWidth="6" strokeLinecap="round" />
            <path d="M100 145 Q65 135 60 115 Q75 150 98 155" fill="#7E9F65" />
            <path d="M100 155 Q135 145 140 125 Q125 160 102 165" fill="#7E9F65" />
            {/* Petals ring */}
            <g transform="translate(100, 90)">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <path
                  key={deg}
                  d="M0 0 Q-10 -40 0 -55 Q10 -40 0 0 Z"
                  fill="#FBBF24"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  transform={`rotate(${deg})`}
                />
              ))}
              {/* Fuzzy center seed disc */}
              <circle cx="0" cy="0" r="26" fill="#78350F" stroke="#92400E" strokeWidth="3" />
              <circle cx="0" cy="0" r="21" fill="#451A03" stroke="#B45309" strokeDasharray="3 3" strokeWidth="2" />
              <circle cx="0" cy="0" r="10" fill="#292524" />
            </g>
          </svg>
        );

      case 'Hibiscus':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 120 Q105 155 100 185" stroke="#5E8344" strokeWidth="6" strokeLinecap="round" />
            <path d="M100 145 Q65 140 60 120 Q75 155 98 155" fill="#739755" />
            {/* 5 flared petals */}
            <g transform="translate(100, 95)">
              {[0, 72, 144, 216, 288].map((deg) => (
                <path
                  key={deg}
                  d="M0 0 Q-24 -35 -15 -52 Q0 -58 15 -52 Q24 -35 0 0 Z"
                  fill="#F472B6"
                  stroke="#E11D48"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  transform={`rotate(${deg})`}
                  opacity="0.95"
                />
              ))}
              {/* Center core */}
              <circle cx="0" cy="0" r="14" fill="#9F1239" />
              {/* Staminal column projecting out */}
              <path d="M0 0 Q8 -25 15 -42" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
              <circle cx="15" cy="-42" r="4" fill="#EAB308" />
              <circle cx="12" cy="-35" r="2.5" fill="#FEF08A" />
              <circle cx="17" cy="-33" r="2.5" fill="#FEF08A" />
              <circle cx="10" cy="-28" r="2.5" fill="#FEF08A" />
            </g>
          </svg>
        );

      case 'Daisy':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 115 Q98 150 100 185" stroke="#7A9A5B" strokeWidth="5" strokeLinecap="round" />
            <path d="M100 145 Q130 140 135 125 Q125 155 102 155" fill="#8EB06D" />
            <g transform="translate(100, 90)">
              {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg) => (
                <path
                  key={deg}
                  d="M0 0 Q-5 -30 0 -45 Q5 -30 0 0 Z"
                  fill="#FFFFFF"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  strokeDasharray="3 1.5"
                  transform={`rotate(${deg})`}
                />
              ))}
              {/* Fuzzy yellow button center */}
              <circle cx="0" cy="0" r="16" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" strokeDasharray="2 2" />
              <circle cx="0" cy="0" r="8" fill="#F59E0B" opacity="0.8" />
            </g>
          </svg>
        );

      case 'Mixed':
      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bouquet wrapper cone */}
            <path d="M60 130 L100 190 L140 130 Z" fill="#FCE7F3" stroke="#D88C9A" strokeWidth="2" />
            <path d="M50 120 Q100 140 150 120 L135 145 Q100 155 65 145 Z" fill="#F8C8DC" opacity="0.9" />
            {/* Ribbon bow */}
            <path d="M90 145 C80 140 80 155 95 152 M110 145 C120 140 120 155 105 152" stroke="#D88C9A" strokeWidth="3" fill="#FFF9F5" />
            <circle cx="100" cy="148" r="4" fill="#D88C9A" />
            {/* Mixed cluster of blooms */}
            {/* Sunflower in center */}
            <g transform="translate(100, 75) scale(0.65)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <path key={deg} d="M0 0 Q-10 -35 0 -48 Q10 -35 0 0 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" transform={`rotate(${deg})`} />
              ))}
              <circle cx="0" cy="0" r="18" fill="#78350F" />
            </g>
            {/* Left Tulip */}
            <g transform="translate(68, 65) scale(0.55)">
              <path d="M0 0 C-15 15 -10 45 10 60 C30 45 35 15 20 0 Z" fill="#F8C8DC" stroke="#D88C9A" strokeWidth="2.5" />
            </g>
            {/* Right Lily */}
            <g transform="translate(132, 65) scale(0.55)">
              <path d="M0 20 Q-20 -15 0 -30 Q20 -15 0 20 Z" fill="#FFF5F7" stroke="#D88C9A" strokeWidth="2.5" />
            </g>
            {/* Daisy top */}
            <g transform="translate(100, 35) scale(0.5)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <path key={deg} d="M0 0 Q-6 -20 0 -30 Q6 -20 0 0 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" transform={`rotate(${deg})`} />
              ))}
              <circle cx="0" cy="0" r="10" fill="#FBBF24" />
            </g>
            {/* Green filler sprigs */}
            <path d="M60 100 Q45 80 55 60 Q70 85 65 105" fill="#8EB06D" opacity="0.85" />
            <path d="M140 100 Q155 80 145 60 Q130 85 135 105" fill="#8EB06D" opacity="0.85" />
          </svg>
        );
    }
  };

  const isBouquet = product.category === 'bouquet' || product.category === 'mixed';

  return (
    <div
      className={`group relative overflow-hidden flex flex-col items-center justify-center p-6 transition-all duration-300 ${className}`}
      style={{
        backgroundColor: product.imagePlaceholderColor || '#FFF9F5',
        backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(248,200,220,0.18) 100%)'
      }}
    >
      {/* Subtle fuzzy wire decorative corner motif */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 opacity-60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D88C9A]/50"></span>
        <span className="text-[10px] uppercase tracking-wider text-[#594A4E]/60 font-medium">
          {product.category === 'single' ? 'Single Stem' : isBouquet ? 'Bouquet Wrap' : 'Signature Kit'}
        </span>
      </div>

      {/* Main Floral Graphic */}
      <div className="w-full max-w-[210px] aspect-square flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
        {renderFlowerArt()}
      </div>

      {/* Explicit requirement notice badge */}
      <div className="mt-2 flex flex-col items-center text-center">
        <span className="text-[11px] font-medium text-[#594A4E]/70 tracking-tight">
          Handcrafted Fuzzy Wire Kit
        </span>
        <span className="text-[9px] text-[#594A4E]/50 uppercase tracking-widest mt-0.5">
          Handcrafted Visual Guide · Bloomora DIY Kit
        </span>
      </div>
    </div>
  );
};
