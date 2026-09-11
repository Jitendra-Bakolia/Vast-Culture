import React, { useState } from 'react';
import { ALL_COLLECTION_PRODUCTS } from '../data/mockData';
import { Search, X, Star, ArrowRight } from 'lucide-react';

export const SearchModal = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = ALL_COLLECTION_PRODUCTS.filter((product) => {
    const q = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q)
    );
  });

  return (
    <div 
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-start justify-center pt-16 px-4"
    >
      <div 
        id="search-modal-content"
        className="w-full max-w-2xl bg-[#12100E] border border-[#2E271D] text-[#FAF6EE] shadow-2xl p-6 relative animate-in fade-in slide-in-from-top-4 duration-200 rounded-xs"
      >
        <button
          onClick={onClose}
          aria-label="Close search"
          className="absolute top-4 right-4 text-[#8C8273] hover:text-white p-1 cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="mb-6 pr-8">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#D8B26E] font-semibold block mb-1">
            Search The Collection
          </span>
          <div className="relative mt-2">
            <Search size={18} className="absolute left-3.5 top-3.5 text-[#D8B26E]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search earrings, rings, necklaces, bracelets..."
              className="w-full bg-[#181512] border border-[#2C251C] text-sm font-sans pl-11 pr-4 py-3 outline-none text-[#FAF6EE] placeholder-[#8A8072] focus:border-[#D8B26E] rounded-xs"
            />
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-[11px] text-[#8C8273] font-sans">Popular:</span>
          {['Pearl Drop', 'Chain Bracelet', 'Flower Ring', 'Pendant', '18k Gold'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-[11px] font-sans px-2.5 py-1 bg-[#181512] border border-[#2A241C] text-[#C5BCAD] hover:border-[#D8B26E] hover:text-[#FAF6EE] transition-colors rounded-xs cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-[#A89F91] text-xs font-sans">
              No jewellery pieces matching “{query}”. Try searching for “pearl”, “gold”, or “ring”.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 bg-[#161310] hover:bg-[#1E1A14] border border-[#262018] hover:border-[#D8B26E]/50 cursor-pointer transition-colors group rounded-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    width="48"
                    height="48"
                    className="w-12 h-12 object-cover bg-[#1A1713] rounded-xs"
                  />
                  <div>
                    <h4 className="font-serif-luxury text-sm text-[#FAF6EE] font-medium group-hover:text-[#E5C378] transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-[#8C8273] font-sans">
                      <span className="uppercase tracking-wider">{product.category}</span>
                      <span>•</span>
                      <div className="flex text-[#D8B26E] items-center">
                        <Star size={9} fill="#D8B26E" strokeWidth={0} />
                        <span className="ml-1 text-[#A89F91]">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pr-2">
                  <span className="font-sans font-semibold text-xs text-[#E5C378]">
                    ₹{product.price}
                  </span>
                  <ArrowRight size={14} className="text-[#D8B26E] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
