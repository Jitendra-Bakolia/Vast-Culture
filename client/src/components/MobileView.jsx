import React from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileHeader } from './MobileHeader';
import { MobileHero } from './MobileHero';
import { OurStorySection } from './OurStorySection';
import { ServicesSection } from './ServicesSection';
import { BestsellersSection } from './BestsellersSection';
import { ReviewsSection } from './ReviewsSection';
import { MobileFooter } from './MobileFooter';

export const MobileView = ({
  cartCount,
  wishlistIds,
  showAnnouncement,
  onCloseAnnouncement,
  onOpenNav,
  onOpenCart,
  onOpenSearch,
  onOpenAuthModal,
  onOpenProfileModal,
  currentUser,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onQuickView,
  onViewAllCollections,
  onNavigateHome,
}) => {
  return (
    <div id="vast-culture-mobile-app" className="w-full bg-[#0D0D0D] min-h-screen text-[#1A1A1A]">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <AnnouncementBar
        visible={showAnnouncement}
        onClose={onCloseAnnouncement}
      />

      {/* 2. MOBILE HEADER */}
      <MobileHeader
        cartCount={cartCount}
        onOpenNav={onOpenNav}
        onOpenCart={onOpenCart}
        onOpenSearch={onOpenSearch}
        onOpenAuthModal={onOpenAuthModal}
        onOpenProfileModal={onOpenProfileModal}
        currentUser={currentUser}
        onNavigateHome={onNavigateHome}
      />

      {/* 3. MOBILE HERO SECTION */}
      <MobileHero
        onShopClick={onViewAllCollections}
        onExploreClick={() => {
          const el = document.getElementById('our-story');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. OUR STORY (SINGLE COLUMN) */}
      <OurStorySection isMobileLayout={true} />

      {/* 5. SERVICES (2X2 GRID) */}
      <ServicesSection isMobileLayout={true} />

      {/* 6. BESTSELLERS (2-COLUMN GRID) */}
      <BestsellersSection
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onQuickView={onQuickView}
        onViewAllCollections={onViewAllCollections}
        isMobileLayout={true}
      />

      {/* 7. CUSTOMER REVIEWS (CAROUSEL) */}
      <ReviewsSection isMobileLayout={true} />

      {/* 8. MOBILE ACCORDION FOOTER */}
      <MobileFooter onShopClick={onViewAllCollections} />
    </div>
  );
};
