import React, { useState } from 'react';
import { HERO_SLIDES, HERO_THUMBNAILS } from '../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection = ({
  onShopClick,
  onExploreClick,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentSlide = HERO_SLIDES[activeSlideIndex] || HERO_SLIDES[0];

  return (
    <section
      id="hero"
      aria-label="Hero Showcase"
      className="relative w-full min-h-[580px] sm:min-h-[640px] md:h-[680px] lg:h-[720px] xl:h-[760px] bg-[#0E0D0C] overflow-hidden select-none flex items-center"
    >
      {/* Background Lifestyle Image with Cinematic Lighting & Smooth Transition */}
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        <img
          id="hero-bg-image"
          src={currentSlide.image}
          alt="Luxury gold and pearl jewellery editorial"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Subtle Dark Gradient Overlay for optimal legibility & moody luxury contrast */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
        <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-transparent via-black/20 to-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left / Main Column: Typography & CTAs */}
        <div className="max-w-2xl text-left">
          {/* Small Label Badge */}
          <div
            id="hero-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1C18]/85 border border-[#D8B26E]/50 backdrop-blur-md mb-4 sm:mb-6 badge-glowing"
          >
            <Sparkles size={12} className="text-[#D8B26E]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-sans font-medium text-[#EBD5A0]">
              {currentSlide.label}
            </span>
          </div>

          {/* Large Responsive Headline */}
          <h1
            id="hero-headline"
            className="font-serif-luxury text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-5"
          >
            Crafted with Purpose
            <span className="block italic text-[#E5C378] font-light mt-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Shine in Every Moment
            </span>
          </h1>

          {/* Responsive Description */}
          <p
            id="hero-description"
            className="text-[#E0D8CE] text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-lg mb-6 sm:mb-8 font-sans"
          >
            {currentSlide.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              id="btn-hero-shop-collection"
              onClick={onShopClick}
              className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#D8B26E] hover:bg-[#EBD5A0] text-[#0D0D0D] font-sans font-semibold text-[11px] sm:text-xs tracking-[0.18em] uppercase flex items-center gap-2 group cursor-pointer luxury-shimmer-btn"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <button
              id="btn-hero-explore-vast-culture"
              onClick={onExploreClick}
              className="px-6 sm:px-8 py-3 sm:py-3.5 bg-transparent text-[#FAF7F2] border border-[#FAF7F2]/40 font-sans font-medium text-[11px] sm:text-xs tracking-[0.18em] uppercase backdrop-blur-sm cursor-pointer luxury-outline-btn"
            >
              EXPLORE OUR STORY
            </button>
          </div>
        </div>

        {/* Curated Set Thumbnails Selector */}
        <div
          id="hero-curated-thumbnails"
          className="w-full md:w-auto flex md:flex-col gap-3 sm:gap-4 pt-4 md:pt-0 md:pl-8 border-t border-white/10 md:border-t-0"
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#C4B7A6] font-sans text-left md:text-right hidden sm:block mb-0.5">
            Curated Sets
          </div>
          <div className="flex md:flex-col gap-2.5 sm:gap-3 overflow-x-auto pb-1 md:pb-0">
            {HERO_THUMBNAILS.map((thumb, index) => {
              const isActive = activeSlideIndex === index;
              return (
                <button
                  key={thumb.id}
                  id={`hero-thumb-${index + 1}`}
                  onClick={() => setActiveSlideIndex(index)}
                  aria-label={`View set ${index + 1}: ${thumb.label}`}
                  className={`relative shrink-0 w-16 h-20 sm:w-20 sm:h-24 lg:w-22 lg:h-28 rounded-xs overflow-hidden transition-all duration-300 group cursor-pointer ${isActive
                      ? 'ring-2 ring-[#D8B26E] ring-offset-2 ring-offset-black scale-105 opacity-100 shadow-xl badge-glowing'
                      : 'opacity-65 hover:opacity-100 hover:scale-105 ring-1 ring-white/20'
                    }`}
                >
                  <img
                    src={thumb.image}
                    alt={thumb.label}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1 left-1 right-1 text-[8px] sm:text-[9px] font-sans tracking-wider text-white text-center truncate px-0.5">
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
