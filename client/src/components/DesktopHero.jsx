import React, { useState } from 'react';
import { HERO_SLIDES, HERO_THUMBNAILS } from '../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const DesktopHero = ({
  onShopClick,
  onExploreClick,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentSlide = HERO_SLIDES[activeSlideIndex] || HERO_SLIDES[0];

  return (
    <section
      id="hero"
      aria-label="Hero Showcase"
      className="relative w-full h-[620px] lg:h-[680px] xl:h-[720px] bg-[#0E0D0C] overflow-hidden select-none"
    >
      {/* Background Lifestyle Image with Cinematic Lighting */}
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
        {/* Dark Gradient Overlay for optimal legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-transparent via-black/20 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl h-full mx-auto px-8 flex items-center justify-between">
        {/* Left Column: Typography & CTAs */}
        <div className="max-w-2xl text-left py-12">
          {/* Small Label Badge */}
          <div
            id="hero-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1C18]/80 border border-[#D8B26E]/50 backdrop-blur-md mb-6 badge-glowing"
          >
            <Sparkles size={12} className="text-[#D8B26E]" />
            <span className="text-[11px] tracking-[0.25em] uppercase font-sans font-medium text-[#EBD5A0]">
              {currentSlide.label}
            </span>
          </div>

          {/* Large Headline */}
          <h1
            id="hero-headline"
            className="font-serif-luxury text-white text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.08] tracking-tight mb-5"
          >
            Crafted with Purpose
            <span className="block italic text-[#E5C378] font-light mt-1">
              Shine in Every Moment
            </span>
          </h1>

          {/* Short Description */}
          <p
            id="hero-description"
            className="text-[#E0D8CE] text-base lg:text-lg font-light leading-relaxed max-w-lg mb-9 font-sans"
          >
            {currentSlide.description}
          </p>

          {/* Two Buttons */}
          <div className="flex items-center gap-4">
            <button
              id="btn-hero-shop-collection"
              onClick={onShopClick}
              className="px-8 py-3.5 bg-[#D8B26E] hover:bg-[#EBD5A0] text-[#0D0D0D] font-sans font-semibold text-xs tracking-[0.18em] uppercase flex items-center gap-2 group cursor-pointer luxury-shimmer-btn"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <button
              id="btn-hero-explore-vast-culture"
              onClick={onExploreClick}
              className="px-8 py-3.5 bg-transparent text-[#FAF7F2] border border-[#FAF7F2]/40 font-sans font-medium text-xs tracking-[0.18em] uppercase backdrop-blur-sm cursor-pointer luxury-outline-btn"
            >
              EXPLORE VAST CULTURE
            </button>
          </div>
        </div>

        {/* Right Column: Sets selector */}
        <div
          id="hero-vertical-thumbnails"
          className="hidden md:flex flex-col items-end gap-3 pl-8"
        >
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#C4B7A6] font-sans">
            Curated Sets
          </div>
          <div className="flex flex-col gap-3">
            {HERO_THUMBNAILS.map((thumb, index) => {
              const isActive = activeSlideIndex === index;
              return (
                <button
                  key={thumb.id}
                  id={`hero-thumb-${index + 1}`}
                  onClick={() => setActiveSlideIndex(index)}
                  aria-label={`View set ${index + 1}: ${thumb.label}`}
                  className={`relative w-20 h-24 lg:w-22 lg:h-28 rounded-sm overflow-hidden transition-all duration-300 group cursor-pointer ${isActive
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-1.5 left-1 right-1 text-[9px] font-sans tracking-wider text-white text-center truncate px-1">
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtle Bottom Vignette */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#FAF7F2] to-transparent pointer-events-none opacity-20" />
    </section>
  );
};
