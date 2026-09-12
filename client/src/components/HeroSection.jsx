import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection = ({
  onShopClick,
  onExploreClick,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Auto-change hero slide and image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = HERO_SLIDES[activeSlideIndex] || HERO_SLIDES[0];

  return (
    <section
      id="hero"
      aria-label="Hero Showcase"
      className="relative w-full min-h-[580px] sm:min-h-[640px] md:h-[680px] lg:h-[720px] xl:h-[760px] bg-[#0E0D0C] overflow-hidden select-none flex items-center"
    >
      {/* Background Lifestyle Slides with 5-Second Crossfade & Ken Burns Zoom Effect */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = activeSlideIndex === index;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${isActive ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title || 'Luxury jewelry editorial'}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={`w-full h-full object-cover object-center transition-transform duration-[5000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'
                }`}
            />
            {/* Subtle Dark Gradient Overlays for optimal luxury contrast */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
            <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-transparent via-black/20 to-black/60" />
          </div>
        );
      })}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left / Main Column: Dynamic Typography & CTAs */}
        <div className="max-w-2xl text-left">
          {/* Small Label Badge */}
          <div
            id="hero-badge"
            key={`badge-${activeSlideIndex}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1C18]/85 border border-[#D8B26E]/50 backdrop-blur-md mb-4 sm:mb-6 badge-glowing transition-all duration-700"
          >
            <Sparkles size={12} className="text-[#D8B26E]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-sans font-medium text-[#EBD5A0]">
              {currentSlide.label}
            </span>
          </div>

          {/* Large Responsive Headline with dynamic slide change */}
          <h1
            id="hero-headline"
            key={`headline-${activeSlideIndex}`}
            className="font-serif-luxury text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-5 transition-opacity duration-700"
          >
            {currentSlide.title || 'Crafted with Purpose'}
            <span className="block italic text-[#E5C378] font-light mt-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {currentSlide.subtitle || 'Shine in Every Moment'}
            </span>
          </h1>

          {/* Responsive Description */}
          <p
            id="hero-description"
            key={`desc-${activeSlideIndex}`}
            className="text-[#E0D8CE] text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-lg mb-6 sm:mb-8 font-sans transition-opacity duration-700"
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
      </div>

      {/* Passive 5-Second Editorial Slide Progress Indicators (No Click to Change) */}
      <div
        id="hero-slide-progress-indicators"
        aria-label="Editorial slide progression"
        className="absolute bottom-6 left-6 sm:left-auto sm:right-8 z-30 flex items-center gap-2.5 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B26E]/80 font-sans hidden sm:inline-block mr-1">
          0{activeSlideIndex + 1} / 0{HERO_SLIDES.length}
        </span>
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = activeSlideIndex === idx;
          return (
            <div
              key={slide.id}
              className="relative h-1 w-8 sm:w-12 bg-white/20 rounded-full overflow-hidden"
            >
              {isActive ? (
                <div
                  key={`progress-${activeSlideIndex}`}
                  className="h-full bg-[#D8B26E] rounded-full hero-slide-progress-active"
                />
              ) : (
                <div
                  className={`h-full ${idx < activeSlideIndex ? 'w-full bg-[#D8B26E]/40' : 'w-0'
                    }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

