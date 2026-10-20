import React from 'react';
import { Sparkles, Target, Compass, Heart, GraduationCap } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#FFF9F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FADADD]/60 border border-[#D88C9A]/30 rounded-full text-xs font-semibold text-[#594A4E]">
              <GraduationCap className="w-3.5 h-3.5 text-[#D88C9A]" />
              <span>Student-Owned Small Business</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#594A4E] tracking-tight">
              About Bloomora
            </h2>

            <p className="text-base sm:text-lg text-[#594A4E]/85 leading-relaxed">
              Bloomora is a student-owned creative business dedicated to bringing happiness through handmade DIY Fuzzy Flower Kits. We believe that every little effort can bloom into something beautiful. Our kits are designed to be affordable, beginner-friendly, and meaningful, making them perfect for gifts, decorations, and relaxing creative activities.
            </p>

            <div className="p-5 bg-white rounded-2xl border border-[#F8C8DC] space-y-3 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D88C9A] block">
                The Bloomora Philosophy
              </span>
              <p className="text-sm font-serif italic text-[#594A4E] leading-relaxed">
                “Blooming Your Efforts” represents our belief that you don’t need floristry experience to create something breathtaking. With just a handful of fuzzy craft wires and a little bit of patience, anyone can craft an everlasting bloom.
              </p>
            </div>
          </div>

          {/* Right: Mission & Vision Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Mission Card */}
            <div className="p-7 rounded-3xl bg-white border border-[#F8C8DC] shadow-sm relative overflow-hidden group hover:border-[#D88C9A] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FADADD] flex items-center justify-center text-[#594A4E] mb-4">
                <Target className="w-5 h-5 text-[#D88C9A]" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#D88C9A] block mb-1">
                Our Purpose
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#594A4E] mb-3">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-[#594A4E]/80 leading-relaxed font-normal">
                “To inspire creativity and spread happiness through affordable, meaningful, and beginner-friendly DIY flower kits.”
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-7 rounded-3xl bg-gradient-to-tr from-[#FFF9F5] to-[#F8C8DC]/30 border border-[#F8C8DC] shadow-sm relative overflow-hidden group hover:border-[#D88C9A] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FFF9F5] border border-[#F8C8DC] flex items-center justify-center text-[#594A4E] mb-4">
                <Compass className="w-5 h-5 text-[#D88C9A]" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#D88C9A] block mb-1">
                Our Future
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#594A4E] mb-3">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-[#594A4E]/80 leading-relaxed font-normal">
                “To become a recognised creative gift brand that encourages everyone to discover the joy of handmade creations.”
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
