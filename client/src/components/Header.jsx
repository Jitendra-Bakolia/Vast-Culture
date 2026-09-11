import React from 'react';
import { Search, Heart, User as UserIcon, ShoppingBag, Menu } from 'lucide-react';
import logo from "../../src/img/logo.png";
// import logo2 from "../../src/img/logo2.png";

export const Header = ({
  cartCount,
  wishlistCount,
  currentUser,
  currentPage,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenMobileNav,
  onOpenAuth,
  onOpenProfile,
  onNavigateToHome,
  onNavigateToShop,
  onNavigateSection,
}) => {
  return (
    <header
      id="main-header"
      className="w-full max-w-full overflow-hidden bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#23201B]/80 text-[#FAF7F2] sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Left: Hamburger Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            id="btn-mobile-menu"
            onClick={onOpenMobileNav}
            aria-label="Open navigation menu"
            className="text-[#E5DFD5] hover:text-[#D8B26E] p-1.5 transition-colors cursor-pointer"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Brand Logo Lockup: Authentic Maison Emblem + Sculpted Typography */}
        <div
          id="brand-logo"
          onClick={onNavigateToHome}
          className="cursor-pointer group flex items-center gap-2.5 sm:gap-3 select-none py-0.5"
          role="button"
          tabIndex={0}
          aria-label="Vast Culture Home"
        >
          {/* Authentic Brand Emblem with Golden Aura */}
          <div className="relative flex-shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#D8B26E]/20 blur-sm scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />
            <img
              src={logo}
              alt="Vast Culture"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="
                relative z-10
                w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11
                object-contain
                drop-shadow-[0_1px_6px_rgba(216,178,110,0.35)]
                group-hover:drop-shadow-[0_2px_12px_rgba(216,178,110,0.6)]
                group-hover:scale-105
                transition-all duration-300
              "
            />
          </div>

          {/* Haute Joaillerie Typography */}
          <div className="flex flex-col leading-none">
            <span className="font-cinzel-luxury text-[15px] sm:text-[17px] md:text-[19px] tracking-[0.24em] font-semibold text-[#F5E8D0] group-hover:text-white transition-colors duration-300">
              VAST
            </span>
            <span className="font-cinzel-luxury text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.44em] font-medium text-[#D8B26E] group-hover:text-[#F3D79B] transition-colors duration-300 mt-0.5">
              CULTURE
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {/* Home Tab */}
          <button
            id="nav-link-home"
            onClick={onNavigateToHome}
            className={`text-xs lg:text-[13px] tracking-[0.14em] uppercase font-sans transition-colors relative py-1 cursor-pointer ${currentPage === 'home'
              ? 'text-[#D8B26E] font-semibold after:w-full'
              : 'text-[#E5DFD5] hover:text-[#D8B26E]'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#D8B26E] hover:after:w-full after:transition-all after:duration-300`}
          >
            Home
          </button>

          {/* Shop / All Collections Tab (Redirects to dedicated Shop Page) */}
          <button
            id="nav-link-shop"
            onClick={() => onNavigateToShop('All')}
            className={`text-xs lg:text-[13px] tracking-[0.14em] uppercase font-sans transition-colors relative py-1 cursor-pointer ${currentPage === 'shop'
              ? 'text-[#D8B26E] font-semibold after:w-full'
              : 'text-[#E5DFD5] hover:text-[#D8B26E]'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#D8B26E] hover:after:w-full after:transition-all after:duration-300 flex items-center gap-1.5`}
          >
            <span>Shop</span>
            <span className="bg-[#D8B26E]/20 text-[#EBD5A0] text-[9px] px-1.5 py-0.2 rounded-xs border border-[#D8B26E]/40">
              Vault
            </span>
          </button>

          {/* About Us */}
          <button
            id="nav-link-about-us"
            onClick={() => onNavigateSection('our-story')}
            className="text-xs lg:text-[13px] tracking-[0.14em] uppercase font-sans text-[#E5DFD5] hover:text-[#D8B26E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D8B26E] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            About Us
          </button>

          {/* Reviews */}
          <button
            id="nav-link-reviews"
            onClick={() => onNavigateSection('customer-reviews')}
            className="text-xs lg:text-[13px] tracking-[0.14em] uppercase font-sans text-[#E5DFD5] hover:text-[#D8B26E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D8B26E] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            Reviews
          </button>

          {/* Contact */}
          <button
            id="nav-link-contact"
            onClick={() => onNavigateSection('footer')}
            className="text-xs lg:text-[13px] tracking-[0.14em] uppercase font-sans text-[#E5DFD5] hover:text-[#D8B26E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D8B26E] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right: Utility Icons & Auth Controls */}
        <div id="header-actions" className="flex items-center space-x-2 sm:space-x-4 lg:space-x-5">
          {/* Search Button */}
          <button
            id="btn-search"
            onClick={onOpenSearch}
            aria-label="Search collection"
            className="text-[#E5DFD5] hover:text-[#D8B26E] transition-colors p-1.5 cursor-pointer"
          >
            <Search size={19} strokeWidth={1.5} />
          </button>

          {/* Wishlist Button */}
          <button
            id="btn-wishlist"
            onClick={onOpenWishlist}
            aria-label="View wishlist"
            className="hidden sm:flex text-[#E5DFD5] hover:text-[#D8B26E] transition-colors p-1.5 relative cursor-pointer"
          >
            <Heart size={19} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D8B26E] text-[#0D0D0D] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center badge-bounce-anim">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account / Auth Button */}
          {currentUser ? (
            <button
              id="btn-account-profile"
              onClick={onOpenProfile}
              aria-label={`Logged in as ${currentUser.name}`}
              className="flex items-center gap-2 text-[#E5DFD5] hover:text-[#D8B26E] transition-colors p-1 cursor-pointer group"
            >
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  loading="lazy"
                  decoding="async"
                  width="24"
                  height="24"
                  className="w-6 h-6 rounded-full object-cover border border-[#D8B26E]"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#26211A] border border-[#D8B26E] text-[#EBD5A0] text-[10px] font-bold flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
              )}
              <span className="text-xs font-sans max-w-[85px] truncate hidden xl:inline">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              id="btn-account-login"
              onClick={() => onOpenAuth('login')}
              aria-label="Sign In / Register"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-[#3D3528] bg-[#141210] text-[#EBD5A0] text-[11px] font-sans uppercase tracking-wider cursor-pointer luxury-outline-btn"
            >
              <UserIcon size={14} className="text-[#D8B26E]" />
              <span>Sign In</span>
            </button>
          )}

          {/* Shopping Bag Button (Always visible) */}
          <button
            id="btn-cart"
            onClick={onOpenCart}
            aria-label="Shopping Bag"
            className="text-[#E5DFD5] hover:text-[#D8B26E] transition-colors p-1.5 relative flex items-center cursor-pointer"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D8B26E] text-[#0D0D0D] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center badge-bounce-anim">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
