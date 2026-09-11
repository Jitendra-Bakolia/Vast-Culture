import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronRight,
  Heart,
  Sparkles,
  Phone,
  Mail,
  LogOut,
  ShoppingBag,
  Search,
  Home,
  ShieldCheck,
  Gift
} from 'lucide-react';
import logo from '../img/logo.png';

export const MobileNavDrawer = ({
  isOpen,
  onClose,
  onNavigateSection,
  onNavigateToHome,
  onNavigateToShop,
  wishlistCount = 0,
  onOpenWishlist,
  cartCount = 0,
  onOpenCart,
  onOpenSearch,
  currentUser,
  onOpenAuth,
  onOpenProfile,
  onLogout,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  // Sync rendered state with smooth delayed unmount on close
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else if (isRendered) {
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  // Close on Escape key press and manage background body scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('overflow-hidden');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const shouldRender = isOpen || isRendered;
  const isExiting = isRendered && !isOpen;

  if (!shouldRender) return null;

  return (
    <div
      id="mobile-nav-backdrop"
      onClick={isExiting ? undefined : onClose}
      className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex justify-start ${
        isExiting ? 'drawer-fade-out pointer-events-none' : 'drawer-fade-in'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Mobile Navigation Menu"
    >
      <aside
        id="mobile-nav-panel"
        onClick={(e) => e.stopPropagation()}
        className={`w-[85%] max-w-xs bg-[#0E0D0C] border-r border-[#2B2721] h-full flex flex-col justify-between text-[#FAF7F2] p-5 sm:p-6 overflow-y-auto shadow-2xl relative ${
          isExiting ? 'drawer-slide-out-left pointer-events-none' : 'drawer-slide-in-left'
        }`}
      >
        {/* Top Section */}
        <div>
          {/* Header Lockup & Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-[#23201B]">
            <div
              onClick={() => {
                onNavigateToHome();
                onClose();
              }}
              className="flex items-center gap-2.5 leading-none cursor-pointer group select-none"
              role="button"
              tabIndex={0}
              aria-label="Navigate to home"
            >
              <div className="relative flex-shrink-0 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Vast Culture"
                  className="w-8 h-8 object-contain drop-shadow-[0_1px_6px_rgba(216,178,110,0.35)] group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-cinzel-luxury text-[15px] tracking-[0.24em] font-semibold text-[#F5E8D0] group-hover:text-white transition-colors">
                  VAST
                </span>
                <span className="font-cinzel-luxury text-[8.5px] tracking-[0.42em] font-medium text-[#D8B26E] mt-0.5">
                  CULTURE
                </span>
              </div>
            </div>

            <button
              id="btn-close-mobile-nav"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="text-[#9E9486] hover:text-[#D8B26E] p-1.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer tap-bounce"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Account / Profile Area */}
          <div className="py-4 border-b border-[#23201B]">
            {currentUser ? (
              <div className="bg-[#181614] border border-[#2F2921] p-3 rounded-xs flex items-center justify-between">
                <div
                  onClick={() => {
                    onClose();
                    onOpenProfile?.();
                  }}
                  className="flex items-center gap-2.5 cursor-pointer min-w-0"
                  role="button"
                  tabIndex={0}
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      loading="lazy"
                      decoding="async"
                      width="36"
                      height="36"
                      className="w-9 h-9 rounded-full object-cover border border-[#D8B26E] shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#26211A] text-[#D8B26E] font-bold text-xs flex items-center justify-center border border-[#D8B26E] shrink-0">
                      {currentUser.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-[#EBD5A0] truncate">
                      {currentUser.name}
                    </h4>
                    <span className="text-[10px] text-[#8C8273] truncate block">
                      {currentUser.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  aria-label="Sign out"
                  className="text-[#8C8273] hover:text-[#D97777] p-1.5 transition-colors cursor-pointer tap-bounce"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="btn-drawer-signin"
                  onClick={() => {
                    onClose();
                    onOpenAuth?.('login');
                  }}
                  className="py-2 px-3 bg-[#D8B26E] hover:bg-[#EBD5A0] text-black text-xs font-sans font-semibold uppercase tracking-wider rounded-xs text-center transition-colors cursor-pointer tap-bounce shadow-xs"
                >
                  Sign In
                </button>
                <button
                  id="btn-drawer-register"
                  onClick={() => {
                    onClose();
                    onOpenAuth?.('register');
                  }}
                  className="py-2 px-3 bg-[#1A1815] border border-[#3D3528] hover:border-[#D8B26E] text-[#EBD5A0] text-xs font-sans uppercase tracking-wider rounded-xs text-center transition-colors cursor-pointer tap-bounce"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Quick Search Action */}
          {onOpenSearch && (
            <div className="pt-3 pb-1">
              <button
                id="btn-drawer-search"
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 bg-[#161412] border border-[#2B2620] hover:border-[#D8B26E]/50 rounded-xs text-[#9E9382] hover:text-[#FAF6EE] text-xs font-sans transition-colors cursor-pointer text-left"
              >
                <Search size={14} className="text-[#D8B26E] shrink-0" />
                <span className="truncate">Search Jewels & Collections...</span>
              </button>
            </div>
          )}

          {/* All Options: Navigation Links */}
          <nav aria-label="Mobile Drawer Navigation" className="py-3 space-y-1">
            {/* Home */}
            <button
              onClick={() => {
                onNavigateToHome();
                onClose();
              }}
              className="w-full flex items-center justify-between py-2.5 text-left font-sans text-xs tracking-[0.16em] uppercase text-[#E5DFD5] hover:text-[#D8B26E] transition-colors border-b border-[#1A1815] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Home size={13} className="text-[#D8B26E]/70" />
                <span>Home</span>
              </span>
              <ChevronRight size={13} className="text-[#696155]" />
            </button>

            {/* Shop (All Collections Vault) */}
            <button
              onClick={() => {
                onNavigateToShop?.('All');
                onClose();
              }}
              className="w-full flex items-center justify-between py-2.5 text-left font-sans text-xs tracking-[0.16em] uppercase text-[#D8B26E] hover:text-[#EBD5A0] transition-colors border-b border-[#1A1815] cursor-pointer font-medium"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-[#D8B26E]" />
                <span>Shop All Collections</span>
                <span className="bg-[#D8B26E] text-black text-[8px] font-bold px-1.5 py-0.25 rounded-xs tracking-widest">
                  VAULT
                </span>
              </div>
              <ChevronRight size={13} className="text-[#D8B26E]" />
            </button>

            {/* Subcategories Shortcuts */}
            <div className="pl-5 py-1.5 space-y-1 border-b border-[#1A1815] bg-[#12100E]/50 rounded-xs">
              {['Earrings', 'Necklaces', 'Bracelets', 'Rings'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onNavigateToShop?.(cat);
                    onClose();
                  }}
                  className="w-full text-left font-sans text-[11px] text-[#A69C8E] hover:text-[#D8B26E] transition-colors py-1 flex items-center justify-between cursor-pointer pr-2"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#D8B26E]/50 text-[9px]">✦</span>
                    <span>{cat}</span>
                  </span>
                  <span className="text-[9px] text-[#696155]">View →</span>
                </button>
              ))}
            </div>

            {/* About Us / Our Story */}
            <button
              onClick={() => {
                onNavigateSection?.('our-story');
                onClose();
              }}
              className="w-full flex items-center justify-between py-2.5 text-left font-sans text-xs tracking-[0.16em] uppercase text-[#E5DFD5] hover:text-[#D8B26E] transition-colors border-b border-[#1A1815] cursor-pointer"
            >
              <span>About Us</span>
              <ChevronRight size={13} className="text-[#696155]" />
            </button>

            {/* Customer Reviews */}
            <button
              onClick={() => {
                onNavigateSection?.('customer-reviews');
                onClose();
              }}
              className="w-full flex items-center justify-between py-2.5 text-left font-sans text-xs tracking-[0.16em] uppercase text-[#E5DFD5] hover:text-[#D8B26E] transition-colors border-b border-[#1A1815] cursor-pointer"
            >
              <span>Customer Reviews</span>
              <ChevronRight size={13} className="text-[#696155]" />
            </button>

            {/* Contact */}
            <button
              onClick={() => {
                onNavigateSection?.('footer');
                onClose();
              }}
              className="w-full flex items-center justify-between py-2.5 text-left font-sans text-xs tracking-[0.16em] uppercase text-[#E5DFD5] hover:text-[#D8B26E] transition-colors border-b border-[#1A1815] cursor-pointer"
            >
              <span>Contact</span>
              <ChevronRight size={13} className="text-[#696155]" />
            </button>
          </nav>

          {/* Quick Bag & Wishlist Action Pills */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {/* Quick Bag Button */}
            {onOpenCart && (
              <button
                id="btn-drawer-cart"
                onClick={() => {
                  onClose();
                  onOpenCart();
                }}
                className="py-2 px-2.5 bg-[#171512] border border-[#2E2922] hover:border-[#D8B26E] flex items-center justify-between text-[11px] font-sans text-[#EBD5A0] transition-colors cursor-pointer rounded-xs tap-bounce"
              >
                <span className="flex items-center gap-1.5 truncate">
                  <ShoppingBag size={13} className="text-[#D8B26E] shrink-0" />
                  <span className="truncate">Bag</span>
                </span>
                <span className="bg-[#D8B26E] text-black text-[9px] font-bold px-1.5 py-0.25 rounded-full shrink-0">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Quick Wishlist Button */}
            {onOpenWishlist && (
              <button
                id="btn-drawer-wishlist"
                onClick={() => {
                  onClose();
                  onOpenWishlist();
                }}
                className="py-2 px-2.5 bg-[#171512] border border-[#2E2922] hover:border-[#D8B26E] flex items-center justify-between text-[11px] font-sans text-[#EBD5A0] transition-colors cursor-pointer rounded-xs tap-bounce"
              >
                <span className="flex items-center gap-1.5 truncate">
                  <Heart size={13} className="text-[#D8B26E] shrink-0" />
                  <span className="truncate">Wishlist</span>
                </span>
                <span className="bg-[#D8B26E] text-black text-[9px] font-bold px-1.5 py-0.25 rounded-full shrink-0">
                  {wishlistCount}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Concierge & Atelier Guarantee */}
        <div className="pt-4 border-t border-[#23201B] text-xs font-sans text-[#8A8174] space-y-2 mt-4">
          <div className="flex items-center gap-2 text-[#C4B7A6]">
            <ShieldCheck size={13} className="text-[#D8B26E]" />
            <span className="text-[10px] tracking-wider uppercase font-medium">100% Certified Heirloom Pieces</span>
          </div>

          <div className="bg-[#141210] p-2.5 rounded-xs border border-[#24201A] space-y-1">
            <div className="flex items-center gap-2 text-[10px] text-[#C4B7A6] font-medium uppercase tracking-wider">
              <Sparkles size={11} className="text-[#D8B26E]" />
              <span>Atelier Concierge</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#D8B26E]">
              <Phone size={11} />
              <span>+91 98110 54321</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#D8B26E]">
              <Mail size={11} />
              <span>care@vastculture.com</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
