import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  Gift,
  Crown,
  Gem,
  Tag
} from 'lucide-react';

export const ANNOUNCEMENT_OFFERS = [
  {
    id: 'shipping-10',
    icon: Sparkles,
    desktopText: 'Complimentary Express Shipping Over ₹999',
    mobileText: 'Express Shipping ₹999+',
    code: 'VAST10',
    discount: '10% off',
    badge: 'Maison Privilege',
    title: 'Complimentary Express Shipping & 10% Off',
    description: 'Enjoy complimentary insured express delivery across India on orders above ₹999, plus save 10% on your entire order.',
    validity: 'Valid on all collections'
  },
  {
    id: 'gift-box',
    icon: Gift,
    desktopText: 'Artisan Velvet Jewellery Box On Orders Over ₹2,499',
    mobileText: 'Velvet Gift Box ₹2499+',
    code: 'GIFTVAST',
    discount: 'Free Gift',
    badge: 'Atelier Gift',
    title: 'Heirloom Velvet Presentation Box',
    description: 'Complimentary handcrafted obsidian velvet keepsake case with embossed gold monogramming on orders above ₹2,499.',
    validity: 'Automatic gift with code'
  },
  {
    id: 'welcome-500',
    icon: Crown,
    desktopText: 'Flat ₹500 Off Your First Order Over ₹3,999',
    mobileText: 'Flat ₹500 Off ₹3999+',
    code: 'WELCOME500',
    discount: '₹500 off',
    badge: 'Welcome Privilege',
    title: 'First Acquisition Welcome Grant',
    description: 'Welcome to the Maison: Enjoy an instant flat ₹500 courtesy deduction on your initial fine jewellery investment over ₹3,999.',
    validity: 'New collectors first order'
  },
  {
    id: 'stack-15',
    icon: Gem,
    desktopText: 'Members Vault: Extra 15% Off Two Or More Pieces',
    mobileText: '15% Off 2+ Pieces',
    code: 'VAULT15',
    discount: '15% off',
    badge: 'Curated Stack',
    title: 'Multi-Piece Curation Privilege',
    description: 'Curate your daily luxury stack. Add any 2 or more handcrafted atelier rings, earrings, or pendants to unlock an extra 15% off.',
    validity: 'Applies to 2+ cart items'
  }
];

