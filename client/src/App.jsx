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

// Helper to parse clean pathname routes and auto-sanitize legacy hashes
function parseRouteFromLocation() {
  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // 1. Sanitize legacy hashes if present (e.g. #login, #shop, #register)
  if (hash) {
    let cleanPath = '/';
    let targetPage = 'home';
    let targetMode = 'login';
    let targetCategory = 'All';

    if (hash.includes('register')) {
      cleanPath = '/register';
      targetPage = 'auth';
      targetMode = 'register';
    } else if (hash.includes('login') || hash.includes('auth')) {
      cleanPath = '/login';
      targetPage = 'auth';
      targetMode = 'login';
    } else if (hash.includes('shop') || hash.includes('collections')) {
      if (hash.includes('earrings')) {
        cleanPath = '/shop/earrings';
        targetCategory = 'Earrings';
      } else if (hash.includes('necklaces')) {
        cleanPath = '/shop/necklaces';
        targetCategory = 'Necklaces';
      } else if (hash.includes('bracelets')) {
        cleanPath = '/shop/bracelets';
        targetCategory = 'Bracelets';
      } else if (hash.includes('rings')) {
        cleanPath = '/shop/rings';
        targetCategory = 'Rings';
      } else {
        cleanPath = '/shop';
        targetCategory = 'All';
      }
      targetPage = 'shop';
    } else if (hash.includes('our-story') || hash.includes('about')) {
      cleanPath = '/about';
      targetPage = 'home';
    } else if (hash.includes('reviews')) {
      cleanPath = '/reviews';
      targetPage = 'home';
    } else if (hash.includes('contact')) {
      cleanPath = '/contact';
      targetPage = 'home';
    }

    try {
      window.history.replaceState(null, '', cleanPath);
    } catch {
      // ignore
    }
    return { page: targetPage, authMode: targetMode, category: targetCategory, section: hash.replace('#', '') };
  }

  // 2. Parse clean pathname
  if (pathname.startsWith('/register')) {
    return { page: 'auth', authMode: 'register', category: 'All' };
  }
  if (pathname.startsWith('/login') || pathname.startsWith('/auth')) {
    return { page: 'auth', authMode: 'login', category: 'All' };
  }
  if (pathname.startsWith('/forgot-password')) {
    return { page: 'auth', authMode: 'forgot', category: 'All' };
  }
  if (pathname.startsWith('/shop') || pathname.startsWith('/collections')) {
    const parts = pathname.split('/').filter(Boolean);
    let cat = 'All';
    if (parts.length > 1) {
      const seg = parts[1].toLowerCase();
      if (seg === 'earrings') cat = 'Earrings';
      else if (seg === 'necklaces') cat = 'Necklaces';
      else if (seg === 'bracelets') cat = 'Bracelets';
      else if (seg === 'rings') cat = 'Rings';
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const queryCat = searchParams.get('category');
      if (queryCat) {
        cat = queryCat.charAt(0).toUpperCase() + queryCat.slice(1);
      }
    }
    return { page: 'shop', authMode: 'login', category: cat };
  }
  if (pathname.startsWith('/about') || pathname.startsWith('/our-story')) {
    return { page: 'home', authMode: 'login', category: 'All', section: 'our-story' };
  }
  if (pathname.startsWith('/reviews')) {
    return { page: 'home', authMode: 'login', category: 'All', section: 'customer-reviews' };
  }
  if (pathname.startsWith('/contact')) {
    return { page: 'home', authMode: 'login', category: 'All', section: 'footer' };
  }

  return { page: 'home', authMode: 'login', category: 'All' };
}

export default function App() {
  const initialRoute = parseRouteFromLocation();

  // Current Page State: 'home' | 'shop' | 'auth'
  const [currentPage, setCurrentPage] = useState(initialRoute.page);
  const [shopCategory, setShopCategory] = useState(initialRoute.category || 'All');

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
  const [authInitialMode, setAuthInitialMode] = useState(initialRoute.authMode || 'login');
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

  // Sync with browser back-forward navigation (HTML5 History API popstate)
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromLocation();
      setCurrentPage(route.page);
      setShopCategory(route.category);
      if (route.page === 'auth') {
        setAuthInitialMode(route.authMode);
      }
      if (route.section) {
        setTimeout(() => {
          const el = document.getElementById(route.section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // On initial mount, if section was targeted in clean route (e.g. /about or /reviews), scroll smoothly
  useEffect(() => {
    const route = parseRouteFromLocation();
    if (route.section) {
      setTimeout(() => {
        const el = document.getElementById(route.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, []);

  // Clean Navigation functions without '#'
  const handleNavigateToHome = () => {
    setCurrentPage('home');
    if (window.location.pathname !== '/' && window.location.pathname !== '/home') {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToShop = (category = 'All') => {
    setShopCategory(category);
    setCurrentPage('shop');
    const path = category !== 'All' ? `/shop/${category.toLowerCase()}` : '/shop';
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(category !== 'All' ? `Browsing ${category} Collection` : 'All Collections Vault');
  };

  const handleCategoryChange = (category) => {
    setShopCategory(category);
    const path = category !== 'All' ? `/shop/${category.toLowerCase()}` : '/shop';
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  };

  const handleNavigateToAuth = (mode = 'login', intent = 'general') => {
    setAuthIntent(intent);
    setAuthInitialMode(mode);
    setCurrentPage('auth');
    const path = mode === 'register' ? '/register' : mode === 'forgot' ? '/forgot-password' : '/login';
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clean section navigation (scrolling without '#')
  const handleNavigateSection = (sectionId) => {
    const routeMap = {
      'our-story': '/about',
      'customer-reviews': '/reviews',
      'footer': '/contact',
      'bestsellers': '/',
      'hero': '/',
    };
    const path = routeMap[sectionId] || '/';

    if (currentPage !== 'home') {
      setCurrentPage('home');
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }
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
      window.history.pushState(null, '', '/');
      setIsCheckoutOpen(true);
      showToast(`Welcome ${user.name}! Proceeding to secure checkout.`);
    } else if (authIntent === 'buy-now' && pendingBuyItem) {
      handleAddToCart(pendingBuyItem.product, pendingBuyItem.quantity);
      setPendingBuyItem(null);
      setCurrentPage('home');
      window.history.pushState(null, '', '/');
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
            onCategoryChange={handleCategoryChange}
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
            onModeChange={(newMode) => {
              setAuthInitialMode(newMode);
              const path = newMode === 'register' ? '/register' : newMode === 'forgot' ? '/forgot-password' : '/login';
              if (window.location.pathname !== path) {
                window.history.pushState(null, '', path);
              }
            }}
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
