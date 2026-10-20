import React, { useState } from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { ShoppingBag, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    setIsCartOpen,
    remainingRedemptions,
    promotion,
    setIsAdminOpen
  } = useBloomora();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About Us' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F5]/95 backdrop-blur-md border-b border-[#F8C8DC]/60 transition-all">
      {/* Launch Promotional Announcement Bar */}
      {!bannerDismissed && promotion.isActive && remainingRedemptions > 0 && (
        <div className="bg-gradient-to-r from-[#FADADD] via-[#F8C8DC] to-[#FADADD] px-4 py-1.5 text-center text-xs font-medium text-[#594A4E] flex items-center justify-center gap-2 border-b border-[#D88C9A]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#D88C9A] shrink-0" />
          <span className="truncate">
            <strong className="font-semibold">Special Launch: 10% OFF</strong> for the first 30 eligible orders! Only{' '}
            <span className="font-bold underline text-[#8B3A4D]">{remainingRedemptions} spots remaining</span>
          </span>
          <button
            onClick={() => setBannerDismissed(true)}
            className="ml-2 text-[#594A4E]/70 hover:text-[#594A4E] text-sm leading-none p-0.5 rounded"
            title="Dismiss banner"
            aria-label="Dismiss banner"
          >
            ×
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav Links) — Zone 3 (Primary Action & Cart) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="text-2xl sm:text-3xl font-serif tracking-wider font-bold text-[#594A4E] group-hover:text-[#D88C9A] transition-colors">
            BLOOMORA
          </span>
          <span className="block text-[10px] tracking-widest uppercase font-medium text-[#D88C9A] -mt-1">
            Blooming Your Efforts
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#594A4E]/85">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer hover:text-[#D88C9A] ${
                activePage === item.id
                  ? 'text-[#594A4E] font-semibold border-b-2 border-[#D88C9A]'
                  : 'text-[#594A4E]/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Action (Shopping Cart) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#FFF9F5] bg-[#D88C9A] hover:bg-[#c97b89] active:scale-95 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-[#D88C9A] bg-[#FFF9F5] rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Portal Shortcut */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2 text-[#594A4E]/60 hover:text-[#594A4E] hover:bg-[#F8C8DC]/30 rounded-xl transition-colors cursor-pointer"
            title="Bloomora Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <ShieldCheck className="w-4 h-4 text-[#D88C9A]" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#594A4E] hover:bg-[#F8C8DC]/30 rounded-lg cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF9F5] border-b border-[#F8C8DC] px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activePage === item.id
                  ? 'bg-[#F8C8DC]/40 text-[#594A4E] font-semibold'
                  : 'text-[#594A4E]/80 hover:bg-[#FADADD]/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
