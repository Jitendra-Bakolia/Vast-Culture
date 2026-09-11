import React, { useState, useMemo, useEffect } from 'react';
import { ALL_COLLECTION_PRODUCTS } from '../data/mockData';
import {
  Star,
  Heart,
  Eye,
  ShoppingBag,
  Search,
  SlidersHorizontal,
  ArrowLeft,
  X,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  ChevronRight
} from 'lucide-react';

export const ShopPage = ({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onQuickView,
  onNavigateToHome,
  initialCategory = 'All',
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync category when initialCategory prop changes (e.g. from browser back/forward or navigation)
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    onCategoryChange?.(cat);
  };

  // Categories list
  const categories = ['All', 'Earrings', 'Necklaces', 'Bracelets', 'Rings'];
  const tags = ['all', 'Bestseller', 'Trending', 'New Arrival', 'Editorial Pick', 'Limited Edition'];

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return ALL_COLLECTION_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Tag filter
      if (selectedTag !== 'all' && product.tag?.toLowerCase() !== selectedTag.toLowerCase()) {
        return false;
      }
      // Price filter
      if (priceFilter === 'under-500' && product.price >= 500) return false;
      if (priceFilter === '500-700' && (product.price < 500 || product.price > 700)) return false;
      if (priceFilter === 'above-700' && product.price <= 700) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchMat = product.material.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchMat && !matchCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return 0; // featured default order
    });
  }, [selectedCategory, selectedTag, priceFilter, searchQuery, sortBy]);

  const hasActiveFilters = selectedCategory !== 'All' || selectedTag !== 'all' || priceFilter !== 'all' || searchQuery.trim() !== '';

  const clearAllFilters = () => {
    handleCategorySelect('All');
    setSelectedTag('all');
    setPriceFilter('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div id="shop-page-container" className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#FAF7F2] text-[#1E1B18] pb-16 animate-in fade-in duration-300">
      {/* 1. SHOP HEADER & BREADCRUMB BANNER */}
      <div className="bg-[#0D0D0D] border-b border-[#24201A] text-[#FAF7F2] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden max-w-full">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D8B26E]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb row */}
          <div className="flex items-center gap-2 text-xs font-sans text-[#8C8375] mb-4">
            <button
              id="btn-breadcrumb-home"
              onClick={onNavigateToHome}
              className="hover:text-[#D8B26E] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Home</span>
            </button>
            <ChevronRight size={12} className="text-[#595247]" />
            <span className="text-[#EBD5A0] font-medium">All Collections & Vault</span>
            {selectedCategory !== 'All' && (
              <>
                <ChevronRight size={12} className="text-[#595247]" />
                <span className="text-[#FAF7F2]">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1F1C18] border border-[#D8B26E]/40 text-[#EBD5A0] text-[10px] font-sans uppercase tracking-[0.2em] rounded-full mb-3">
                <Sparkles size={11} className="text-[#D8B26E]" />
                <span>The Grand Vault • Complete Archive</span>
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FAF7F2] font-normal tracking-tight">
                All Jewelry Collections
              </h1>
              <p className="text-xs sm:text-sm text-[#B8AEA0] font-sans font-light mt-2 max-w-xl">
                Discover artisan-crafted 18k gold vermeil, authentic freshwater pearls, and modern statement pieces. Each piece engineered for timeless grace and daily durability.
              </p>
            </div>

            {/* Total items badge */}
            <div className="shrink-0 bg-[#161412] border border-[#2D2821] px-4 py-2 rounded-xs self-start md:self-auto">
              <span className="text-[11px] font-sans text-[#A69C8E] uppercase tracking-wider block">
                Catalog Items
              </span>
              <span className="font-serif-luxury text-xl text-[#D8B26E]">
                {filteredProducts.length} <span className="text-xs font-sans text-[#E0D7CB] font-light">of {ALL_COLLECTION_PRODUCTS.length} pieces</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTROLS BAR: CATEGORIES, SEARCH, SORT, FILTERS */}
      <div className="sticky top-[58px] sm:top-[64px] z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DEC9] px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full touch-pan-x overscroll-x-contain">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  id={`tab-category-${cat.toLowerCase()}`}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${isActive
                      ? 'bg-[#0D0D0D] text-[#FAF7F2] font-semibold shadow-xs'
                      : 'bg-white border border-[#DCD3C0] text-[#595247] hover:border-[#0D0D0D] hover:text-[#0D0D0D]'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search, Sort & Filters Row */}
          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8072]" />
              <input
                id="input-shop-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                className="w-full bg-white border border-[#D5C9B7] focus:border-[#0D0D0D] pl-8 pr-7 py-1.5 text-xs text-[#1A1A1A] outline-none rounded-xs font-sans transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A8072] hover:text-black cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                id="select-shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#D5C9B7] text-xs font-sans text-[#2C2720] px-3 py-1.5 rounded-xs outline-none focus:border-[#0D0D0D] cursor-pointer"
              >
                <option value="featured">Featured Pieces</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            {/* Filter Toggle on Mobile / Compact */}
            <button
              id="btn-toggle-shop-filters"
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`p-1.5 md:hidden border rounded-xs transition-colors cursor-pointer ${hasActiveFilters ? 'bg-[#D8B26E] border-[#D8B26E] text-black' : 'bg-white border-[#D5C9B7] text-[#2C2720]'
                }`}
            >
              <SlidersHorizontal size={15} />
            </button>
          </div>
        </div>

        {/* Desktop Secondary Filters (Price + Tags) */}
        <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between mt-2.5 pt-2.5 border-t border-[#EDE5D4] text-xs font-sans">
          {/* Price Range Pills */}
          <div className="flex items-center gap-2">
            <span className="text-[#8A8072] font-medium text-[11px] uppercase tracking-wider">Price:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'under-500', label: 'Under ₹500' },
              { id: '500-700', label: '₹500 - ₹700' },
              { id: 'above-700', label: '₹700+' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPriceFilter(p.id)}
                className={`px-2.5 py-1 text-[11px] rounded-xs transition-colors cursor-pointer ${priceFilter === p.id
                    ? 'bg-[#E5DAC6] text-[#1A1A1A] font-semibold'
                    : 'text-[#696052] hover:text-black hover:bg-[#F2ECE0]'
                  }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Curated Tags */}
          <div className="flex items-center gap-2">
            <span className="text-[#8A8072] font-medium text-[11px] uppercase tracking-wider">Highlight:</span>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-2.5 py-1 text-[11px] rounded-xs capitalize transition-colors cursor-pointer ${selectedTag === t
                    ? 'bg-[#E5DAC6] text-[#1A1A1A] font-semibold'
                    : 'text-[#696052] hover:text-black hover:bg-[#F2ECE0]'
                  }`}
              >
                {t === 'all' ? 'All Tags' : t}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="ml-3 text-[11px] text-[#9E2B2B] hover:underline font-medium cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer Dropdown */}
        {isFilterDrawerOpen && (
          <div className="md:hidden mt-3 p-3 bg-white border border-[#D5CABB] rounded-xs space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#736A5D] font-bold block mb-1">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-500', label: 'Under ₹500' },
                  { id: '500-700', label: '₹500 - ₹700' },
                  { id: 'above-700', label: '₹700+' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriceFilter(p.id)}
                    className={`py-1.5 px-2 text-xs rounded-xs border text-left cursor-pointer ${priceFilter === p.id
                        ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                        : 'bg-[#FAF7F2] border-[#DCD3C0] text-[#3D372E]'
                      }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#736A5D] font-bold block mb-1">
                Highlight
              </label>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTag(t)}
                    className={`py-1 px-2.5 text-xs rounded-xs border capitalize cursor-pointer ${selectedTag === t
                        ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                        : 'bg-[#FAF7F2] border-[#DCD3C0] text-[#3D372E]'
                      }`}
                  >
                    {t === 'all' ? 'All' : t}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="w-full py-2 text-center text-xs text-[#9E2B2B] bg-[#FDEDEC] font-semibold rounded-xs cursor-pointer"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* 3. PRODUCT CATALOG GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E8DEC9] p-8 max-w-md mx-auto my-8 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FAF2E1] text-[#9E7A32] flex items-center justify-center mx-auto mb-3">
              <Search size={22} />
            </div>
            <h3 className="font-serif-luxury text-xl text-[#141210]">
              No Masterpieces Found
            </h3>
            <p className="text-xs text-[#6B6357] font-sans mt-1.5 mb-5">
              We couldn't find any jewelry matching your selected filters. Try broadening your criteria.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-[#0D0D0D] text-[#FAF7F2] hover:bg-[#D8B26E] hover:text-black text-xs font-sans uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = (wishlistIds || []).includes(product.id);
              const discountPercent = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  id={`shop-product-card-${product.id}`}
                  className="group flex flex-col bg-white border border-[#E5DEC9] overflow-hidden relative luxury-card-hover"
                >
                  {/* Image Container with Hover Swap */}
                  <div
                    className="relative w-full aspect-[4/5] bg-[#F5EFEB] overflow-hidden cursor-pointer"
                    onClick={() => onQuickView(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${product.hoverImage ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'
                        }`}
                    />
                    {product.hoverImage && (
                      <img
                        src={product.hoverImage}
                        alt={`${product.name} alternate angle`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    )}

                    {/* Tag / Badge */}
                    {product.tag && (
                      <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#121110]/95 backdrop-blur-xs text-[#EBD5A0] text-[8px] sm:text-[9px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 border border-[#D8B26E]/50 shadow-xs z-10">
                        {product.tag}
                      </span>
                    )}

                    {/* Discount Badge */}
                    {discountPercent > 0 && (
                      <span className="absolute bottom-2 left-2 bg-[#2E5E3B] text-white text-[8px] sm:text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-xs shadow-xs z-10">
                        {discountPercent}% OFF
                      </span>
                    )}

                    {/* Wishlist Heart Icon */}
                    <button
                      id={`btn-shop-wishlist-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      aria-label={`Toggle wishlist for ${product.name}`}
                      className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer z-20 tap-bounce ${isWishlisted
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

                    {/* Desktop Overlay Quick Actions */}
                    <div className="hidden md:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent items-center justify-center gap-2 z-20 card-quick-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="px-2.5 py-1.5 bg-white text-[#121110] hover:bg-[#FAF7F2] text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 cursor-pointer"
                      >
                        <Eye size={13} />
                        <span>Quick View</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="px-2.5 py-1.5 bg-[#D8B26E] hover:bg-[#EBD5A0] text-[#0D0D0D] text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md hover:scale-105 cursor-pointer luxury-shimmer-btn"
                      >
                        <ShoppingBag size={13} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      {/* Rating Row */}
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
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

                      {/* Material Spec */}
                      <p className="text-[10px] sm:text-[11px] text-[#7A7163] font-sans truncate mt-0.5">
                        {product.material}
                      </p>
                    </div>

                    {/* Price and Instant Actions */}
                    <div className="mt-3 pt-2.5 border-t border-[#F2ECE1]">
                      <div className="flex items-baseline justify-between mb-2">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-sans font-semibold text-xs sm:text-sm md:text-base text-[#141210]">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] sm:text-[11px] text-[#9E9486] line-through font-sans">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-[#2F663B] font-sans font-semibold">
                          In Stock
                        </span>
                      </div>

                      {/* Dual Action Buttons (Add + Buy Now) */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="py-1.5 px-2 bg-white border border-[#141210] hover:bg-[#141210] hover:text-white text-[#141210] text-[10px] sm:text-[11px] font-sans uppercase font-medium tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer rounded-xs"
                        >
                          <ShoppingBag size={11} />
                          <span>Add</span>
                        </button>
                        <button
                          onClick={() => onBuyNow(product)}
                          className="py-1.5 px-2 bg-[#0D0D0D] hover:bg-[#D8B26E] hover:text-black text-[#FAF7F2] text-[10px] sm:text-[11px] font-sans uppercase font-semibold tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer rounded-xs shadow-xs"
                        >
                          <Zap size={11} className="text-[#D8B26E] fill-current" />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. VALUE & ASSURANCES STRIP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#141210] border border-[#2D2821] text-[#FAF7F2] p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1F1C18] border border-[#D8B26E]/40 text-[#D8B26E] flex items-center justify-center mb-2.5">
              <Sparkles size={18} />
            </div>
            <h4 className="text-xs font-sans font-semibold tracking-wider uppercase text-[#EBD5A0]">
              18K Gold Plated
            </h4>
            <p className="text-[11px] text-[#8C8273] font-sans mt-1">
              Ethical craftsmanship & anti-tarnish finish
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1F1C18] border border-[#D8B26E]/40 text-[#D8B26E] flex items-center justify-center mb-2.5">
              <Truck size={18} />
            </div>
            <h4 className="text-xs font-sans font-semibold tracking-wider uppercase text-[#EBD5A0]">
              Free Express Shipping
            </h4>
            <p className="text-[11px] text-[#8C8273] font-sans mt-1">
              Complimentary on all orders over ₹499
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1F1C18] border border-[#D8B26E]/40 text-[#D8B26E] flex items-center justify-center mb-2.5">
              <RotateCcw size={18} />
            </div>
            <h4 className="text-xs font-sans font-semibold tracking-wider uppercase text-[#EBD5A0]">
              7-Day Returns
            </h4>
            <p className="text-[11px] text-[#8C8273] font-sans mt-1">
              Hassle-free replacement or full refund
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1F1C18] border border-[#D8B26E]/40 text-[#D8B26E] flex items-center justify-center mb-2.5">
              <ShieldCheck size={18} />
            </div>
            <h4 className="text-xs font-sans font-semibold tracking-wider uppercase text-[#EBD5A0]">
              Certified Authenticity
            </h4>
            <p className="text-[11px] text-[#8C8273] font-sans mt-1">
              Certificate included with every jewellery box
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
