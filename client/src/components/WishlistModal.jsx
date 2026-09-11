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
        className="bg-[#12100E] border border-[#2E271D] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-[#FAF6EE]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2C251C] bg-[#161310] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-[#D8B26E] fill-[#D8B26E]" />
            <h2 className="font-serif-luxury text-2xl font-normal text-[#FAF6EE]">
              My Wishlist ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 text-[#A89F91] hover:text-[#FAF6EE] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {wishlistedProducts.length === 0 ? (
            <div className="py-12 text-center text-[#A89F91] space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#1C1813] border border-[#D8B26E]/30 flex items-center justify-center mx-auto text-[#D8B26E]">
                <Heart size={24} />
              </div>
              <p className="font-serif-luxury text-xl text-[#FAF6EE]">Your wishlist is empty</p>
              <p className="text-xs font-sans max-w-xs mx-auto text-[#C5BCAD]">
                Save your favourite jewelry pieces to review later or add to bag.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowse();
                }}
                className="px-6 py-2.5 bg-[#D8B26E] text-black text-xs font-sans font-semibold tracking-widest uppercase hover:bg-[#E5C378] transition-colors cursor-pointer shadow-md"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-[#161310] border border-[#262018] gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    width="64"
                    height="64"
                    className="w-16 h-16 object-cover bg-[#1A1713]"
                  />
                  <div>
                    <h3 
                      onClick={() => onQuickView(product)}
                      className="font-serif-luxury text-sm md:text-base text-[#FAF6EE] font-normal cursor-pointer hover:text-[#D8B26E] transition-colors"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-[#A89F91] font-sans mt-0.5">
                      <span className="font-semibold text-[#E5C378]">₹{product.price}</span>
                      <span>•</span>
                      <div className="flex text-[#D8B26E] items-center">
                        <Star size={10} fill="#D8B26E" strokeWidth={0} />
                        <span className="ml-1 text-[#A89F91]">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                    }}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-[#D8B26E] to-[#C89D52] hover:from-[#E5C378] hover:to-[#D8B26E] text-black text-xs font-sans font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <ShoppingBag size={13} />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(product)}
                    aria-label="Remove from wishlist"
                    className="p-1.5 text-[#8A8072] hover:text-[#E57373] transition-colors cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="p-4 bg-[#161310] border-t border-[#2C251C] flex items-center justify-between">
            <span className="text-xs text-[#A89F91] font-sans">
              All items are saved to your current session.
            </span>
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="text-xs font-sans font-semibold text-[#D8B26E] hover:text-[#FAF6EE] flex items-center gap-1 uppercase tracking-wider cursor-pointer"
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
