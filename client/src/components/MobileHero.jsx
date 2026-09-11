import React, { useState } from 'react';
import { HERO_SLIDES, HERO_THUMBNAILS } from '../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const MobileHero = ({
  onShopClick,
  onExploreClick,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentSlide = HERO_SLIDES[activeSlideIndex] || HERO_SLIDES[0];

  return (
    <section 
      id="mobile-hero"
      aria-label="Mobile Hero"
      className="relative w-full bg-[#0E0D0C] overflow-hidden text-white pt-10 pb-8 px-5 flex flex-col justify-between"
    >
      {/* Background Image with Dark Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          id="mobile-hero-bg"
          src={currentSlide.image}
          alt="Luxury jewellery lifestyle"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-[#0E0D0C]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-start pt-2 mb-6">
        {/* Label Badge */}
        <div 
          id="mobile-hero-badge"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1F1C18]/90 border border-[#D8B26E]/40 mb-4"
        >
          <Sparkles size={11} className="text-[#D8B26E]" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-[#EBD5A0]">
            BEST JEWELRY BRAND 2025
          </span>
        </div>

        {/* Headline */}
        <h1 
          id="mobile-hero-headline"
          className="font-serif-luxury text-3xl sm:text-4xl font-normal leading-[1.12] tracking-tight mb-3 text-white"
        >
          Crafted with Purpose
          <span className="block italic text-[#E5C378] font-light mt-0.5">
            Shine in Every Moment
          </span>
        </h1>

        {/* Short Description */}
        <p 
          id="mobile-hero-description"
          className="text-[#D8D1C7] text-xs sm:text-sm leading-relaxed mb-6 font-sans font-light"
        >
          Each piece is designed to elevate your look and celebrate your essence.
        </p>

        {/* Buttons Stacked Vertically */}
        <div className="w-full flex flex-col gap-2.5 mb-6">
          <button
            id="btn-mobile-hero-shop"
            onClick={onShopClick}
            className="w-full py-3.5 bg-[#D8B26E] active:bg-[#C49E59] text-[#0D0D0D] font-sans font-semibold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>SHOP COLLECTION</span>
            <ArrowRight size={14} />
          </button>

          <button
            id="btn-mobile-hero-explore"
            onClick={onExploreClick}
            className="w-full py-3 bg-transparent active:bg-white/10 text-[#FAF7F2] border border-[#FAF7F2]/40 font-sans font-medium text-xs tracking-[0.16em] uppercase text-center cursor-pointer"
          >
            EXPLORE VAST CULTURE
          </button>
        </div>
      </div>

      {/* 3 Small Image Thumbnails Horizontally Underneath */}
      <div className="relative z-10 w-full pt-2 border-t border-white/15">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] uppercase tracking-[0.18em] text-[#C4B7A6] font-sans">
            Curated Showcase
          </span>
          <span className="text-[9px] text-[#D8B26E] font-sans tracking-widest">
            0{activeSlideIndex + 1} / 03
          </span>
        </div>
        <div 
          id="mobile-hero-thumbnails"
          className="grid grid-cols-3 gap-2.5"
        >
          {HERO_THUMBNAILS.map((thumb, index) => {
            const isActive = activeSlideIndex === index;
            return (
              <button
                key={thumb.id}
                id={`mobile-thumb-${index + 1}`}
                onClick={() => setActiveSlideIndex(index)}
                aria-label={`View set ${index + 1}`}
                className={`relative h-18 rounded-xs overflow-hidden transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'ring-2 ring-[#D8B26E] opacity-100 scale-100' 
                    : 'opacity-60 ring-1 ring-white/20'
                }`}
              >
                <img
                  src={thumb.image}
                  alt={thumb.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-1 inset-x-0 text-center text-[8px] font-sans tracking-wider text-white">
                  {thumb.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
