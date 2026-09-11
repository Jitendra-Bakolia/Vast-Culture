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
        className="w-full max-w-2xl bg-[#FAF7F2] border border-[#D8CEBA] shadow-2xl p-6 relative animate-in fade-in slide-in-from-top-4 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Close search"
          className="absolute top-4 right-4 text-[#665D4F] hover:text-black p-1 cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="mb-6 pr-8">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#9E7A32] font-semibold block mb-1">
            Search The Collection
          </span>
          <div className="relative mt-2">
            <Search size={18} className="absolute left-3.5 top-3.5 text-[#9E7A32]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search earrings, rings, necklaces, bracelets..."
              className="w-full bg-white border border-[#D5CABB] text-sm font-sans pl-11 pr-4 py-3 outline-none text-[#1A1A1A] placeholder-[#8A8174] focus:border-[#D8B26E]"
            />
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-[11px] text-[#786F61] font-sans">Popular:</span>
          {['Pearl Drop', 'Chain Bracelet', 'Flower Ring', 'Pendant', '18k Gold'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-[11px] font-sans px-2.5 py-1 bg-white border border-[#E0D5BE] text-[#4A4337] hover:border-[#9E7A32] hover:text-[#9E7A32] transition-colors rounded-xs cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-[#786F61] text-xs font-sans">
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
                className="flex items-center justify-between p-2.5 bg-white hover:bg-[#F2EAE0] border border-[#E8DEC9] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover bg-[#F5EFEB]"
                  />
                  <div>
                    <h4 className="font-serif-luxury text-sm text-[#141210] font-medium group-hover:text-[#9E7A32] transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-[#786F61] font-sans">
                      <span className="uppercase tracking-wider">{product.category}</span>
                      <span>•</span>
                      <div className="flex text-[#D8B26E] items-center">
                        <Star size={9} fill="#D8B26E" strokeWidth={0} />
                        <span className="ml-1 text-[#5E574B]">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pr-2">
                  <span className="font-sans font-semibold text-xs text-[#1A1A1A]">
                    ₹{product.price}
                  </span>
                  <ArrowRight size={14} className="text-[#9E7A32] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
