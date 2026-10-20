import React from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { Heart, Instagram, Facebook, MessageSquare, QrCode, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, settings, setIsAdminOpen } = useBloomora();

  const handleNavClick = (id: string) => {
    setActivePage(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const rawDigits = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const cleanPhone = rawDigits.startsWith('0')
    ? '6' + rawDigits
    : rawDigits.startsWith('60')
    ? rawDigits
    : '60' + rawDigits;
  const generalWhatsappMsg = encodeURIComponent(
    "Hi Bloomora! 🌷 I'm interested in your DIY Fuzzy Flower Kits. May I know more about your products?"
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${generalWhatsappMsg}`;

  return (
    <footer className="bg-white border-t border-[#F8C8DC] pt-14 pb-10 text-[#594A4E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#F8C8DC]/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-2xl font-serif font-bold text-[#594A4E] block">
              BLOOMORA
            </span>
            <p className="text-sm font-serif italic text-[#D88C9A] font-medium -mt-2">
              “Blooming Your Efforts”
            </p>
            <p className="text-xs sm:text-sm text-[#594A4E]/80 max-w-sm leading-relaxed">
              A student-owned Malaysian business dedicated to spreading happiness through beginner-friendly DIY Fuzzy Flower Kits that never wilt.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFF9F5] border border-[#F8C8DC] hover:border-[#D88C9A] flex items-center justify-center text-[#594A4E] transition-colors"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
              </a>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFF9F5] border border-[#F8C8DC] hover:border-[#D88C9A] flex items-center justify-center text-[#594A4E] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFF9F5] border border-[#F8C8DC] hover:border-[#D88C9A] flex items-center justify-center text-[#594A4E] transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4 text-[#1877F2]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D88C9A] block">
              Explore Bloomora
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#594A4E]/80">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-[#D88C9A] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('shop')}
                  className="hover:text-[#D88C9A] transition-colors cursor-pointer"
                >
                  DIY Flower Kits (Catalogue)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-[#D88C9A] transition-colors cursor-pointer"
                >
                  About Our Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('how-it-works')}
                  className="hover:text-[#D88C9A] transition-colors cursor-pointer"
                >
                  How It Works (4 Steps)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('promotions')}
                  className="hover:text-[#D88C9A] transition-colors cursor-pointer"
                >
                  Special Launch Promo (10% Off)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-[#D88C9A] transition-colors cursor-pointer"
                >
                  Contact & Enquiries
                </button>
              </li>
              <li className="pt-1 border-t border-[#F8C8DC]/40">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="hover:text-[#D88C9A] transition-colors cursor-pointer flex items-center gap-1.5 text-xs text-[#594A4E]/60 font-medium"
                >
                  <Lock className="w-3 h-3 text-[#D88C9A]" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Payment */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D88C9A] block">
              Payment & Support
            </span>
            <p className="text-xs text-[#594A4E]/80 leading-relaxed">
              We accept direct manual payments via <strong>DuitNow QR</strong> (supported by all major Malaysian banks & eWallets).
            </p>

            <div className="p-3 bg-[#FFF9F5] border border-[#F8C8DC] rounded-xl flex items-center gap-3">
              <QrCode className="w-6 h-6 text-[#ED237A]" />
              <div className="text-[11px]">
                <strong className="block text-[#594A4E]">DuitNow QR Verified</strong>
                <span className="text-[#594A4E]/70">{settings.duitnowRecipientName}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#594A4E]/60 gap-4">
          <p>© {new Date().getFullYear()} BLOOMORA. All rights reserved. Handcrafted with care.</p>
          <div className="flex items-center gap-2">
            <span>Student-Owned Enterprise</span>
            <span aria-hidden="true">·</span>
            <span>Made in Malaysia 🌷</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
