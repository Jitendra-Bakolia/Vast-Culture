import React, { useState } from 'react';
import { ALL_COLLECTION_PRODUCTS } from '../data/mockData';
import { X, Star, Heart, SlidersHorizontal, Eye } from 'lucide-react';

export const CollectionsModal = ({
  isOpen,
  onClose,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  if (!isOpen) return null;

  const categories = ['All', 'Earrings', 'Necklaces', 'Bracelets', 'Rings'];

  let filtered = ALL_COLLECTION_PRODUCTS.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div 
      id="collections-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div 
        id="collections-modal-content"
        className="bg-[#FAF7F2] border border-[#D8CEBA] w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DFC8] bg-[#FAF4EB] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#9E7A32] font-semibold block mb-1">
              Curated Vault
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#121110]">
              The Vast Culture Collection
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close collections"
            className="w-9 h-9 rounded-full bg-white border border-[#DCD3C0] hover:bg-black hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter and Sort Bar */}
        <div className="px-5 py-3.5 bg-white border-b border-[#E8DEC9] flex flex-wrap items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0D0D0D] text-[#EBD5A0] font-semibold'
                    : 'bg-[#FAF7F2] text-[#5C5548] hover:bg-[#EDE3D0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-xs font-sans text-[#5C5548]">
            <SlidersHorizontal size={14} className="text-[#9E7A32]" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF7F2] border border-[#DCD3C0] text-xs font-sans px-2.5 py-1.5 text-[#1A1A1A] outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => {
            const isWishlisted = (wishlistIds || []).includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white border border-[#E8DFC8] overflow-hidden flex flex-col justify-between group hover:border-[#D8B26E] hover:shadow-md transition-all"
              >
                <div className="relative aspect-square bg-[#F5EFEB] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.tag && (
                    <span className="absolute top-2 left-2 bg-[#121110] text-[#EBD5A0] text-[8px] uppercase tracking-wider px-1.5 py-0.5">
                      {product.tag}
                    </span>
                  )}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-xs rounded-full hover:bg-white text-black cursor-pointer"
                  >
                    <Heart size={14} fill={isWishlisted ? '#D8B26E' : 'none'} className={isWishlisted ? 'text-[#D8B26E]' : 'text-black'} />
                  </button>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-1 text-[#D8B26E] mb-1">
                      <Star size={10} fill="#D8B26E" strokeWidth={0} />
                      <span className="text-[10px] text-[#786F61] font-sans">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    <h3 
                      onClick={() => onQuickView(product)}
                      className="font-serif-luxury text-sm text-[#141210] font-normal leading-snug line-clamp-1 cursor-pointer hover:text-[#9E7A32]"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#F2ECE1] flex items-center justify-between">
                    <span className="font-sans font-semibold text-xs text-[#141210]">
                      ₹{product.price}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onQuickView(product)}
                        className="p-1.5 bg-[#FAF7F2] hover:bg-[#EBD5A0] text-black border border-[#DCD3C0] text-[10px] cursor-pointer"
                        title="Quick View"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-2 py-1 bg-[#0D0D0D] hover:bg-[#D8B26E] text-white hover:text-black text-[10px] font-sans uppercase tracking-wider cursor-pointer"
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
      </div>
    </div>
  );
};
