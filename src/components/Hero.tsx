import React from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { ArrowRight, Sparkles, Heart, BookOpen, Clock } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedProductForModal, products } = useBloomora();

  const handleScrollToShop = () => {
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Preview quick picks for the hero visual cards
  const heroFlowers = [
    { name: 'Tulip', color: '#FADADD', tag: 'Beginner Classic', flowerType: 'Tulip' },
    { name: 'Sunflower', color: '#FEF3C7', tag: 'Pure Sunshine', flowerType: 'Sunflower' },
    { name: 'Lily', color: '#FFF0F5', tag: 'Graceful Curve', flowerType: 'Lily' },
    { name: 'Hibiscus', color: '#FDE2E4', tag: 'Bunga Raya', flowerType: 'Hibiscus' },
    { name: 'Daisy', color: '#F1F5F9', tag: 'First-Timer Friendly', flowerType: 'Daisy' }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#FFF9F5] via-[#FFF5F8] to-[#FFF9F5]">
      {/* Delicate floral decorative background shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#FADADD]/40 to-[#F8C8DC]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8C8DC]/40 border border-[#D88C9A]/30 rounded-full text-xs font-semibold tracking-wide text-[#594A4E]">
              <Sparkles className="w-3.5 h-3.5 text-[#D88C9A]" />
              <span>Student-Owned Boutique · Everlasting DIY Flower Craft</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#594A4E] tracking-tight leading-[1.15]">
              BLOOMORA
            </h1>

            <p className="text-2xl sm:text-3xl font-serif italic text-[#D88C9A] font-medium">
              “Blooming Your Efforts”
            </p>

            <p className="text-base sm:text-lg text-[#594A4E]/85 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Create your own little bouquet of happiness with Bloomora DIY Fuzzy Flower Kits. No experience needed, just a little creativity and love!
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={handleScrollToShop}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#FFF9F5] bg-[#D88C9A] hover:bg-[#c97b89] active:scale-98 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleScrollToShop}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#594A4E] bg-[#FFF9F5] hover:bg-[#FADADD]/40 border border-[#D88C9A]/40 active:scale-98 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Our Collection</span>
              </button>
            </div>

            {/* Quick Trust Attributes (Zero-Pill clean typography) */}
            <div className="pt-6 border-t border-[#F8C8DC]/70 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-[#594A4E]/75">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Heart className="w-3.5 h-3.5 text-[#D88C9A]" />
                Never Wilts or Fades
              </span>
              <span aria-hidden="true" className="text-[#D88C9A]">·</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-[#D88C9A]" />
                Beginner Guide Included
              </span>
              <span aria-hidden="true" className="text-[#D88C9A]">·</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#D88C9A]" />
                Craft in 15–45 Mins
              </span>
            </div>
          </div>

          {/* Right Column: Visual Floral Showcase Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-tr from-[#FADADD]/60 via-[#FFF9F5] to-[#F8C8DC]/60 p-6 sm:p-8 rounded-3xl border border-[#F8C8DC] shadow-lg">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#D88C9A]/20">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D88C9A] font-semibold">
                    Signature Fuzzy Blooms
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#594A4E]">
                    Handcrafted With Love
                  </h3>
                </div>
                <span className="text-xs font-medium text-[#594A4E]/70">
                  5 Iconic Varieties
                </span>
              </div>

              {/* Showcase Flower Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                {heroFlowers.map((flower, idx) => (
                  <div
                    key={flower.name}
                    onClick={() => {
                      const matched = products.find(p => p.flowerType === flower.flowerType);
                      if (matched) setSelectedProductForModal(matched);
                    }}
                    className={`cursor-pointer p-3 rounded-2xl border border-[#F8C8DC] bg-[#FFF9F5]/90 hover:bg-white hover:shadow-md transition-all text-center group ${
                      idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                    }`}
                  >
                    <div
                      className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl mb-2 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: flower.color }}
                    >
                      {flower.name === 'Tulip' && '🌷'}
                      {flower.name === 'Sunflower' && '🌻'}
                      {flower.name === 'Lily' && '🪷'}
                      {flower.name === 'Hibiscus' && '🌺'}
                      {flower.name === 'Daisy' && '🌼'}
                    </div>
                    <span className="block text-xs font-bold text-[#594A4E] group-hover:text-[#D88C9A] transition-colors">
                      {flower.name}
                    </span>
                    <span className="block text-[10px] text-[#594A4E]/60">
                      {flower.tag}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Feature Card */}
              <div className="mt-5 p-3.5 bg-gradient-to-r from-[#F8C8DC]/50 to-[#FADADD]/50 rounded-xl border border-[#D88C9A]/30 flex items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-xs font-bold text-[#594A4E] block">
                    Looking for a grand gift?
                  </span>
                  <span className="text-[11px] text-[#594A4E]/80">
                    Explore our DIY Bouquet and Mix Flower Kits from RM15.00
                  </span>
                </div>
                <button
                  onClick={handleScrollToShop}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#594A4E] text-[#FFF9F5] hover:bg-[#D88C9A] rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  View
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
