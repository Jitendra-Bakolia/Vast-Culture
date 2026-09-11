import React, { useState, useEffect } from 'react';
import { BESTSELLER_PRODUCTS } from './data/mockData';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OurStorySection } from './components/OurStorySection';
import { ServicesSection } from './components/ServicesSection';
import { BestsellersSection } from './components/BestsellersSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { MobileNavDrawer } from './components/MobileNavDrawer';
import { CollectionsModal } from './components/CollectionsModal';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthPage } from './components/AuthPage';
import { UserProfileModal } from './components/UserProfileModal';
import { ShopPage } from './components/ShopPage';
import { MobileBottomBar } from './components/MobileBottomBar';
import { MainLoader } from './components/MainLoader';
import { CheckCircle } from 'lucide-react';

export default function App() {
  // Current Page State: 'home' | 'shop' | 'auth'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('login') || hash.includes('register') || hash.includes('auth')) {
      return 'auth';
    }
    if (hash.includes('shop') || hash.includes('collections')) {
      return 'shop';
    }
    return 'home';
  });

  const [shopCategory, setShopCategory] = useState('All');

  // Main App Initial Luxury Loader State
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Announcement bar visibility
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vast_culture_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authIntent, setAuthIntent] = useState('general');
  const [authInitialMode, setAuthInitialMode] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('register')) return 'register';
    return 'login';
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [pendingBuyItem, setPendingBuyItem] = useState(null);

  // Cart state - initialized with 1 item for immediate badge and drawer responsiveness
  const [cartItems, setCartItems] = useState([
    { product: BESTSELLER_PRODUCTS[0], quantity: 1 },
  ]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState([
    BESTSELLER_PRODUCTS[3].id,
  ]);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync with browser hash / back-forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('register')) {
        setCurrentPage('auth');
        setAuthInitialMode('register');
      } else if (hash.includes('login') || hash.includes('auth')) {
        setCurrentPage('auth');
        setAuthInitialMode('login');
      } else if (hash.includes('shop') || hash.includes('collections')) {
        setCurrentPage('shop');
        if (hash.includes('earrings')) setShopCategory('Earrings');
        else if (hash.includes('necklaces')) setShopCategory('Necklaces');
        else if (hash.includes('bracelets')) setShopCategory('Bracelets');
        else if (hash.includes('rings')) setShopCategory('Rings');
        else setShopCategory('All');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation functions
  const handleNavigateToHome = () => {
    setCurrentPage('home');
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToShop = (category = 'All') => {
    setShopCategory(category);
    setCurrentPage('shop');
    window.location.hash = category !== 'All' ? `#shop-${category.toLowerCase()}` : '#shop';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(category !== 'All' ? `Browsing ${category} Collection` : 'All Collections Vault');
  };

  const handleNavigateToAuth = (mode = 'login', intent = 'general') => {
    setAuthIntent(intent);
    setAuthInitialMode(mode);
    setCurrentPage('auth');
    window.location.hash = mode === 'register' ? '#register' : '#login';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section navigation (scrolling)
  const handleNavigateSection = (sectionId) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = `#${sectionId}`;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Login handler
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('vast_culture_user', JSON.stringify(user));
    } catch {
      // ignore
    }

    if (authIntent === 'checkout') {
      setCurrentPage('home');
      window.location.hash = '#home';
      setIsCheckoutOpen(true);
      showToast(`Welcome ${user.name}! Proceeding to secure checkout.`);
    } else if (authIntent === 'buy-now' && pendingBuyItem) {
      handleAddToCart(pendingBuyItem.product, pendingBuyItem.quantity);
      setPendingBuyItem(null);
      setCurrentPage('home');
      window.location.hash = '#home';
      setIsCheckoutOpen(true);
      showToast(`Welcome ${user.name}! Proceeding to instant checkout.`);
    } else {
      handleNavigateToHome();
      showToast(`Welcome ${user.name}! You are now signed in.`);
    }

    setAuthIntent('general');
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('vast_culture_user');
    } catch {
      // ignore
    }
    showToast('You have signed out successfully.');
  };

  // Checkout gate handler: User MUST be logged in to proceed to checkout
  const handleInitiateCheckout = () => {
    if (!currentUser) {
      setIsCartOpen(false);
      handleNavigateToAuth('login', 'checkout');
    } else {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    }
  };

  // Buy Now gate handler: User MUST be logged in to Buy Now
  const handleBuyNow = (product, quantity = 1) => {
    if (!currentUser) {
      setPendingBuyItem({ product, quantity });
      setQuickViewProduct(null);
      handleNavigateToAuth('login', 'buy-now');
    } else {
      handleAddToCart(product, quantity);
      setQuickViewProduct(null);
      setIsCheckoutOpen(true);
    }
  };

  // Cart Handlers
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to shopping bag`);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from bag');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveWishlist = (product) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
    showToast('Removed from wishlist');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#0D0D0D] text-[#FAF6EE] relative selection:bg-[#D8B26E] selection:text-black has-mobile-bottom-bar">
      {/* 0. MAIN LUXURY PRELOADER & SPLASH SCREEN */}
      <MainLoader
        isLoading={isInitialLoading}
        onFinish={() => setIsInitialLoading(false)}
        minDuration={2200}
      />

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <AnnouncementBar
        visible={showAnnouncement}
        onClose={() => setShowAnnouncement(false)}
      />

      {/* 2. ADAPTIVE RESPONSIVE NAVIGATION BAR */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        currentUser={currentUser}
        currentPage={currentPage}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        onOpenAuth={(mode = 'login') => handleNavigateToAuth(mode, 'general')}
        onOpenProfile={() => setIsProfileOpen(true)}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToShop={handleNavigateToShop}
        onNavigateSection={handleNavigateSection}
      />

      {/* 3. DYNAMIC PAGE ROUTER: EITHER SHOP / ALL COLLECTIONS VAULT, AUTH PAGE, OR HOME LUXURY PAGE */}
      {currentPage === 'shop' ? (
        <main id="main-content-shop" className="w-full max-w-full overflow-x-hidden">
          <ShopPage
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onQuickView={(p) => setQuickViewProduct(p)}
            onNavigateToHome={handleNavigateToHome}
            initialCategory={shopCategory}
          />
        </main>
      ) : currentPage === 'auth' ? (
        <main id="main-content-auth" className="w-full max-w-full overflow-x-hidden">
          <AuthPage
            initialMode={authInitialMode}
            intent={authIntent}
            onLoginSuccess={handleLoginSuccess}
            onNavigateToHome={handleNavigateToHome}
            onNavigateToShop={handleNavigateToShop}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        </main>
      ) : (
        <main id="main-content-home" className="w-full max-w-full overflow-x-hidden">
          {/* A. HERO SHOWCASE WITH DYNAMIC SLIDER & CURATED SETS */}
          <HeroSection
            onShopClick={() => handleNavigateToShop('All')}
            onExploreClick={() => handleNavigateSection('our-story')}
          />

          {/* B. OUR STORY & BRAND PHILOSOPHY */}
          <OurStorySection />

          {/* C. WHY CHOOSE VAST CULTURE - SERVICES & ASSURANCES */}
          <ServicesSection />

          {/* D. BESTSELLERS SIGNATURE COLLECTION */}
          <BestsellersSection
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onViewAllCollections={() => handleNavigateToShop('All')}
          />

          {/* E. CUSTOMER TESTIMONIALS & REVIEWS */}
          <ReviewsSection />
        </main>
      )}

      {/* 4. LUXURY FOOTER & NEWSLETTER */}
      <Footer
        onNavigateToHome={handleNavigateToHome}
        onNavigateToShop={handleNavigateToShop}
        onNavigateSection={handleNavigateSection}
      />

      {/* Floating Toast Feedback */}
      {toastMessage && (
        <div
          id="toast-notification"
          className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-[#141210]/95 backdrop-blur-md border border-[#D8B26E] text-[#FAF7F2] px-4 py-3 shadow-2xl flex items-center gap-3 text-xs font-sans rounded-xs toast-animated-entrance badge-glowing"
        >
          <CheckCircle size={16} className="text-[#D8B26E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleInitiateCheckout}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
        onBuyNow={(p, q) => handleBuyNow(p, q)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Collections Modal (Full Vault) */}
      <CollectionsModal
        isOpen={isCollectionsOpen}
        onClose={() => setIsCollectionsOpen(false)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onRemoveWishlist={handleRemoveWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
        onBrowse={() => {
          setIsWishlistOpen(false);
          handleNavigateToShop('All');
        }}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onNavigateSection={handleNavigateSection}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToShop={handleNavigateToShop}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentUser={currentUser}
        onOpenAuth={(mode = 'login') => handleNavigateToAuth(mode, 'general')}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Secure Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currentUser={currentUser}
        onOrderComplete={() => {
          setCartItems([]);
          showToast('Order confirmed! A confirmation SMS and email have been dispatched.');
        }}
      />

      {/* 5. NATIVE MOBILE APP BOTTOM NAVIGATION BAR */}
      <MobileBottomBar
        currentPage={currentPage}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        currentUser={currentUser}
        isWishlistOpen={isWishlistOpen}
        isCartOpen={isCartOpen}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToShop={handleNavigateToShop}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={(mode = 'login') => handleNavigateToAuth(mode, 'general')}
        onOpenProfile={() => setIsProfileOpen(true)}
      />
    </div>
  );
}
