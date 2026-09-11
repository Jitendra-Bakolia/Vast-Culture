import React from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar = ({ 
  onClose,
  visible = true 
}) => {
  if (!visible) return null;

  return (
    <div 
      id="announcement-bar"
      className="w-full bg-[#FAF4EB] border-b border-[#E8DFC8] text-[#2C2416] py-2 px-4 transition-all duration-300 relative z-30"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="text-[11px] sm:text-[12px] md:text-[13px] font-sans font-medium tracking-wide">
            Free Shipping on all orders above <span className="font-semibold">₹999</span> | Use Code: <span className="font-bold tracking-wider text-[#9E7227] bg-[#F1E5CB] px-1.5 py-0.5 rounded-xs">VAST10</span> for 10% OFF
          </p>
        </div>
        {onClose && (
          <button
            id="btn-close-announcement"
            onClick={onClose}
            aria-label="Close announcement"
            className="text-[#6D5D4B] hover:text-[#1A1A1A] p-0.5 transition-colors ml-2 cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
