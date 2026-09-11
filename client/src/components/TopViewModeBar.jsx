import React from 'react';
import { Columns2, Monitor, Smartphone, Maximize, Sparkles } from 'lucide-react';

export const TopViewModeBar = ({
  currentMode,
  onChangeMode,
}) => {
  return (
    <div 
      id="top-view-mode-bar"
      className="w-full bg-[#171513] border-b border-[#2D2821] text-[#FAF7F2] px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-md backdrop-blur-md"
    >
      {/* Brand & Project Info */}
      <div className="flex items-center gap-2.5">
        <span className="font-cinzel-luxury text-xs tracking-[0.2em] font-semibold text-[#D8B26E]">
          VAST CULTURE
        </span>
        <span className="hidden sm:inline-block text-[#5C5346]">|</span>
        <span className="hidden sm:inline-block text-[11px] text-[#C4B7A6] font-sans">
          Luxury Jewellery UI Mockup & Design System
        </span>
      </div>

      {/* View Mode Switcher Pills */}
      <div className="flex items-center bg-[#0D0D0D] border border-[#2B261E] p-1 rounded-sm">
        <button
          id="btn-mode-showcase"
          onClick={() => onChangeMode('showcase')}
          className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-sans tracking-wider uppercase transition-all rounded-xs cursor-pointer ${
            currentMode === 'showcase'
              ? 'bg-[#D8B26E] text-[#0D0D0D] font-semibold shadow-xs'
              : 'text-[#B5ABA0] hover:text-white'
          }`}
          title="Side-by-Side Dual Mockup (Desktop + Mobile Presentation)"
        >
          <Columns2 size={13} />
          <span className="hidden sm:inline">Dual Showcase</span>
          <span className="sm:hidden">Dual</span>
        </button>

        <button
          id="btn-mode-desktop"
          onClick={() => onChangeMode('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-sans tracking-wider uppercase transition-all rounded-xs cursor-pointer ${
            currentMode === 'desktop'
              ? 'bg-[#D8B26E] text-[#0D0D0D] font-semibold shadow-xs'
              : 'text-[#B5ABA0] hover:text-white'
          }`}
          title="Full Desktop View"
        >
          <Monitor size={13} />
          <span>Desktop</span>
        </button>

        <button
          id="btn-mode-mobile"
          onClick={() => onChangeMode('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-sans tracking-wider uppercase transition-all rounded-xs cursor-pointer ${
            currentMode === 'mobile'
              ? 'bg-[#D8B26E] text-[#0D0D0D] font-semibold shadow-xs'
              : 'text-[#B5ABA0] hover:text-white'
          }`}
          title="Mobile Device View"
        >
          <Smartphone size={13} />
          <span>Mobile</span>
        </button>

        <button
          id="btn-mode-responsive"
          onClick={() => onChangeMode('responsive')}
          className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-sans tracking-wider uppercase transition-all rounded-xs cursor-pointer ${
            currentMode === 'responsive'
              ? 'bg-[#D8B26E] text-[#0D0D0D] font-semibold shadow-xs'
              : 'text-[#B5ABA0] hover:text-white'
          }`}
          title="Fluid Responsive Mode"
        >
          <Maximize size={13} />
          <span className="hidden md:inline">Fluid</span>
        </button>
      </div>

      {/* Luxury Quality Tag */}
      <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#A69A89] font-sans">
        <Sparkles size={12} className="text-[#D8B26E]" />
        <span>18k Gold & Freshwater Pearl</span>
      </div>
    </div>
  );
};
