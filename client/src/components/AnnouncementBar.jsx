import React, { useState } from 'react';
import { X, Sparkles, Check, Copy } from 'lucide-react';

export const AnnouncementBar = ({ 
  onClose,
  visible = true 
}) => {
  const [copied, setCopied] = useState(false);

  if (!visible) return null;

  const handleCopyCode = (e) => {
    e.stopPropagation();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText('VAST10');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <aside 
      id="announcement-bar"
      aria-label="Promotional Announcement"
      className="w-full bg-[#0E0D0C] border-b border-[#D8B26E]/25 text-[#E0D8CE] py-1.5 px-3 sm:px-6 transition-all duration-300 relative z-30 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Centered Luxury Messaging */}
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center flex-wrap">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.16em] uppercase font-sans font-medium text-[#E0D8CE]">
            <Sparkles size={11} className="text-[#D8B26E] shrink-0" />
            <span>Complimentary Express Shipping Over ₹999</span>
          </div>

          <span className="hidden sm:inline text-[#D8B26E]/60 text-xs">✦</span>

          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.14em] uppercase font-sans text-[#C4B7A6]">
            <span>Code</span>
            <button
              onClick={handleCopyCode}
              title="Click to copy code VAST10"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1C1915] border border-[#D8B26E]/60 hover:border-[#D8B26E] text-[#EBD5A0] hover:text-white transition-all cursor-pointer font-sans font-semibold text-[10px] tracking-wider tap-bounce group shadow-xs"
            >
              <span>VAST10</span>
              {copied ? (
                <Check size={10} className="text-[#48BB78]" />
              ) : (
                <Copy size={10} className="text-[#D8B26E] opacity-80 group-hover:opacity-100" />
              )}
            </button>
            <span className="text-[#EBD5A0] font-medium">{copied ? '(Copied!)' : 'for 10% off'}</span>
          </div>
        </div>

        {/* Dismiss Button */}
        {onClose && (
          <button
            id="btn-close-announcement"
            onClick={onClose}
            aria-label="Dismiss announcement"
            className="text-[#8C8375] hover:text-[#EBD5A0] p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer shrink-0 tap-bounce"
          >
            <X size={13} />
          </button>
        )}
      </div>
    </aside>
  );
};

