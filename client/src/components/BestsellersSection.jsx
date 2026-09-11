import React from 'react';
import { BESTSELLER_PRODUCTS } from '../data/mockData';
import { Star, Heart, Eye, ShoppingBag, ArrowRight } from 'lucide-react';

export const BestsellersSection = ({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onViewAllCollections,
}) => {
  return (
    <section
      id="bestsellers"
      aria-label="Our Bestsellers"
      className="w-full bg-[#FAF7F2] text-[#1E1B18] py-14 sm:py-18 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-sans font-semibold uppercase text-[#9E7A32] block mb-1.5 sm:mb-2">
            Signature Statements
          </span>
          <h2
            id="bestsellers-heading"
            className="font-serif-luxury text-[#121110] font-normal tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Our Bestsellers
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6357] font-sans font-light mt-2 max-w-md mx-auto">
            Timeless silhouettes adored by our community. Hand-finished in limited artisan batches.
          </p>
          <div className="w-12 h-[1px] bg-[#D8B26E] mx-auto mt-3.5 sm:mt-4" />
        </div>

        {/* Product Grid: 2 columns on mobile/small screens, 4 columns on md/lg screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-7 mb-10 sm:mb-14">
          {BESTSELLER_PRODUCTS.map((product) => {
            const isWishlisted = (wishlistIds || []).includes(product.id);

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group flex flex-col bg-white border border-[#E8DFC8] overflow-hidden relative luxury-card-hover"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] bg-[#F5EFEB] overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Badge */}
                  {product.tag && (
                    <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#121110]/95 backdrop-blur-xs text-[#EBD5A0] text-[8px] sm:text-[9px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 border border-[#D8B26E]/50 shadow-sm">
                      {product.tag}
                    </span>
                  )}

                  {/* Wishlist Heart Icon (Top Right) */}
                  <button
                    id={`btn-wishlist-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    aria-label={`Add ${product.name} to wishlist`}
                    className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer z-10 tap-bounce ${isWishlisted
                        ? 'bg-[#D8B26E] text-black shadow-md heart-pop-anim'
                        : 'bg-white/90 hover:bg-white text-[#4A453E] hover:text-[#121110] hover:scale-110'
                      }`}
                  >
                    <Heart
                      size={14}
                      fill={isWishlisted ? '#0D0D0D' : 'none'}
                      strokeWidth={1.7}
                    />
                  </button>

                  {/* Quick Action Overlay on larger screens */}
                  <div className="hidden md:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent items-center justify-center gap-2 card-quick-actions">
                    <button
                      id={`btn-quick-view-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="px-3 py-1.5 bg-white/95 hover:bg-white text-[#121110] text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 cursor-pointer"
                    >
                      <Eye size={13} />
                      <span>Quick View</span>
                    </button>
                    <button
                      id={`btn-add-cart-overlay-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="px-3 py-1.5 bg-[#D8B26E] hover:bg-[#EBD5A0] text-[#0D0D0D] text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md hover:scale-105 cursor-pointer luxury-shimmer-btn"
                    >
                      <ShoppingBag size={13} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Star Rating & Review Count */}
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                      <div className="flex text-[#D8B26E]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            fill="#D8B26E"
                            strokeWidth={0}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-[#7A7165] font-sans">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-serif-luxury text-xs sm:text-sm md:text-base text-[#141210] font-normal leading-snug hover:text-[#9E7A32] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
                    <div>
                      <span className="font-sans font-semibold text-xs sm:text-sm text-[#141210]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-1.5 text-[10px] sm:text-[11px] text-[#9E9486] line-through font-sans">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Mobile & Small Screen Quick Actions */}
                    <div className="flex md:hidden items-center gap-1">
                      <button
                        onClick={() => onQuickView(product)}
                        aria-label="Quick View"
                        className="p-1 sm:p-1.5 bg-[#FAF7F2] border border-[#D5CABB] text-black hover:bg-[#EBD5A0] transition-colors rounded-xs"
                      >
                        <Eye size={12} />
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        aria-label="Add to bag"
                        className="px-2 py-1 bg-[#0D0D0D] hover:bg-[#D8B26E] text-white hover:text-black text-[10px] font-sans uppercase font-medium tracking-wider transition-colors rounded-xs"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Collections Button */}
        <div className="text-center">
          <button
            id="btn-view-all-collections"
            onClick={onViewAllCollections}
            className="px-8 sm:px-10 py-3 sm:py-3.5 bg-[#0D0D0D] hover:bg-[#D8B26E] text-[#FAF7F2] hover:text-black font-sans font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase shadow-md inline-flex items-center gap-2 cursor-pointer luxury-shimmer-btn group"
          >
            <span>VIEW ALL PIECES</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