export const AnnouncementBar = ({
  onClose,
  visible = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [copiedCode, setCopiedCode] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);
  const [isModalRendered, setIsModalRendered] = useState(false);
  const timerRef = useRef(null);

  const currentOffer = ANNOUNCEMENT_OFFERS[currentIndex] || ANNOUNCEMENT_OFFERS[0];
  const CurrentIcon = currentOffer.icon || Sparkles;

  // Sync offers modal rendered state with animated unmount
  useEffect(() => {
    if (isOffersModalOpen) {
      setIsModalRendered(true);
    } else if (isModalRendered) {
      const timer = setTimeout(() => {
        setIsModalRendered(false);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [isOffersModalOpen, isModalRendered]);

  // Auto-scroll every 10 seconds
  useEffect(() => {
    if (isPaused || isOffersModalOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_OFFERS.length);
    }, 10000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isOffersModalOpen, currentIndex]);

  // Lock background scroll when offers modal is open
  useEffect(() => {
    if (isOffersModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOffersModalOpen]);

  if (!visible) return null;

  const handleCopyCode = (code, e) => {
    if (e) e.stopPropagation();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2400);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENT_OFFERS.length) % ANNOUNCEMENT_OFFERS.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_OFFERS.length);
  };

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setIsOffersModalOpen(true);
  };

  const handleSelectOffer = (index) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
    setIsOffersModalOpen(false);
  };

  const shouldRenderModal = isOffersModalOpen || isModalRendered;
  const isModalExiting = isModalRendered && !isOffersModalOpen;

  return (
    <>
      <aside
        id="announcement-bar"
        aria-label="Promotional Announcement"
        className="w-full max-w-full overflow-hidden bg-[#0E0D0C] border-b border-[#D8B26E]/20 text-[#E0D8CE] py-1 px-2 sm:px-4 lg:px-6 transition-all duration-300 relative z-30 select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1 sm:gap-2">
          {/* Left Controls: < (Back) and 🎁 (All Offers & Gifts Button) */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            <button
              id="btn-announcement-prev"
              onClick={handlePrev}
              title="Previous offer (<)"
              aria-label="Previous promotional offer"
              className="text-[#9E9382] hover:text-[#D8B26E] p-1 rounded-sm hover:bg-white/5 transition-colors cursor-pointer shrink-0 tap-bounce flex items-center justify-center"
            >
              <ChevronLeft size={13} strokeWidth={2.2} />
            </button>

            <button
              id="btn-announcement-offers-modal"
              onClick={handleOpenModal}
              title="View all gifts & offers (Maison Privileges)"
              aria-label="View all promotional gifts and offers modal"
              className="text-[#D8B26E] hover:text-[#FAF6EE] p-1 rounded-sm hover:bg-[#D8B26E]/15 transition-colors cursor-pointer shrink-0 tap-bounce flex items-center justify-center gap-1 group"
            >
              <Gift size={13} strokeWidth={2.2} className="text-[#D8B26E] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200" />
              <span className="hidden xl:inline text-[9px] uppercase tracking-wider text-[#D8B26E] font-medium font-sans">
                Offers ({ANNOUNCEMENT_OFFERS.length})
              </span>
            </button>
          </div>

          {/* Center: Dynamic Auto-Scrolling Announcement with Animation */}
          <div className="flex-1 flex items-center justify-center overflow-hidden min-w-0 px-1">
            <div
              key={currentOffer.id}
              className={`flex items-center justify-center gap-x-2 sm:gap-x-2.5 gap-y-0.5 text-center flex-wrap ${direction === 'next' ? 'animate-announcement-next' : 'animate-announcement-prev'
                }`}
            >
              {/* Primary Message */}
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.12em] uppercase font-sans font-medium text-[#E0D8CE] leading-tight">
                <CurrentIcon size={10} className="text-[#D8B26E] shrink-0" />
                <span>
                  <span className="hidden sm:inline">{currentOffer.desktopText}</span>
                  <span className="sm:hidden">{currentOffer.mobileText}</span>
                </span>
              </div>

              <span className="hidden sm:inline text-[#D8B26E]/50 text-[9px]">✦</span>

              {/* Code Pill & Action */}
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.11em] uppercase font-sans text-[#C4B7A6] leading-tight">
                <span>Code</span>
                <button
                  onClick={(e) => handleCopyCode(currentOffer.code, e)}
                  title={`Click to copy code ${currentOffer.code}`}
                  aria-label={`Copy promotional code ${currentOffer.code}`}
                  className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.25 rounded-full bg-[#1C1915] border border-[#D8B26E]/50 hover:border-[#D8B26E] text-[#EBD5A0] hover:text-white transition-all cursor-pointer font-sans font-semibold text-[8.5px] sm:text-[9.5px] tracking-wider tap-bounce group shadow-xs"
                >
                  <span>{currentOffer.code}</span>
                  {copiedCode === currentOffer.code ? (
                    <Check size={9} className="text-[#48BB78]" />
                  ) : (
                    <Copy size={9} className="text-[#D8B26E] opacity-80 group-hover:opacity-100" />
                  )}
                </button>
                <span className="text-[#EBD5A0] font-medium">
                  {copiedCode === currentOffer.code ? '(Copied!)' : `for ${currentOffer.discount}`}
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls: > (Forward) and Close (✕) */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            <button
              id="btn-announcement-next"
              onClick={handleNext}
              title="Next offer (>)"
              aria-label="Next promotional offer"
              className="text-[#9E9382] hover:text-[#D8B26E] p-1 rounded-sm hover:bg-white/5 transition-colors cursor-pointer shrink-0 tap-bounce flex items-center justify-center"
            >
              <ChevronRight size={13} strokeWidth={2.2} />
            </button>

            {/* Dismiss Button */}
            {onClose && (
              <button
                id="btn-close-announcement"
                onClick={onClose}
                title="Close announcement"
                aria-label="Dismiss announcement"
                className="text-[#8C8375] hover:text-[#EBD5A0] p-0.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer shrink-0 tap-bounce ml-0.5"
              >
                <X size={11} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Gift Button Triggered Modal: All Available Offers & Privileges */}
      {shouldRenderModal && (
        <div
          id="offers-modal-overlay"
          className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 ${
            isModalExiting ? 'drawer-fade-out pointer-events-none' : 'drawer-fade-in'
          }`}
          onClick={isModalExiting ? undefined : () => setIsOffersModalOpen(false)}
        >
          <div
            id="offers-modal-content"
            className={`relative w-full max-w-lg bg-[#110F0D] border border-[#D8B26E]/40 text-[#FAF6EE] p-5 sm:p-7 shadow-2xl overflow-y-auto max-h-[90vh] ${
              isModalExiting ? 'modal-animate-out pointer-events-none' : 'modal-animate-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#29241D] mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1F1C18] border border-[#D8B26E]/40 text-[#D8B26E] text-[9px] uppercase tracking-[0.2em] font-sans font-medium mb-1.5">
                  <Sparkles size={10} />
                  <span>Exclusive Privileges</span>
                </div>
                <h2 className="font-cinzel-luxury text-lg sm:text-xl font-semibold text-[#F5E8D0] tracking-[0.14em]">
                  Maison Offers & Vouchers
                </h2>
                <p className="text-[11px] sm:text-xs text-[#A89F91] font-sans mt-0.5">
                  Curated atelier savings, seasonal gifts, and private vault privileges.
                </p>
              </div>

              <button
                id="btn-close-offers-modal"
                onClick={() => setIsOffersModalOpen(false)}
                aria-label="Close offers modal"
                className="text-[#A89F91] hover:text-[#FAF6EE] p-1.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* List of All Available Offers */}
            <div className="space-y-3">
              {ANNOUNCEMENT_OFFERS.map((offer, idx) => {
                const OfferIcon = offer.icon;
                const isSelected = currentIndex === idx;

                return (
                  <div
                    key={offer.id}
                    className={`p-3.5 sm:p-4 rounded-xs border transition-all duration-300 ${isSelected
                        ? 'bg-[#1C1813] border-[#D8B26E] shadow-[0_0_15px_rgba(216,178,110,0.15)]'
                        : 'bg-[#151310] border-[#29241D] hover:border-[#D8B26E]/40'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#262017] border border-[#D8B26E]/50 flex items-center justify-center text-[#D8B26E] shrink-0">
                          <OfferIcon size={12} />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.18em] font-sans font-semibold text-[#D8B26E] block">
                            {offer.badge}
                          </span>
                          <h3 className="font-serif-luxury text-sm text-[#F5E8D0] font-normal leading-snug">
                            {offer.title}
                          </h3>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 bg-[#D8B26E]/15 border border-[#D8B26E]/40 text-[#EBD5A0] text-[10px] font-sans font-semibold rounded-full shrink-0">
                        {offer.discount}
                      </span>
                    </div>

                    <p className="text-xs text-[#C5BCAD] font-sans font-light leading-relaxed mb-3">
                      {offer.description}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#24201A] flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Tag size={12} className="text-[#8C8275]" />
                        <span className="text-[10px] uppercase tracking-wider font-sans text-[#A89F91]">
                          Promo Code:
                        </span>
                        <button
                          onClick={(e) => handleCopyCode(offer.code, e)}
                          title={`Copy code ${offer.code}`}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#221D17] border border-[#D8B26E]/60 hover:border-[#D8B26E] text-[#F3D79B] hover:text-white font-sans font-bold text-[10px] tracking-wider transition-all cursor-pointer group shadow-xs"
                        >
                          <span>{offer.code}</span>
                          {copiedCode === offer.code ? (
                            <Check size={10} className="text-[#48BB78]" />
                          ) : (
                            <Copy size={10} className="text-[#D8B26E] opacity-75 group-hover:opacity-100" />
                          )}
                        </button>
                        {copiedCode === offer.code && (
                          <span className="text-[10px] text-[#48BB78] font-medium font-sans animate-in fade-in">
                            Copied!
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleSelectOffer(idx)}
                        className={`text-[10px] uppercase tracking-wider font-sans font-medium px-2.5 py-1 rounded-xs transition-all cursor-pointer ${isSelected
                            ? 'bg-[#D8B26E] text-black font-semibold shadow-xs'
                            : 'text-[#D8B26E] hover:text-[#F5E8D0] hover:bg-[#2B251D] border border-[#D8B26E]/30'
                          }`}
                      >
                        {isSelected ? 'Active On Banner ✓' : 'Display On Banner'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="mt-5 pt-3.5 border-t border-[#24201A] flex items-center justify-between text-[10px] text-[#8C8275] font-sans flex-wrap gap-2">
              <span>✦ All privileges apply across 18K solid gold & pearl creations.</span>
              <button
                onClick={() => setIsOffersModalOpen(false)}
                className="px-3 py-1 bg-[#1C1813] hover:bg-[#2B251D] text-[#D8B26E] border border-[#D8B26E]/40 rounded-xs text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
