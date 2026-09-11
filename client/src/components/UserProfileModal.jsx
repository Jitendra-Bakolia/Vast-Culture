import React from 'react';
import { X, LogOut, ShieldCheck, Heart, Sparkles, Mail, Phone, Calendar } from 'lucide-react';

export const UserProfileModal = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onOpenWishlist,
}) => {
  if (!isOpen || !user) return null;

  return (
    <div 
      id="user-profile-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div 
        id="user-profile-container"
        className="bg-[#FAF7F2] border border-[#D8CEBA] w-full max-w-md shadow-2xl relative p-6 sm:p-7 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Close profile"
          className="absolute top-4 right-4 text-[#6B6152] hover:text-black p-1.5 rounded-full hover:bg-[#EBE2D0] transition-colors cursor-pointer"
        >
          <X size={19} />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 pb-5 border-b border-[#E8DEC9]">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#D8B26E] shadow-sm"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#1F1C18] text-[#EBD5A0] font-cinzel-luxury text-lg flex items-center justify-center border-2 border-[#D8B26E]">
                {user.name.charAt(0)}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#2F663B] border-2 border-white" title="Active" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#9E7A32] bg-[#FAF2E1] px-2 py-0.5 border border-[#D8B26E]/40">
                Society Member
              </span>
            </div>
            <h2 className="font-serif-luxury text-xl text-[#121110] truncate mt-1">
              {user.name}
            </h2>
            <p className="text-xs text-[#706759] font-sans truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Membership & Loyalty Status */}
        <div className="my-4 p-3.5 bg-[#FAF2E1] border border-[#E5DEC9] rounded-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D8B26E] text-black flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="text-xs font-sans font-semibold text-[#1A1A1A]">
                Gold Tier Rewards
              </div>
              <div className="text-[10px] text-[#73654B] font-sans">
                500 Vast Points Available (₹500 value)
              </div>
            </div>
          </div>
          <span className="text-[10px] font-sans font-bold text-[#8C6D2D] uppercase tracking-wider">
            Active
          </span>
        </div>

        {/* User Details Overview */}
        <div className="space-y-2.5 text-xs font-sans py-2 border-b border-[#E8DEC9] text-[#4A4337]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#7A7163]">
              <Mail size={14} /> Email
            </span>
            <span className="font-medium text-[#1A1A1A]">{user.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#7A7163]">
              <Phone size={14} /> Contact
            </span>
            <span className="font-medium text-[#1A1A1A]">{user.phone || '+91 98765 43210'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#7A7163]">
              <Calendar size={14} /> Member Since
            </span>
            <span className="font-medium text-[#1A1A1A]">{user.joinDate || 'August 2026'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#7A7163]">
              <ShieldCheck size={14} /> Login Provider
            </span>
            <span className="font-medium text-[#1A1A1A] capitalize">{user.provider || 'Google'}</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="py-4 space-y-2">
          <button
            onClick={() => {
              onClose();
              onOpenWishlist();
            }}
            className="w-full py-2.5 px-3 bg-white hover:bg-[#F5EFEB] border border-[#DCD3C0] text-xs font-sans text-[#1A1A1A] rounded-xs flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Heart size={15} className="text-[#D8B26E]" />
              <span>My Saved Wishlist</span>
            </span>
            <span className="text-[11px] text-[#7A7163]">View Items →</span>
          </button>
        </div>

        {/* Sign Out Button */}
        <div className="pt-2">
          <button
            id="btn-profile-logout"
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full py-2.5 bg-[#FAF7F2] hover:bg-[#F9EBEA] border border-[#E6B0AA] text-[#B53B3B] text-xs font-sans font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out of Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
