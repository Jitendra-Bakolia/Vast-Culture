import React from 'react';
import { Home, Sparkles, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileBottomBar = ({
  currentPage,
  cartCount,
  wishlistCount,
  currentUser,
  isWishlistOpen,
  isCartOpen,
  onNavigateToHome,
  onNavigateToShop,
  onOpenWishlist,
  onOpenCart,
  onOpenAuth,
  onOpenProfile,
}) => {
  const isHomeActive = currentPage === 'home' && !isWishlistOpen && !isCartOpen;
  const isShopActive = currentPage === 'shop' && !isWishlistOpen && !isCartOpen;

  return (
    <nav
      id="mobile-bottom-bar"
      aria-label="Mobile Navigation"
      className="mobile-bottom-nav select-none"
    >
      {/* 1. Home Tab */}
      <button
        id="btn-mobile-tab-home"
        onClick={onNavigateToHome}
        aria-label="Home"
        className={`mobile-tab-btn tap-bounce ${isHomeActive ? 'active' : ''}`}
      >
        <Home size={20} strokeWidth={isHomeActive ? 2.2 : 1.6} />
        <span>Home</span>
      </button>

      {/* 2. Shop / Vault Tab */}
      <button
        id="btn-mobile-tab-shop"
        onClick={() => onNavigateToShop('All')}
        aria-label="Shop Vault"
        className={`mobile-tab-btn tap-bounce ${isShopActive ? 'active' : ''}`}
      >
        <Sparkles size={20} strokeWidth={isShopActive ? 2.2 : 1.6} />
        <span>Shop</span>
      </button>

      {/* 3. Wishlist Tab */}
      <button
        id="btn-mobile-tab-wishlist"
        onClick={onOpenWishlist}
        aria-label={`Wishlist (${wishlistCount} items)`}
        className={`mobile-tab-btn tap-bounce ${isWishlistOpen ? 'active' : ''}`}
      >
        <Heart size={20} strokeWidth={isWishlistOpen ? 2.2 : 1.6} fill={isWishlistOpen ? 'currentColor' : 'none'} />
        <span>Wishlist</span>
        {wishlistCount > 0 && (
          <span className="tab-badge badge-bounce-anim">{wishlistCount}</span>
        )}
      </button>

      {/* 4. Bag / Cart Tab */}
      <button
        id="btn-mobile-tab-cart"
        onClick={onOpenCart}
        aria-label={`Shopping Bag (${cartCount} items)`}
        className={`mobile-tab-btn tap-bounce ${isCartOpen ? 'active' : ''}`}
      >
        <ShoppingBag size={20} strokeWidth={isCartOpen ? 2.2 : 1.6} />
        <span>Bag</span>
        {cartCount > 0 && (
          <span className="tab-badge badge-bounce-anim">{cartCount}</span>
        )}
      </button>

      {/* 5. Account / Profile Tab */}
      <button
        id="btn-mobile-tab-account"
        onClick={currentUser ? onOpenProfile : () => onOpenAuth('login')}
        aria-label={currentUser ? `Account (${currentUser.name})` : 'Sign In'}
        className="mobile-tab-btn tap-bounce"
      >
        {currentUser && currentUser.avatar ? (
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
          <User size={20} strokeWidth={1.6} />
        )}
        <span>{currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}</span>
      </button>
    </nav>
  );
};
