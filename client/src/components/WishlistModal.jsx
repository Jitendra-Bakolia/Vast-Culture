import React, { useState, useEffect } from 'react';
import { ALL_COLLECTION_PRODUCTS } from '../data/mockData';
import { X, Heart, ShoppingBag, Trash2, Star, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const WishlistModal = ({
  isOpen,
  onClose,
  wishlistIds = [],
  onRemoveWishlist,
  onAddToCart,
  onQuickView,
  onBrowse,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  // Sync rendered state with smooth delayed unmount on close
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.classList.add('overflow-hidden');
    } else if (isRendered) {
      const timer = setTimeout(() => {
        setIsRendered(false);
        document.body.classList.remove('overflow-hidden');
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  // Clean up body scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const shouldRender = isOpen || isRendered;
  const isExiting = isRendered && !isOpen;

  if (!shouldRender) return null;

  const wishlistedProducts = ALL_COLLECTION_PRODUCTS.filter((item) =>
    (wishlistIds || []).includes(item.id)
  );

  return (
    <div
      id="wishlist-drawer-backdrop"
      onClick={isExiting ? undefined : onClose}
      className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end ${
        isExiting ? 'drawer-fade-out pointer-events-none' : 'drawer-fade-in'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Saved Wishlist"
    >
      <div
        id="wishlist-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md bg-[#FAF7F2] h-full flex flex-col shadow-2xl text-[#1E1B18] border-l border-[#E2D8C6] ${
          isExiting ? 'drawer-slide-out-right pointer-events-none' : 'drawer-slide-in-right'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFC8] bg-[#FAF4EB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart size={20} className="text-[#9E7A32] fill-[#9E7A32]" />
            <h2 className="font-serif-luxury text-xl font-normal text-[#121110]">
              Saved Wishlist ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            id="btn-close-wishlist"
            onClick={onClose}
            aria-label="Close wishlist drawer"
            className="p-1.5 text-[#6B6152] hover:text-black transition-colors cursor-pointer rounded-full hover:bg-black/5 tap-bounce"
          >
            <X size={20} />
          </button>
        </div>

        {/* Curation Subtitle Banner */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-[#FAF7F2] via-[#F4EDE2] to-[#FAF7F2] border-b border-[#E8DFC8] flex items-center justify-between text-xs font-sans text-[#786F61]">
          <span className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#9E7A32]" />
            <span>Private Atelier Curation</span>
          </span>
          <span className="text-[11px] font-medium text-[#9E7A32]">Saved to Vault</span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#736B5E]">
              <div className="w-16 h-16 rounded-full bg-[#F0E6D8] flex items-center justify-center mb-4 text-[#A8987E]">
                <Heart size={28} />
              </div>
              <p className="font-serif-luxury text-xl text-[#1E1B18] mb-1">Your wishlist is empty</p>
              <p className="text-xs font-sans max-w-xs mb-6 text-[#736B5E]">
                Save your favourite handcrafted jewelry creations to review later or acquire for your personal stack.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowse();
                }}
                className="px-6 py-2.5 bg-[#0D0D0D] text-[#FAF7F2] text-xs font-sans tracking-widest uppercase hover:bg-[#D8B26E] hover:text-black transition-colors cursor-pointer tap-bounce"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3 bg-white border border-[#E8DEC9] relative group hover:border-[#D8B26E] transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  width="80"
                  height="80"
                  className="w-20 h-20 object-cover bg-[#F5EFEB] shrink-0 cursor-pointer"
                  onClick={() => onQuickView(product)}
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="pr-6">
                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-serif-luxury text-sm text-[#1A1A1A] font-normal leading-snug line-clamp-1 cursor-pointer hover:text-[#9E7A32] transition-colors"
                    >
                      {product.name}
                    </h3>
                    <span className="text-[11px] text-[#786F61] font-sans">
                      18k Gold Plated · {product.category}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-sans font-semibold text-[#1A1A1A]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] font-sans text-[#8C8273] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                      <div className="flex text-[#D8B26E] items-center text-[10px]">
                        <Star size={10} fill="#D8B26E" strokeWidth={0} />
                        <span className="ml-1 text-[#61584A] font-sans">{product.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1 bg-[#0D0D0D] hover:bg-[#D8B26E] text-white hover:text-black text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer tap-bounce"
                    >
                      <ShoppingBag size={12} />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={() => onRemoveWishlist(product)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="text-[#998E80] hover:text-[#B53B3B] p-1.5 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (when items > 0) */}
        {wishlistedProducts.length > 0 && (
          <div className="p-5 border-t border-[#E8DFC8] bg-[#FAF4EB] space-y-3">
            <button
              id="btn-wishlist-add-all"
              onClick={() => {
                wishlistedProducts.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="w-full py-3.5 bg-[#0D0D0D] hover:bg-[#D8B26E] hover:text-black text-[#FAF7F2] font-sans font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 cursor-pointer luxury-shimmer-btn group"
            >
              <ShoppingBag size={14} className="text-[#D8B26E] group-hover:text-black group-hover:scale-110 transition-transform duration-300" />
              <span>ADD ALL TO SHOPPING BAG</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7A7163] font-sans text-center">
              <ShieldCheck size={13} className="text-[#9E7A32]" />
              <span>Complimentary Velvet Packaging · Insured Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
