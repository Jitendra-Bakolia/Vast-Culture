import React from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import logo from '../img/logo.png';

export const MobileHeader = ({
  cartCount,
  onOpenNav,
  onOpenCart,
  onOpenSearch,
  onOpenAuthModal,
  onOpenProfileModal,
  currentUser,
  onNavigateHome,
}) => {
  return (
    <header 
      id="mobile-header"
      className="w-full bg-[#0D0D0D] border-b border-[#23201B] text-[#FAF7F2] sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
    >
      {/* Left: Hamburger Menu */}
      <button
        id="btn-mobile-menu"
        onClick={onOpenNav}
        aria-label="Open navigation menu"
        className="text-[#E5DFD5] hover:text-[#D8B26E] p-1.5 -ml-1 transition-colors cursor-pointer"
      >
        <Menu size={22} strokeWidth={1.5} />
      </button>

      {/* Center: Brand Logo Lockup */}
      <div 
        id="brand-logo-mobile"
        onClick={onNavigateHome}
        className="cursor-pointer flex items-center gap-2.5 leading-none select-none py-0.5"
        role="button"
        tabIndex={0}
        aria-label="Vast Culture Home"
      >
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <img
            src={logo}
            alt="Vast Culture"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-[0_1px_6px_rgba(216,178,110,0.35)]"
          />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-cinzel-luxury text-[15px] sm:text-[17px] tracking-[0.24em] font-semibold text-[#F5E8D0]">
            VAST
          </span>
          <span className="font-cinzel-luxury text-[9px] sm:text-[10px] tracking-[0.42em] font-medium text-[#D8B26E] mt-0.5">
            CULTURE
          </span>
        </div>
      </div>

      {/* Right: User / Search & Shopping Bag */}
      <div className="flex items-center space-x-2 -mr-1">
        <button
          id="btn-mobile-search"
          onClick={onOpenSearch}
          aria-label="Search"
          className="text-[#E5DFD5] hover:text-[#D8B26E] p-1.5 transition-colors cursor-pointer"
        >
          <Search size={19} strokeWidth={1.5} />
        </button>

        {currentUser ? (
          <button
            id="btn-mobile-account"
            onClick={onOpenProfileModal}
            aria-label="Account"
            className="p-1 cursor-pointer"
          >
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                loading="lazy"
                decoding="async"
                width="20"
                height="20"
                className="w-5 h-5 rounded-full object-cover border border-[#D8B26E]"
              />
            ) : (
              <User size={19} className="text-[#E5DFD5]" strokeWidth={1.5} />
            )}
          </button>
        ) : (
          <button
            id="btn-mobile-account"
            onClick={() => onOpenAuthModal?.('general')}
            aria-label="Sign In"
            className="text-[#E5DFD5] hover:text-[#D8B26E] p-1.5 transition-colors cursor-pointer"
          >
            <User size={19} strokeWidth={1.5} />
          </button>
        )}

        <button
          id="btn-mobile-cart"
          onClick={onOpenCart}
          aria-label="Shopping Bag"
          className="text-[#E5DFD5] hover:text-[#D8B26E] p-1.5 relative transition-colors cursor-pointer"
        >
          <ShoppingBag size={19} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-[#D8B26E] text-[#0D0D0D] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
