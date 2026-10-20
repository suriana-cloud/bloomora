import React from 'react';
import { Sparkles, Flower2, HeartHandshake, Smile, Scissors, BookOpenCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: 'Long-Lasting Flowers',
      subtitle: 'Never Wilts or Fades',
      description: 'Unlike fresh flowers that wither away in days, your handcrafted fuzzy wire flowers remain vibrant, soft, and intact forever.',
      icon: Flower2,
      accent: '#FADADD'
    },
    {
      title: 'Affordable & Meaningful',
      subtitle: 'From RM5.00',
      description: 'Handmade gifts carry immense sentimental value. Bloomora offers heartfelt, budget-friendly gifting options for students and craft lovers alike.',
      icon: HeartHandshake,
      accent: '#F8C8DC'
    },
    {
      title: 'Beginner-Friendly Kits',
      subtitle: 'No Experience Needed',
      description: 'Every kit is thoughtfully calibrated so anyone—from young beginners to first-time crafters—can fold, shape, and bloom with confidence.',
      icon: Sparkles,
      accent: '#FFF0F5'
    },
    {
      title: 'Personalised Creations',
      subtitle: 'Unique Every Time',
      description: 'Each bend of the wire reflects your own personal touch. Shape custom petal curves, mix colours, and create a truly one-of-a-kind bloom.',
      icon: Scissors,
      accent: '#FDE2E4'
    },
    {
      title: 'Relaxing & Fun Activity',
      subtitle: 'Calming Creative Therapy',
      description: 'Unwind from busy study or work routines. The tactile, velvety texture of fuzzy wires makes crafting a soothing, joyful creative escape.',
      icon: Smile,
      accent: '#FEF3C7'
    },
    {
      title: 'Step-by-Step Booklet',
      subtitle: 'Clear Visual Guide',
      description: 'Each kit includes our printed instruction booklet with clear illustrations, petal folding tips, and stem-wrapping instructions.',
      icon: BookOpenCheck,
      accent: '#F1F5F9'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FFF9F5] border-y border-[#F8C8DC]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D88C9A]">
            The Bloomora Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#594A4E] tracking-tight">
            Why Choose Bloomora?
          </h2>
          <p className="text-sm sm:text-base text-[#594A4E]/80 leading-relaxed">
            Every little effort you put into folding our fuzzy wires blossoms into a lasting memory of love, care, and creativity.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group p-6 sm:p-7 rounded-2xl bg-white/70 hover:bg-white border border-[#F8C8DC]/70 hover:border-[#D88C9A] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: benefit.accent }}
                  >
                    <Icon className="w-6 h-6 text-[#594A4E]" />
                  </div>

                  <span className="text-xs font-medium text-[#D88C9A] tracking-wider block mb-1">
                    {benefit.subtitle}
                  </span>

                  <h3 className="text-lg font-serif font-bold text-[#594A4E] mb-2 group-hover:text-[#D88C9A] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-[#594A4E]/75 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
