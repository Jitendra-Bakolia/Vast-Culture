import React from 'react';
import { STORY_IMAGE } from '../data/mockData';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const OurStorySection = () => {
  return (
    <section
      id="our-story"
      aria-label="Our Story & Philosophy"
      className="w-full max-w-full overflow-hidden bg-[#FAF7F2] text-[#1E1B18] py-14 sm:py-18 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Left: Product Image on soft beige fabric */}
          <div className="relative group">
            <div className="relative overflow-hidden bg-[#EDE6DC] border border-[#E3D9C9] shadow-md">
              <img
                id="our-story-image"
                src={STORY_IMAGE}
                alt="Gold rings, bracelet and pearl jewellery on soft beige fabric"
                loading="lazy"
                decoding="async"
                className="w-full h-[280px] sm:h-[380px] md:h-[420px] lg:h-[480px] object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

              {/* Subtle Luxury Corner Stamp */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 border border-[#D8B26E]/40 text-[9px] sm:text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C6D2D] shadow-xs">
                Handcrafted · 18k Vermeil
              </div>
            </div>

            {/* Subtle decorative background accent frame */}
            <div className="hidden sm:block absolute -bottom-3 -right-3 w-full h-full border border-[#D8B26E]/30 -z-10 pointer-events-none" />
          </div>

          {/* Right: Story Copy */}
          <div className="flex flex-col items-start">
            {/* Small Label */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.28em] uppercase text-[#9E7A32]">
                OUR STORY
              </span>
            </div>

            {/* Subtle Gold Decorative Star/Asterisk */}
            <div className="my-2.5 flex items-center gap-2 text-[#D8B26E]" aria-hidden="true">
              <span className="h-[1px] w-6 bg-[#D8B26E]/50" />
              <Sparkles size={13} className="text-[#D8B26E]" />
              <span className="h-[1px] w-6 bg-[#D8B26E]/50" />
            </div>

            {/* Heading */}
            <h2
              id="our-story-heading"
              className="font-serif-luxury text-[#121110] font-normal leading-[1.15] mb-5 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Welcome to Vast Culture
            </h2>

            {/* Body Copy */}
            <div className="space-y-3.5 sm:space-y-4 text-[#4A453E] font-sans text-xs sm:text-sm md:text-[15px] leading-relaxed font-light">
              <p>
                <strong className="font-medium text-[#1A1A1A]">Vast Culture</strong> is more than just a jewellery brand — it’s a celebration of individuality, confidence and timeless beauty.
              </p>
              <p>
                We believe every piece you wear should tell your story and make you feel unstoppable.
              </p>
              <p>
                Our designs are crafted with passion, premium materials and attention to detail, bringing you jewellery that is elegant, versatile and made to last.
              </p>
            </div>

            {/* Signature badge */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#E8DEC9] w-full flex items-center justify-between">
              <div>
                <span className="font-cinzel-luxury text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#1F1D1A]">
                  VAST CULTURE
                </span>
                <span className="block text-[9px] sm:text-[10px] font-sans text-[#7A7165] tracking-wider uppercase mt-0.5">
                  Est. 2025 · New Delhi & Mumbai
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#8C6D2D] text-xs font-sans">
                <ShieldCheck size={16} />
                <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">Certified Purity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
