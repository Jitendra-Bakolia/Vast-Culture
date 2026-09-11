import React from 'react';
import { ALL_COLLECTION_PRODUCTS } from '../data/mockData';
import { X, Heart, ShoppingBag, Trash2, Star, ArrowRight } from 'lucide-react';

export const WishlistModal = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveWishlist,
  onAddToCart,
  onQuickView,
  onBrowse,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = ALL_COLLECTION_PRODUCTS.filter((item) =>
    (wishlistIds || []).includes(item.id)
  );

  return (
    <div
      id="wishlist-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        id="wishlist-modal-content"
        className="bg-[#FAF7F2] border border-[#D8CEBA] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFC8] bg-[#FAF4EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-[#9E7A32] fill-[#9E7A32]" />
            <h2 className="font-serif-luxury text-2xl font-normal text-[#121110]">
              My Wishlist ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 text-[#6B6152] hover:text-black transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {wishlistedProducts.length === 0 ? (
            <div className="py-12 text-center text-[#6B6152] space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#F0E6D8] flex items-center justify-center mx-auto text-[#A8987E]">
                <Heart size={24} />
              </div>
              <p className="font-serif-luxury text-xl text-[#1E1B18]">Your wishlist is empty</p>
              <p className="text-xs font-sans max-w-xs mx-auto text-[#736B5E]">
                Save your favourite jewelry pieces to review later or add to bag.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowse();
                }}
                className="px-6 py-2.5 bg-[#0D0D0D] text-[#FAF7F2] text-xs font-sans tracking-widest uppercase hover:bg-[#D8B26E] hover:text-black transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-white border border-[#E8DEC9] gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    width="64"
                    height="64"
                    className="w-16 h-16 object-cover bg-[#F5EFEB]"
                  />
                  <div>
                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-serif-luxury text-sm md:text-base text-[#141210] font-normal cursor-pointer hover:text-[#9E7A32]"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-[#786F61] font-sans mt-0.5">
                      <span className="font-semibold text-[#141210]">₹{product.price}</span>
                      <span>•</span>
                      <div className="flex text-[#D8B26E] items-center">
                        <Star size={10} fill="#D8B26E" strokeWidth={0} />
                        <span className="ml-1 text-[#61584A]">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                    }}
                    className="px-3.5 py-1.5 bg-[#0D0D0D] hover:bg-[#D8B26E] text-white hover:text-black text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={13} />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(product)}
                    aria-label="Remove from wishlist"
                    className="p-1.5 text-[#9E9180] hover:text-[#B53B3B] transition-colors cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="p-4 bg-[#FAF4EB] border-t border-[#E8DFC8] flex items-center justify-between">
            <span className="text-xs text-[#6B6152] font-sans">
              All items are saved to your current session.
            </span>
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="text-xs font-sans font-semibold text-[#9E7A32] hover:text-[#121110] flex items-center gap-1 uppercase tracking-wider cursor-pointer"
            >
              <span>Add All to Bag</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
