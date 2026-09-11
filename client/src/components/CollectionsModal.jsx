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
        className="bg-[#12100E] border border-[#2E271D] w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-[#FAF6EE]"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#2C251C] bg-[#161310] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#D8B26E] font-semibold block mb-1">
              Curated Vault
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#FAF6EE]">
              The Vast Culture Collection
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close collections"
            className="w-9 h-9 rounded-full bg-[#181512] border border-[#2C251C] hover:bg-[#D8B26E] hover:text-black text-[#FAF6EE] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter and Sort Bar */}
        <div className="px-5 py-3.5 bg-[#14120F] border-b border-[#2C251C] flex flex-wrap items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D8B26E] text-black font-semibold'
                    : 'bg-[#1C1813] text-[#A89F91] border border-[#2C251C] hover:text-[#FAF6EE] hover:border-[#D8B26E]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-xs font-sans text-[#A89F91]">
            <SlidersHorizontal size={14} className="text-[#D8B26E]" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#181512] border border-[#2C251C] text-xs font-sans px-2.5 py-1.5 text-[#FAF6EE] outline-none cursor-pointer rounded-xs focus:border-[#D8B26E]"
            >
              <option value="featured" className="bg-[#181512] text-[#FAF6EE]">Featured</option>
              <option value="price-low" className="bg-[#181512] text-[#FAF6EE]">Price: Low to High</option>
              <option value="price-high" className="bg-[#181512] text-[#FAF6EE]">Price: High to Low</option>
              <option value="rating" className="bg-[#181512] text-[#FAF6EE]">Top Rated</option>
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
                className="bg-[#14120F] border border-[#262018] overflow-hidden flex flex-col justify-between group hover:border-[#D8B26E]/70 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square bg-[#1A1713] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.tag && (
                    <span className="absolute top-2 left-2 bg-[#0A0908]/90 border border-[#D8B26E]/40 text-[#D8B26E] text-[8px] uppercase tracking-wider px-1.5 py-0.5">
                      {product.tag}
                    </span>
                  )}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-xs rounded-full hover:bg-[#1E1A15] text-[#FAF6EE] cursor-pointer transition-colors"
                  >
                    <Heart size={14} fill={isWishlisted ? '#D8B26E' : 'none'} className={isWishlisted ? 'text-[#D8B26E]' : 'text-[#FAF6EE]'} />
                  </button>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-1 text-[#D8B26E] mb-1">
                      <Star size={10} fill="#D8B26E" strokeWidth={0} />
                      <span className="text-[10px] text-[#A89F91] font-sans">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    <h3 
                      onClick={() => onQuickView(product)}
                      className="font-serif-luxury text-sm text-[#FAF6EE] font-normal leading-snug line-clamp-1 cursor-pointer hover:text-[#D8B26E] transition-colors"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#262018] flex items-center justify-between">
                    <span className="font-sans font-semibold text-xs text-[#E5C378]">
                      ₹{product.price}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onQuickView(product)}
                        className="p-1.5 bg-[#1E1A15] hover:bg-[#D8B26E] hover:text-black text-[#FAF6EE] border border-[#2C251C] text-[10px] cursor-pointer transition-colors"
                        title="Quick View"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-2 py-1 bg-gradient-to-r from-[#D8B26E] to-[#C89D52] hover:from-[#E5C378] hover:to-[#D8B26E] text-black text-[10px] font-sans uppercase font-semibold tracking-wider cursor-pointer transition-all shadow-xs"
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
