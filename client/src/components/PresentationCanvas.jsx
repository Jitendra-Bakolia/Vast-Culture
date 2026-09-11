import React, { useState } from 'react';
import { DesktopView } from './DesktopView';
import { MobileView } from './MobileView';
import { Monitor, Smartphone, ZoomIn, ZoomOut, Sparkles, Layers } from 'lucide-react';

export const PresentationCanvas = (props) => {
  const [zoomLevel, setZoomLevel] = useState(0.75); // 75% default for dual presentation

  const zoomOptions = [
    { label: '65%', value: 0.65 },
    { label: '75%', value: 0.75 },
    { label: '85%', value: 0.85 },
    { label: '100%', value: 1.0 },
  ];

  return (
    <div 
      id="presentation-canvas-workbench"
      className="w-full bg-[#0A0908] min-h-screen text-[#FAF7F2] flex flex-col items-center justify-start pb-24 select-none"
    >
      {/* Studio Presentation Header Bar */}
      <div className="w-full bg-[#141210] border-b border-[#2B261F] px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-14 z-30 shadow-xl backdrop-blur-md">
        {/* Brand System Tag */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D8B26E] animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel-luxury text-sm tracking-[0.25em] font-bold text-[#EBD5A0]">
                VAST CULTURE
              </span>
              <span className="text-[10px] bg-[#231F19] text-[#D8B26E] border border-[#D8B26E]/40 px-2 py-0.5 rounded-xs font-sans uppercase tracking-widest">
                Design System
              </span>
            </div>
            <p className="text-[11px] text-[#A69A89] font-sans">
              Side-by-Side Responsive Luxury UI Mockup Presentation
            </p>
          </div>
        </div>

        {/* Brand Palette Swatches */}
        <div className="hidden lg:flex items-center gap-2 bg-[#1A1815] px-3 py-1.5 border border-[#2D271F] rounded-xs">
          <span className="text-[10px] uppercase tracking-wider text-[#8A7F6E] font-sans mr-1">
            Palette:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-[#0A0908] border border-[#D8B26E]/40" title="Atelier Caviar Noir (#0A0908)" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#14120F] border border-[#262018]" title="Velvet Obsidian (#14120F)" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#D8B26E] border border-black/20" title="18K Solid Gold Vermeil (#D8B26E)" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FAF6EE] border border-[#D8B26E]/40" title="Royal Ivory (#FAF6EE)" />
          </div>
        </div>

        {/* Zoom & Artboard Scale Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#1A1815] border border-[#2D271F] p-1 rounded-xs">
            <ZoomOut size={13} className="text-[#8A7F6E] ml-1.5" />
            {zoomOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setZoomLevel(opt.value)}
                className={`px-2.5 py-1 text-[11px] font-sans font-medium rounded-xs transition-colors cursor-pointer ${
                  zoomLevel === opt.value
                    ? 'bg-[#D8B26E] text-black font-semibold shadow-xs'
                    : 'text-[#C7BBAA] hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
            <ZoomIn size={13} className="text-[#8A7F6E] mr-1.5" />
          </div>
        </div>
      </div>

      {/* Side-by-Side Artboards Container */}
      <div className="w-full overflow-x-auto px-4 sm:px-8 py-10 flex justify-center items-start">
        <div 
          className={`flex flex-col xl:flex-row items-start justify-center gap-12 lg:gap-16 transition-all duration-300 origin-top zoom-scale-${Math.round(zoomLevel * 100)}`}
        >
          {/* ========================================================= */}
          {/* ARTBOARD 1: DESKTOP EXPERIENCE (1200px / 1440px Canvas)   */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center">
            {/* Artboard Header Label */}
            <div className="w-full flex items-center justify-between pb-3 text-xs font-sans text-[#A89C8C] px-1">
              <div className="flex items-center gap-2">
                <Monitor size={16} className="text-[#D8B26E]" />
                <span className="font-semibold tracking-[0.14em] uppercase text-[#EBD5A0]">
                  Desktop Showcase Artboard
                </span>
                <span className="text-[10px] bg-[#1F1C18] border border-[#3A3328] text-[#C4B7A6] px-2 py-0.5 rounded-xs">
                  1280 × Dynamic Viewport
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#7A7061]">
                <Sparkles size={12} className="text-[#D8B26E]" />
                <span>Editorial Quiet Luxury</span>
              </div>
            </div>

            {/* Desktop Browser Chassis Frame */}
            <div className="w-[1240px] bg-[#141210] border border-[#3D3528] rounded-t-lg desktop-frame-shadow overflow-hidden">
              {/* Browser Window Bar */}
              <div className="bg-[#1A1815] border-b border-[#2D271F] px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E05D52]" />
                  <div className="w-3 h-3 rounded-full bg-[#E5B542]" />
                  <div className="w-3 h-3 rounded-full bg-[#57C262]" />
                </div>
                <div className="bg-[#0F0E0D] border border-[#2B261E] rounded-xs px-24 py-1 text-[11px] font-sans text-[#8C8070] flex items-center gap-2">
                  <span className="text-[#D8B26E]">🔒</span>
                  <span>vastculture.com/jewellery-collection</span>
                </div>
                <div className="text-[11px] text-[#7A7061] font-sans">
                  Desktop 100% Scale
                </div>
              </div>

              {/* Desktop App Render View */}
              <div className="max-h-[920px] overflow-y-auto bg-[#0D0D0D]">
                <DesktopView
                  cartCount={props.cartCount}
                  wishlistIds={props.wishlistIds}
                  showAnnouncement={props.showAnnouncement}
                  onCloseAnnouncement={props.onCloseAnnouncement}
                  onOpenCart={props.onOpenCart}
                  onOpenSearch={props.onOpenSearch}
                  onOpenWishlist={props.onOpenWishlist}
                  onOpenAuthModal={props.onOpenAuthModal}
                  onOpenProfileModal={props.onOpenProfileModal}
                  currentUser={props.currentUser}
                  onToggleWishlist={props.onToggleWishlist}
                  onAddToCart={props.onAddToCart}
                  onBuyNow={props.onBuyNow}
                  onQuickView={props.onQuickView}
                  onViewAllCollections={props.onViewAllCollections}
                  onNavigate={props.onNavigate}
                />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* ARTBOARD 2: MOBILE EXPERIENCE (Dedicated 390px Redesign)   */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center">
            {/* Artboard Header Label */}
            <div className="w-full flex items-center justify-between pb-3 text-xs font-sans text-[#A89C8C] px-1">
              <div className="flex items-center gap-2">
                <Smartphone size={16} className="text-[#D8B26E]" />
                <span className="font-semibold tracking-[0.14em] uppercase text-[#EBD5A0]">
                  Mobile Responsive Screen
                </span>
                <span className="text-[10px] bg-[#1F1C18] border border-[#3A3328] text-[#C4B7A6] px-2 py-0.5 rounded-xs">
                  390 × 844 px
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#7A7061]">
                <Layers size={12} className="text-[#D8B26E]" />
                <span>Dedicated Mobile Architecture</span>
              </div>
            </div>

            {/* Mobile Device Chassis (iPhone Frame) */}
            <div className="w-[390px] bg-[#1A1815] border-[7px] border-[#2B2720] rounded-[48px] mobile-frame-shadow overflow-hidden relative">
              {/* Dynamic Island / Notch */}
              <div className="bg-[#0D0D0D] pt-3 pb-1 px-6 flex items-center justify-between text-[11px] font-sans text-white border-b border-[#23201B]/50">
                <span className="font-semibold">9:41</span>
                <div className="w-24 h-4 bg-black rounded-full border border-white/10 mx-auto" />
                <div className="flex items-center gap-1 text-[10px]">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Mobile App Render View */}
              <div className="h-[800px] overflow-y-auto bg-[#0D0D0D] scroll-smooth">
                <MobileView
                  cartCount={props.cartCount}
                  wishlistIds={props.wishlistIds}
                  showAnnouncement={props.showAnnouncement}
                  onCloseAnnouncement={props.onCloseAnnouncement}
                  onOpenNav={props.onOpenMobileNav}
                  onOpenCart={props.onOpenCart}
                  onOpenSearch={props.onOpenSearch}
                  onOpenAuthModal={props.onOpenAuthModal}
                  onOpenProfileModal={props.onOpenProfileModal}
                  currentUser={props.currentUser}
                  onToggleWishlist={props.onToggleWishlist}
                  onAddToCart={props.onAddToCart}
                  onBuyNow={props.onBuyNow}
                  onQuickView={props.onQuickView}
                  onViewAllCollections={props.onViewAllCollections}
                  onNavigateHome={() => {
                    const el = document.getElementById('vast-culture-mobile-app');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>

              {/* iPhone Home Indicator */}
              <div className="bg-[#0D0D0D] py-2 flex justify-center border-t border-[#1C1A17]">
                <div className="w-32 h-1 bg-[#FAF7F2]/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
