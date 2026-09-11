import React from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { DesktopHeader } from './DesktopHeader';
import { DesktopHero } from './DesktopHero';
import { OurStorySection } from './OurStorySection';
import { ServicesSection } from './ServicesSection';
import { BestsellersSection } from './BestsellersSection';
import { ReviewsSection } from './ReviewsSection';
import { DesktopFooter } from './DesktopFooter';

export const DesktopView = ({
  cartCount,
  wishlistIds,
  showAnnouncement,
  onCloseAnnouncement,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenAuthModal,
  onOpenProfileModal,
  currentUser,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onQuickView,
  onViewAllCollections,
  onNavigate,
}) => {
  return (
    <div id="vast-culture-desktop-app" className="w-full bg-[#0E0D0B] min-h-screen text-[#FAF6EE]">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <AnnouncementBar
        visible={showAnnouncement}
        onClose={onCloseAnnouncement}
      />

      {/* 2. NAVIGATION BAR */}
      <DesktopHeader
        cartCount={cartCount}
        wishlistCount={(wishlistIds || []).length}
        onOpenCart={onOpenCart}
        onOpenSearch={onOpenSearch}
        onOpenWishlist={onOpenWishlist}
        onOpenAuthModal={onOpenAuthModal}
        onOpenProfileModal={onOpenProfileModal}
        currentUser={currentUser}
        onNavigate={onNavigate}
        onShopClick={onViewAllCollections}
      />

      {/* 3. HERO SECTION */}
      <DesktopHero
        onShopClick={onViewAllCollections}
        onExploreClick={() => onNavigate?.('our-story')}
      />

      {/* 4. OUR STORY / INFORMATION SECTION */}
      <OurStorySection isMobileLayout={false} />

      {/* 5. SERVICES SECTION */}
      <ServicesSection isMobileLayout={false} />

      {/* 6. SHOP BY COLLECTION / PRODUCT IMAGE SECTION */}
      <BestsellersSection
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onQuickView={onQuickView}
        onViewAllCollections={onViewAllCollections}
        isMobileLayout={false}
      />

      {/* 7. CUSTOMER REVIEWS */}
      <ReviewsSection isMobileLayout={false} />

      {/* 8. FOOTER */}
      <DesktopFooter onShopClick={onViewAllCollections} />
    </div>
  );
};
