import React from 'react';
import { X, ChevronRight, Heart, Sparkles, Phone, Mail, LogOut } from 'lucide-react';

export const MobileNavDrawer = ({
  isOpen,
  onClose,
  onNavigateSection,
  onNavigateToHome,
  onNavigateToShop,
  wishlistCount,
  onOpenWishlist,
  currentUser,
  onOpenAuth,
  onOpenProfile,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="mobile-nav-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex justify-start animate-in fade-in duration-200"
    >
      <div 
        id="mobile-nav-panel"
        className="w-[85%] max-w-xs bg-[#0D0D0D] border-r border-[#2B2721] h-full flex flex-col justify-between text-[#FAF7F2] p-6 animate-in slide-in-from-left duration-300 overflow-y-auto"
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#23201B]">
            <div 
              onClick={() => {
                onNavigateToHome();
                onClose();
              }}
              className="flex flex-col leading-none cursor-pointer"
            >
              <span className="font-cinzel-luxury text-[17px] tracking-[0.28em] font-semibold text-[#D8B26E]">
                VAST
              </span>
              <span className="font-cinzel-luxury text-[11px] tracking-[0.42em] font-medium text-[#C49E59] -mt-0.5">
                CULTURE
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close navigation"
              className="text-[#9E9486] hover:text-white p-1 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Profile Banner or Login Action */}
          <div className="py-4 border-b border-[#23201B]">
            {currentUser ? (
              <div className="bg-[#181614] border border-[#2F2921] p-3 rounded-xs flex items-center justify-between">
                <div 
                  onClick={() => {
                    onClose();
                    onOpenProfile();
                  }}
                  className="flex items-center gap-2.5 cursor-pointer min-w-0"
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#D8B26E] shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#26211A] text-[#D8B26E] font-bold text-xs flex items-center justify-center border border-[#D8B26E] shrink-0">
                      {currentUser.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-[#EBD5A0] truncate">
                      {currentUser.name}
                    </h4>
                    <span className="text-[10px] text-[#8C8273] truncate block">
                      {currentUser.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="text-[#8C8273] hover:text-[#B53B3B] p-1.5 transition-colors cursor-pointer"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuth('login');
                  }}
                  className="py-2 px-3 bg-[#D8B26E] hover:bg-[#EBD5A0] text-black text-xs font-sans font-semibold uppercase tracking-wider rounded-xs text-center transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuth('register');
                  }}
                  className="py-2 px-3 bg-[#1A1815] border border-[#3D3528] hover:border-[#D8B26E] text-[#EBD5A0] text-xs font-sans uppercase tracking-wider rounded-xs text-center transition-colors cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Nav Links */}
          <nav className="py-4 space-y-2">
            {/* Home */}
            <button
              onClick={() => {
                onNavigateToHome();
                onClose();
              }}
              className="w-full flex items-center justify-between py-2 text-left font-sans text-xs tracking-[0.18em] uppercase text-[#E5DFD5] hover:text-[#D8B26E] transition-colors border-b border-[#1A1815] cursor-pointer"
            >
              <span>Home</span>
              <ChevronRight size={14} className="text-[#696155]" />
            </button>

            {/* Shop (All Collections Vault Page) */}
            <button
              onClick={() => {
                onNavigateToShop();
                onClose();
              }}
              className="w-full flex items-center justify-between py-2 text-left font-sans text-xs tracking-[0.18em] uppercase text-[#D8B26E] hover:text-[#EBD5A0] transition-colors border-b border-[#1A1815] cursor-pointer font-medium"
            >
              <div className="flex items-center gap-2">
                <span>Shop All Collections</span>
                <span className="bg-[#D8B26E] text-black text-[9px] font-bold px-1.5 py-0.5 rounded-xs">
                  Vault
                </span>
              </div>
              <ChevronRight size={14} className="text-[#D8B26E]" />
            </button>

            {/* Sub categories shortcuts */}
            <div className="pl-3 py-1 space-y-1.5 border-b border-[#1A1815]">
              {['Earrings', 'Necklaces', 'Bracelets', 'Rings'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onNavigateToShop(cat);
                    onClose();
                  }}
                  className="w-full text-left font-sans text-[11px] text-[#A69C8E] hover:text-[#D8B26E] transition-colors py-1 flex items-center justify-between cursor-pointer"
                >
                  <span>{cat}</span>
                  <span className="text-[9px] text-[#696155]">View →</span>
                </button>
              ))}
            </div>

            {/* About Us */}
            <button
              onClick={() => {
                onNavigateSection('our-story');
                onClose();
              }}
              className="w-full flex items-center justify-between py-2 text-left font-sans text-xs tracking-[0.18em] uppercase text-[#E5DFD5] hover:text-[#D8B26E] transition-colors border-b border-[#1A1815] cursor-pointer"
            >
              <span>About Us</span>
              <ChevronRight size={14} className="text-[#696155]" />
            </button>

            {/* Reviews */}
            <button
              onClick={() => {
                onNavigateSection('customer-reviews');
                onClose();
              }}
              className="w-full flex items-center justify-between py-2 text-left font-sans text-xs tracking-[0.18em] uppercase text-[#E5DFD5] hover:text-[#D8B26E] transition-colors border-b border-[#1A1815] cursor-pointer"
            >
              <span>Customer Reviews</span>
              <ChevronRight size={14} className="text-[#696155]" />
            </button>

            {/* Contact */}
            <button
              onClick={() => {
                onNavigateSection('footer');
                onClose();
              }}
              className="w-full flex items-center justify-between py-2 text-left font-sans text-xs tracking-[0.18em] uppercase text-[#E5DFD5] hover:text-[#D8B26E] transition-colors border-b border-[#1A1815] cursor-pointer"
            >
              <span>Contact</span>
              <ChevronRight size={14} className="text-[#696155]" />
            </button>
          </nav>

          {/* Quick Wishlist button */}
          <button
            onClick={() => {
              onOpenWishlist();
              onClose();
            }}
            className="w-full py-2.5 px-3 bg-[#1A1815] border border-[#2E2922] flex items-center justify-between text-xs font-sans text-[#EBD5A0] hover:border-[#D8B26E] transition-colors mb-4 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Heart size={14} className="text-[#D8B26E]" />
              <span>Saved Wishlist</span>
            </span>
            <span className="bg-[#D8B26E] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {wishlistCount}
            </span>
          </button>
        </div>

        {/* Bottom Concierge */}
        <div className="pt-4 border-t border-[#23201B] text-xs font-sans text-[#8A8174] space-y-2">
          <div className="flex items-center gap-2 text-[#C4B7A6]">
            <Sparkles size={13} className="text-[#D8B26E]" />
            <span className="text-[11px] tracking-wider uppercase">Concierge Service</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#D8B26E]">
            <Phone size={12} />
            <span>+91 98110 54321</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#D8B26E]">
            <Mail size={12} />
            <span>care@vastculture.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
