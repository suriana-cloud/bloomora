import React from 'react';
import { Palette, ShoppingCart, PackageOpen, Sparkles, ArrowRight } from 'lucide-react';
import { useBloomora } from '../context/BloomoraContext';

export const HowItWorks: React.FC = () => {
  const { setActivePage } = useBloomora();

  const handleShopClick = () => {
    setActivePage('shop');
    const elem = document.getElementById('shop');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    {
      num: '01',
      title: 'Choose Your Flowers',
      description: 'Browse our collection and select your favourite DIY Fuzzy Flower Kit.',
      detail: 'Choose between single stems (tulips, daisies, sunflowers, lilies, hibiscus) or grand wrapped bouquets.',
      icon: Palette,
      badge: 'Step 1'
    },
    {
      num: '02',
      title: 'Place Your Order',
      description: 'Add your selected kits to your shopping cart and proceed to checkout.',
      detail: 'Enjoy the 10% special launch discount automatically, choose Self Pickup or Delivery, and pay via DuitNow QR.',
      icon: ShoppingCart,
      badge: 'Step 2'
    },
    {
      num: '03',
      title: 'Receive Your Kit',
      description: 'Get your DIY kit with the materials and simple instructions.',
      detail: 'Unbox velvety fuzzy wires, floral support stems, tape, wrapping sheets, and our printed visual guide booklet.',
      icon: PackageOpen,
      badge: 'Step 3'
    },
    {
      num: '04',
      title: 'Create Your Bloom',
      description: 'Follow the instructions and enjoy making your own beautiful fuzzy flowers.',
      detail: 'Bend, twist, assemble, and watch your fuzzy flowers come alive—a lasting creation to cherish or gift.',
      icon: Sparkles,
      badge: 'Step 4'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-y border-[#F8C8DC]/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D88C9A]">
            Simple & Stress-Free
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#594A4E] tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-[#594A4E]/80 leading-relaxed">
            From picking your kit to displaying your finished handmade flowers, crafting with Bloomora is straightforward and rewarding.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group p-6 rounded-2xl bg-[#FFF9F5] border border-[#F8C8DC] hover:border-[#D88C9A] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-bold text-[#D88C9A]">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#F8C8DC] flex items-center justify-center text-[#594A4E] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-[#D88C9A]" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-[#D88C9A] uppercase tracking-wider block mb-1">
                    {step.badge}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-[#594A4E] mb-2 group-hover:text-[#D88C9A] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-[#594A4E]/90 mb-2 leading-relaxed">
                    {step.description}
                  </p>

                  <p className="text-xs text-[#594A4E]/70 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={handleShopClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D88C9A] hover:bg-[#c97b89] text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>Start Step 1: Browse Flower Kits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
