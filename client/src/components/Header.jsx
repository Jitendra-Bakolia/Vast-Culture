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
      className="w-full bg-[#0D0D0D] border-b border-[#23201B] text-[#FAF7F2] sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Left: Hamburger Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            id="btn-mobile-menu"
            onClick={onOpenMobileNav}
            aria-label="Open navigation menu"
            className="text-[#E5DFD5] hover:text-[#D8B26E] p-1.5 -ml-1.5 transition-colors cursor-pointer"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Brand Logo (Clicking logo always redirects to Home Page) */}
        {/* <div 
          id="brand-logo"
          onClick={onNavigateToHome}
          className="cursor-pointer group flex flex-col leading-none select-none text-center md:text-left"
        >
          <span className="font-cinzel-luxury text-[17px] sm:text-[19px] md:text-[21px] tracking-[0.32em] font-semibold text-[#D8B26E] group-hover:text-[#EBD5A0] transition-colors">
            VAST
          </span>
          <span className="font-cinzel-luxury text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.48em] font-medium text-[#C49E59] group-hover:text-[#EBD5A0] transition-colors -mt-0.5">
            CULTURE
          </span>
        </div> */}

        <div
          id="brand-logo"
          onClick={onNavigateToHome}
          className="cursor-pointer group flex items-center select-none"
        >
          <img
            src={logo}
            alt="Vast Culture"
            className="
      w-[75px] sm:w-[85px] md:w-[95px]
      h-auto
      object-contain
      brightness-90
      contrast-125
      saturate-125
      transition-all
      duration-300
      group-hover:brightness-105
      group-hover:contrast-125
      group-hover:scale-105
    "
          />
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center space-x-7 lg:space-x-9">
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
            onClick={() => onNavigateToShop()}
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

          {/* Collections Shortcut */}
          <button
            id="nav-link-collections"
            onClick={() => onNavigateToShop()}
            className="text-xs lg:text-[13px] tracking-[0.14em] uppercase font-sans text-[#E5DFD5] hover:text-[#D8B26E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D8B26E] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            Collections
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
              <span className="absolute -top-0.5 -right-0.5 bg-[#D8B26E] text-[#0D0D0D] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
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
                  className="w-6 h-6 rounded-full object-cover border border-[#D8B26E]"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#26211A] border border-[#D8B26E] text-[#EBD5A0] text-[10px] font-bold flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
              )}
              <span className="hidden lg:inline-block text-xs font-sans font-medium text-[#EBD5A0] max-w-[90px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              id="btn-account-login"
              onClick={() => onOpenAuth('login')}
              aria-label="Sign In / Register"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-[#3D3528] bg-[#141210] hover:border-[#D8B26E] text-[#EBD5A0] hover:text-white transition-all text-xs font-sans uppercase tracking-wider cursor-pointer"
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
              <span className="absolute -top-0.5 -right-0.5 bg-[#D8B26E] text-[#0D0D0D] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
