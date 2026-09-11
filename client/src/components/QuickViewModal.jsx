import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Sparkles, Check, Zap } from 'lucide-react';

export const QuickViewModal = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div 
      id="quickview-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div 
        id="quickview-modal-content"
        className="bg-[#FAF7F2] border border-[#D8CEBA] w-full max-w-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center transition-colors shadow-sm cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-[#F5EFEB] aspect-square md:aspect-auto h-72 md:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-[#121110] text-[#EBD5A0] text-[10px] uppercase font-sans font-semibold tracking-widest px-2.5 py-1 border border-[#D8B26E]/40">
                {product.tag}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Category */}
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#9E7A32] font-semibold block mb-1">
                {product.category}
              </span>

              {/* Title */}
              <h2 className="font-serif-luxury text-2xl md:text-3xl text-[#141210] font-normal leading-tight mb-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#D8B26E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#D8B26E" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-xs text-[#736B5E] font-sans">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl font-sans font-semibold text-[#141210]">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#8C8273] line-through font-light">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-[11px] text-[#2F663B] font-sans font-medium bg-[#E8F3EB] px-2 py-0.5 rounded-xs">
                  Save ₹{(product.originalPrice || 0) - product.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#524B3F] font-sans leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Material Specs */}
              <div className="bg-white p-3 border border-[#E5DEC9] mb-6 flex items-start gap-2.5">
                <Sparkles size={16} className="text-[#9E7A32] shrink-0 mt-0.5" />
                <div className="text-[11px] text-[#4A4337] font-sans">
                  <strong className="text-[#1A1A1A]">Material & Finish:</strong> {product.material}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#DCD3C0] bg-white h-11 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 text-sm text-[#524B3F] hover:bg-[#F2ECE1] h-full cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-sans font-bold text-[#1A1A1A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 text-sm text-[#524B3F] hover:bg-[#F2ECE1] h-full cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  id="btn-quickview-add-bag"
                  onClick={handleAdd}
                  className={`flex-1 h-11 font-sans text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    addedAnimation
                      ? 'bg-[#2F663B] text-white'
                      : 'bg-white border border-[#141210] hover:bg-[#141210] hover:text-[#FAF7F2] text-[#141210]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={15} />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  id="btn-quickview-wishlist"
                  onClick={() => onToggleWishlist(product)}
                  aria-label="Toggle wishlist"
                  className={`w-11 h-11 border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#D8B26E] border-[#D8B26E] text-black'
                      : 'border-[#DCD3C0] bg-white hover:border-black text-[#524B3F]'
                  }`}
                >
                  <Heart size={17} fill={isWishlisted ? '#0D0D0D' : 'none'} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                id="btn-quickview-buy-now"
                onClick={handleBuy}
                className="w-full h-11 bg-[#0D0D0D] hover:bg-[#D8B26E] hover:text-black text-[#FAF7F2] font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer mb-3"
              >
                <Zap size={14} className="fill-current text-[#D8B26E] group-hover:text-black" />
                <span>BUY NOW • ₹{product.price * quantity}</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-sans text-[#786F61] border-t border-[#E8DFC8] pt-3">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-[#9E7A32]" />
                  100% Anti-Tarnish
                </span>
                <span>•</span>
                <span>Hypoallergenic</span>
                <span>•</span>
                <span>Free Delivery above ₹999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
