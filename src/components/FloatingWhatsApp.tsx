import React, { useState } from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useBloomora();
  const [showTooltip, setShowTooltip] = useState(false);

  const rawDigits = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const cleanPhone = rawDigits.startsWith('0')
    ? '6' + rawDigits
    : rawDigits.startsWith('60')
    ? rawDigits
    : '60' + rawDigits;
  const prefilledMessage = encodeURIComponent(
    "Hi Bloomora! 🌷 I'm interested in your DIY Fuzzy Flower Kits. May I know more about your products?"
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${prefilledMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white text-[#594A4E] text-xs rounded-xl shadow-lg border border-[#F8C8DC] animate-fade-in">
          <span>Chat with Bloomora on WhatsApp 🌷</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#594A4E]/50 hover:text-[#594A4E] ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group relative"
        aria-label="Chat with Bloomora on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Soft pulse animation ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping -z-10 group-hover:hidden" />
        
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white fill-current"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
    </div>
  );
};
