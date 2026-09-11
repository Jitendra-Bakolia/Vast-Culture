import React from 'react';
import { Search, Heart, User, ShoppingBag } from 'lucide-react';

export const DesktopHeader = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenAuthModal,
  onOpenProfileModal,
  currentUser,
  onNavigate,
  onShopClick,
}) => {
  return (
    <header 
      id="desktop-header"
      className="w-full bg-[#0D0D0D] border-b border-[#23201B] text-[#FAF7F2] sticky top-0 z-40 px-8 py-4 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div 
          id="brand-logo-desktop"
          onClick={() => onNavigate?.('hero')}
          className="cursor-pointer group flex flex-col leading-none"
        >
          <span className="font-cinzel-luxury text-[20px] tracking-[0.32em] font-semibold text-[#D8B26E] group-hover:text-[#EBD5A0] transition-colors">
            VAST
          </span>
          <span className="font-cinzel-luxury text-[13px] tracking-[0.48em] font-medium text-[#C49E59] group-hover:text-[#EBD5A0] transition-colors -mt-0.5">
            CULTURE
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center space-x-9">
          {[
            { label: 'Home', action: () => onNavigate?.('hero') },
            { label: 'Collections', action: onShopClick || (() => onNavigate?.('bestsellers')) },
            { label: 'Shop', action: onShopClick || (() => onNavigate?.('bestsellers')) },
            { label: 'About Us', action: () => onNavigate?.('our-story') },
            { label: 'Contact', action: () => onNavigate?.('footer') },
          ].map((item) => (
            <button
              key={item.label}
              id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={item.action}
              className="text-[13px] tracking-[0.14em] uppercase font-sans text-[#E5DFD5] hover:text-[#D8B26E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D8B26E] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Utility Icons */}
        <div id="desktop-header-icons" className="flex items-center space-x-6">
          <button
            id="btn-desktop-search"
            onClick={onOpenSearch}
            aria-label="Search"
            className="text-[#E5DFD5] hover:text-[#D8B26E] transition-colors p-1 cursor-pointer"
          >
            <Search size={19} strokeWidth={1.5} />
          </button>

          <button
            id="btn-desktop-wishlist"
            onClick={onOpenWishlist}
            aria-label="Wishlist"
            className="text-[#E5DFD5] hover:text-[#D8B26E] transition-colors p-1 relative cursor-pointer"
          >
            <Heart size={19} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D8B26E] text-[#0D0D0D] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* User Profile / Sign in Button */}
          {currentUser ? (
            <button
              id="btn-desktop-account"
              aria-label="Account Profile"
              onClick={onOpenProfileModal}
              className="flex items-center gap-2 text-[#E5DFD5] hover:text-[#D8B26E] transition-colors p-1 cursor-pointer"
            >
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover border border-[#D8B26E]"
                />
              ) : (
                <User size={19} strokeWidth={1.5} />
              )}
              <span className="text-xs font-sans max-w-[80px] truncate hidden xl:inline">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              id="btn-desktop-account"
              aria-label="Sign In"
              onClick={() => onOpenAuthModal?.('general')}
              className="text-[#E5DFD5] hover:text-[#D8B26E] transition-colors p-1 cursor-pointer"
            >
              <User size={19} strokeWidth={1.5} />
            </button>
          )}

          <button
            id="btn-desktop-cart"
            onClick={onOpenCart}
            aria-label="Shopping Bag"
            className="text-[#E5DFD5] hover:text-[#D8B26E] transition-colors p-1 relative flex items-center cursor-pointer"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D8B26E] text-[#0D0D0D] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
