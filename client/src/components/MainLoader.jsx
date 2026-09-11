import React, { useState, useEffect } from 'react';
import logo from '../../src/img/logo.png';
import { Sparkles } from 'lucide-react';

const CRAFT_STAGES = [
  { progress: 15, progressClass: 'progress-15', text: 'FORGING 18K SOLID GOLD VERMEIL' },
  { progress: 40, progressClass: 'progress-40', text: 'SETTING HAND-SELECTED DIAMONDS' },
  { progress: 70, progressClass: 'progress-70', text: 'POLISHING ATELIER CREATIONS' },
  { progress: 90, progressClass: 'progress-90', text: 'CURATING YOUR PRIVATE VAULT' },
  { progress: 100, progressClass: 'progress-100', text: 'WELCOME TO VAST CULTURE' },
];

export const MainLoader = ({ 
  isLoading = true, 
  onFinish,
  minDuration = 2200,
}) => {
  const [stageIndex, setStageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        setShouldRender(false);
        onFinish?.();
      }, 750);
      return () => clearTimeout(exitTimer);
    }

    setShouldRender(true);
    setIsExiting(false);

    // Staged progression through haute joaillerie craftsmanship steps
    const t1 = setTimeout(() => setStageIndex(1), 450);
    const t2 = setTimeout(() => setStageIndex(2), 950);
    const t3 = setTimeout(() => setStageIndex(3), 1450);
    const t4 = setTimeout(() => setStageIndex(4), 1950);

    const finishTimer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        setShouldRender(false);
        onFinish?.();
      }, 750);
      return () => clearTimeout(exitTimer);
    }, Math.max(minDuration, 2500));

    // Keyboard shortcut (Escape) to skip intro immediately
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsExiting(true);
        setTimeout(() => {
          setShouldRender(false);
          onFinish?.();
        }, 300);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading, minDuration, onFinish]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
      onFinish?.();
    }, 400);
  };

  if (!shouldRender) return null;

  const currentStage = CRAFT_STAGES[stageIndex] || CRAFT_STAGES[0];

  return (
    <div
      id="main-app-loader"
      role="progressbar"
      aria-valuenow={currentStage.progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Vast Culture Luxury Boutique"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center loader-vignette-bg text-[#FAF7F2] select-none transition-all duration-750 ease-out w-full max-w-full overflow-hidden ${
        isExiting 
          ? 'opacity-0 scale-100 pointer-events-none blur-sm' 
          : 'opacity-100 scale-100'
      }`}
    >
      {/* 1. Atmospheric Ambient Layer: Floating Stardust & Classical Atelier Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep molten gold core backlight behind center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[540px] md:w-[680px] h-[280px] sm:h-[540px] md:h-[680px] max-w-[85vw] max-h-[85vw] rounded-full bg-[#D8B26E]/14 blur-[110px] animate-core-aura" />

        {/* Ambient floating golden diamond dust particles */}
        <div className="absolute top-[20%] left-[18%] w-1 h-1 rounded-full bg-[#FFF5DC] shadow-[0_0_6px_#D8B26E] animate-stardust-1" />
        <div className="absolute top-[35%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#EBD5A0] shadow-[0_0_8px_#D8B26E] animate-stardust-2" />
        <div className="absolute bottom-[28%] left-[25%] w-1 h-1 rounded-full bg-[#FAF7F2] shadow-[0_0_6px_#FFF] animate-stardust-3" />
        <div className="absolute bottom-[38%] right-[19%] w-1 h-1 rounded-full bg-[#D8B26E] shadow-[0_0_6px_#D8B26E] animate-stardust-4" />
        <div className="absolute top-[65%] left-[14%] w-1 h-1 rounded-full bg-[#F3E2BC] shadow-[0_0_5px_#D8B26E] animate-stardust-2" />
        <div className="absolute top-[15%] right-[32%] w-1 h-1 rounded-full bg-[#FFF] shadow-[0_0_7px_#FFF] animate-stardust-3" />

        {/* Classical Gold Corner Filigrees */}
        <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#D8B26E]/30 hidden sm:block">
          <div className="w-1.5 h-1.5 bg-[#D8B26E]/60 absolute -top-1 -left-1 rounded-full" />
        </div>
        <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#D8B26E]/30 hidden sm:block">
          <div className="w-1.5 h-1.5 bg-[#D8B26E]/60 absolute -top-1 -right-1 rounded-full" />
        </div>
        <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-[#D8B26E]/30 hidden sm:block">
          <div className="w-1.5 h-1.5 bg-[#D8B26E]/60 absolute -bottom-1 -left-1 rounded-full" />
        </div>
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#D8B26E]/30 hidden sm:block">
          <div className="w-1.5 h-1.5 bg-[#D8B26E]/60 absolute -bottom-1 -right-1 rounded-full" />
        </div>
      </div>

      {/* 2. Emblem Centerpiece with Kinetic Astrolabe & Multi-Point Glints */}
      <div className="relative flex items-center justify-center mb-8 sm:mb-10">
        {/* Concentric Golden Energy Radiations */}
        <div className="absolute w-52 h-52 sm:w-64 sm:h-64 md:w-76 md:h-76 rounded-full border border-[#D8B26E]/30 animate-loader-ripple-1 pointer-events-none" />
        <div className="absolute w-52 h-52 sm:w-64 sm:h-64 md:w-76 md:h-76 rounded-full border border-[#D8B26E]/20 animate-loader-ripple-2 pointer-events-none" />

        {/* Outermost Celestial Ring with Cardinal Diamond Markers */}
        <div className="absolute w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full border border-[#D8B26E]/25 animate-loader-spin-slow pointer-events-none">
          {/* North Cardinal Marker */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FFFBEA] border border-[#D8B26E] shadow-[0_0_8px_#D8B26E] animate-cardinal-pip" />
          {/* South Cardinal Marker */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FFFBEA] border border-[#D8B26E] shadow-[0_0_8px_#D8B26E] animate-cardinal-pip" />
          {/* East Cardinal Marker */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFFBEA] border border-[#D8B26E] shadow-[0_0_8px_#D8B26E] animate-cardinal-pip" />
          {/* West Cardinal Marker */}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFFBEA] border border-[#D8B26E] shadow-[0_0_8px_#D8B26E] animate-cardinal-pip" />
        </div>

        {/* Middle Counter-Clockwise Segmented Gold Orbital Ring */}
        <div className="absolute w-44 h-44 sm:w-54 sm:h-54 md:w-64 md:h-64 rounded-full border border-dashed border-[#D8B26E]/40 animate-loader-spin-ccw pointer-events-none" />

        {/* Inner Clockwise Hairline Ring with Orbiting Diamond Nodes */}
        <div className="absolute w-36 h-36 sm:w-46 sm:h-46 md:w-54 md:h-54 rounded-full border border-[#D8B26E]/50 animate-loader-spin-cw pointer-events-none">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FFFDEB] shadow-[0_0_10px_#D8B26E]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#EBD5A0] shadow-[0_0_8px_#D8B26E]" />
        </div>

        {/* Emblem Container with Exact Choreographed Specular Diamond Glints */}
        <div className="relative z-20 flex items-center justify-center p-2 sm:p-4">
          {/* Authentic High-Res Brand Emblem */}
          <img
            src={logo}
            alt="Vast Culture Maison Emblem"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain animate-loader-emblem select-none"
          />

          {/* Glint 1: Crown Solitaire Diamond on the 'C' Monogram */}
          <div className="absolute top-[26%] right-[28%] z-30 pointer-events-none animate-glint-crown">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#FFFFFF]">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor" />
            </svg>
          </div>

          {/* Glint 2: Diamond Foliage on Left Olive Branch */}
          <div className="absolute top-[44%] left-[17%] z-30 pointer-events-none animate-glint-leaf">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#FFFBEA]">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor" />
            </svg>
          </div>

          {/* Glint 3: Pear-Cut Teardrop Diamond Pendant on Necklace */}
          <div className="absolute bottom-[8%] right-[27%] z-30 pointer-events-none animate-glint-pendant">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#FFFFFF]">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor" />
            </svg>
          </div>

          {/* Glint 4: Ambient Star Sparkle on Right Perimeter */}
          <div className="absolute top-[40%] right-[4%] z-30 pointer-events-none animate-glint-star">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#EBD5A0]">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Regal Typography & Haute Joaillerie Crest */}
      <div className="flex flex-col items-center text-center px-4 mb-7 sm:mb-8">
        <h1 className="font-cinzel-luxury text-2xl sm:text-3xl md:text-4xl tracking-[0.3em] sm:tracking-[0.38em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6C8] via-[#E8CE9D] to-[#D8B26E] animate-text-shimmer">
          VAST CULTURE
        </h1>
        
        {/* Luxury Gold Divider with Solitaire Diamond Crest */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
          <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D8B26E]/60" />
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rotate-45 bg-[#D8B26E]/70" />
            <span className="font-cinzel-luxury text-[10px] sm:text-[11px] md:text-xs tracking-[0.46em] text-[#D8B26E] uppercase font-medium">
              Haute Joaillerie
            </span>
            <span className="w-1 h-1 rotate-45 bg-[#D8B26E]/70" />
          </div>
          <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D8B26E]/60" />
        </div>

        <p className="font-serif-luxury italic text-xs sm:text-sm text-[#C8BFAF] tracking-wider mt-1.5 opacity-90">
          Crafted with Purpose · Cherished Forever
        </p>
      </div>

      {/* 4. Haute Horlogerie Progress Track with Traveling Diamond Head */}
      <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm px-6">
        {/* Dynamic Status Milestone */}
        <div className="flex items-center justify-between w-full text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.24em] text-[#A69988] uppercase mb-2.5">
          <span className="flex items-center gap-1.5 truncate text-[#C2B7A8]">
            <Sparkles size={11} className="text-[#D8B26E] flex-shrink-0 animate-spin" />
            <span className="truncate">{currentStage.text}</span>
          </span>
          <span className="font-mono text-[#D8B26E] ml-2 font-semibold flex-shrink-0">
            {currentStage.progress}%
          </span>
        </div>

        {/* Gold Bordered Precision Progress Track */}
        <div className="w-full h-[4px] bg-[#1A1612] border border-[#3A3226] rounded-full p-[1px] overflow-visible relative shadow-inner">
          <div
            className={`h-full progress-bar-shimmer progress-bar-head rounded-full transition-all duration-500 ease-out ${currentStage.progressClass}`}
          />
        </div>

        {/* Micro-Descriptor Badge */}
        <div className="flex items-center gap-2 mt-3 text-[8px] sm:text-[9px] tracking-[0.32em] text-[#82776A] uppercase font-sans">
          <span>18K Gold Vermeil</span>
          <span>·</span>
          <span>Ethical Diamonds</span>
          <span>·</span>
          <span>Jaipur & Milan</span>
        </div>
      </div>

      {/* 5. Luxury Skip Action */}
      <div className="mt-8">
        <button
          id="btn-skip-loader"
          onClick={handleSkip}
          aria-label="Enter the Maison directly"
          className="group text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-sans text-[#B3A696] hover:text-[#FFF5DC] transition-all py-2 px-5 rounded-full border border-[#3A3226] hover:border-[#D8B26E] hover:bg-[#D8B26E]/10 cursor-pointer flex items-center gap-2 shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        >
          <span>Enter The Maison</span>
          <span className="text-[#D8B26E] group-hover:translate-x-0.5 transition-transform">✦</span>
        </button>
      </div>
    </div>
  );
};
