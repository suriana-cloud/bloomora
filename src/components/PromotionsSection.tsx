import React from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { Sparkles, Check, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

export const PromotionsSection: React.FC = () => {
  const {
    promotion,
    remainingRedemptions,
    products,
    setSelectedProductForModal,
    setIsCartOpen
  } = useBloomora();

  const handleScrollToShop = () => {
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Preview samples of original vs discounted price
  const samplePricings = [
    { name: 'Single Daisy Kit', original: 5.0, discounted: 4.5 },
    { name: 'Single Tulip / Sunflower / Lily', original: 7.0, discounted: 6.3 },
    { name: 'Tulip / Daisy / Sunflower Bouquet', original: 15.0, discounted: 13.5 },
    { name: 'Hibiscus Bouquet Kit', original: 17.0, discounted: 15.3 },
    { name: 'Lily Bouquet Kit', original: 20.0, discounted: 18.0 },
    { name: 'Mix Flowers Bouquet Kit', original: 25.0, discounted: 22.5 },
  ];

  const claimedCount = promotion.currentRedemptions;
  const progressPercent = Math.min(100, Math.round((claimedCount / promotion.maxRedemptions) * 100));

  return (
    <section id="promotions" className="py-16 md:py-24 bg-gradient-to-b from-[#FFF9F5] via-[#FFF0F5] to-[#FFF9F5] border-t border-[#F8C8DC]/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Campaign Banner Box */}
        <div className="relative overflow-hidden bg-gradient-to-tr from-[#FADADD] via-[#F8C8DC] to-[#FFF9F5] rounded-3xl border border-[#D88C9A]/40 p-8 sm:p-12 shadow-lg">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full text-xs font-bold text-[#D88C9A] tracking-wider uppercase mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Opening Campaign</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#594A4E] tracking-tight leading-tight">
              BLOOMORA SPECIAL LAUNCH – 10% OFF!
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#594A4E]/85 leading-relaxed">
              Celebrate the launch of our student-owned floral craft studio. We are gifting a 10% discount to our first 30 eligible customers across all Bloomora kits.
            </p>

            {/* Live Redemption Tracker */}
            <div className="mt-8 p-5 bg-white/80 rounded-2xl border border-[#F8C8DC] max-w-xl shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-[#594A4E] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#D88C9A]" />
                  Launch Claim Tracker
                </span>
                <span className="font-mono font-bold text-[#D88C9A]">
                  {claimedCount} / {promotion.maxRedemptions} Claimed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#FADADD]/60 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-[#D88C9A] h-full rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#594A4E]/70 pt-1">
                <span>
                  {remainingRedemptions > 0 ? (
                    <strong className="text-emerald-700 font-semibold">
                      {remainingRedemptions} spots remaining
                    </strong>
                  ) : (
                    <strong className="text-red-600 font-semibold">
                      Promotion Fully Claimed
                    </strong>
                  )}
                </span>
                <span className="text-[11px] text-[#594A4E]/50">
                  Auto-calculated at checkout
                </span>
              </div>
            </div>

            {/* Campaign Rules & Adjacency */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#594A4E]/80 max-w-xl">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D88C9A] shrink-0" />
                <span>Applies to all 11 Bloomora kits</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D88C9A] shrink-0" />
                <span>1 redemption per eligible customer order</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D88C9A] shrink-0" />
                <span>Auto-stops after 30 confirmed orders</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D88C9A] shrink-0" />
                <span>No promo code required</span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleScrollToShop}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#594A4E] hover:bg-[#D88C9A] text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Shop With 10% Off Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Pricing Comparison Table (Original Price vs Discounted Price) */}
        <div className="mt-12 bg-white rounded-3xl border border-[#F8C8DC] p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D88C9A]">
              Transparent Savings
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#594A4E]">
              Original vs Special Launch Price
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#F8C8DC] text-[#594A4E]/70 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">DIY Kit Variety</th>
                  <th className="py-3 px-4">Original Price</th>
                  <th className="py-3 px-4">Special Launch (10% Off)</th>
                  <th className="py-3 px-4 text-right">You Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8C8DC]/50">
                {samplePricings.map((tier) => (
                  <tr key={tier.name} className="hover:bg-[#FFF9F5]/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#594A4E]">{tier.name}</td>
                    <td className="py-3.5 px-4 tabular-nums text-[#594A4E]/60 line-through">
                      RM{tier.original.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 tabular-nums font-bold text-[#594A4E]">
                      RM{tier.discounted.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 tabular-nums font-semibold text-[#D88C9A] text-right">
                      RM{(tier.original - tier.discounted).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
