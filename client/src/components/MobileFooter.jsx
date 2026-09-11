import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, Instagram, Facebook, Youtube, Check } from 'lucide-react';
import logo from '../img/logo.png';

const PinterestIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

export const MobileFooter = ({ onShopClick, onNavigate }) => {
  const [openSection, setOpenSection] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer 
      id="mobile-footer"
      aria-label="Mobile Footer"
      className="w-full bg-[#0A0908] border-t border-[#262018] text-[#FAF6EE] pt-6 pb-5 px-4"
    >
      {/* Centered Brand Logo Lockup */}
      <div 
        onClick={() => onNavigate?.('hero')}
        className="flex items-center justify-center gap-2 mb-2.5 select-none cursor-pointer"
      >
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <img
            src={logo}
            alt="Vast Culture"
            className="w-7 h-7 object-contain drop-shadow-[0_1px_6px_rgba(216,178,110,0.35)]"
          />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-cinzel-luxury text-[16px] tracking-[0.22em] font-semibold text-[#F5E8D0]">
            VAST
          </span>
          <span className="font-cinzel-luxury text-[9.5px] tracking-[0.4em] font-medium text-[#D8B26E] mt-0.5">
            CULTURE
          </span>
        </div>
      </div>

      {/* Short Brand Statement */}
      <div className="font-serif-luxury italic text-[11px] text-center text-[#A89F91] mb-3 space-y-0.5 max-w-xs mx-auto">
        <p>Jewelry that defines you. Crafted with purpose,</p>
        <p>made to be cherished.</p>
      </div>

      {/* Social Icons Centered */}
      <div className="flex items-center justify-center space-x-2.5 text-[#A89F91] mb-4">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-7 h-7 rounded-full bg-[#14120F] border border-[#262018] flex items-center justify-center text-[#D8B26E]"
        >
          <Instagram size={13} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="w-7 h-7 rounded-full bg-[#14120F] border border-[#262018] flex items-center justify-center text-[#D8B26E]"
        >
          <Facebook size={13} />
        </a>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pinterest"
          className="w-7 h-7 rounded-full bg-[#14120F] border border-[#262018] flex items-center justify-center text-[#D8B26E]"
        >
          <PinterestIcon size={12} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="w-7 h-7 rounded-full bg-[#14120F] border border-[#262018] flex items-center justify-center text-[#D8B26E]"
        >
          <Youtube size={13} />
        </a>
      </div>

      {/* Accordion Expandable Sections */}
      <div className="border-t border-[#262018] divide-y divide-[#262018] mb-4">
        {/* Quick Links Accordion */}
        <div>
          <button
            id="btn-accordion-quick-links"
            onClick={() => toggleSection('quick-links')}
            className="w-full py-2.5 flex items-center justify-between text-left font-sans text-[11px] uppercase tracking-[0.16em] text-[#FAF6EE] cursor-pointer"
          >
            <span>Quick Links</span>
            {openSection === 'quick-links' ? (
              <Minus size={13} className="text-[#D8B26E]" />
            ) : (
              <Plus size={13} className="text-[#D8B26E]" />
            )}
          </button>
          {openSection === 'quick-links' && (
            <ul className="pb-2.5 pt-0.5 space-y-1.5 font-sans text-[11px] text-[#A89F91] pl-2">
              {[
                { name: 'Home', action: () => onNavigate?.('hero') },
                { name: 'Collections', action: onShopClick },
                { name: 'Shop All Jewelry', action: onShopClick },
                { name: 'About Us', action: () => onNavigate?.('our-story') },
                { name: 'Contact Us', action: () => onNavigate?.('footer') },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={item.action}
                    className="hover:text-white block py-0.5 text-left cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Customer Care Accordion */}
        <div>
          <button
            id="btn-accordion-customer-care"
            onClick={() => toggleSection('customer-care')}
            className="w-full py-2.5 flex items-center justify-between text-left font-sans text-[11px] uppercase tracking-[0.16em] text-[#FAF6EE] cursor-pointer"
          >
            <span>Customer Care</span>
            {openSection === 'customer-care' ? (
              <Minus size={13} className="text-[#D8B26E]" />
            ) : (
              <Plus size={13} className="text-[#D8B26E]" />
            )}
          </button>
          {openSection === 'customer-care' && (
            <ul className="pb-2.5 pt-0.5 space-y-1.5 font-sans text-[11px] text-[#A89F91] pl-2">
              {['Shipping Policy', 'Return & Exchange', "FAQ's", 'Track Order', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('footer')}
                    className="hover:text-white block py-0.5 text-left cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Shop Info Accordion */}
        <div>
          <button
            id="btn-accordion-shop-info"
            onClick={() => toggleSection('shop-info')}
            className="w-full py-2.5 flex items-center justify-between text-left font-sans text-[11px] uppercase tracking-[0.16em] text-[#FAF6EE] cursor-pointer"
          >
            <span>Shop Info</span>
            {openSection === 'shop-info' ? (
              <Minus size={13} className="text-[#D8B26E]" />
            ) : (
              <Plus size={13} className="text-[#D8B26E]" />
            )}
          </button>
          {openSection === 'shop-info' && (
            <ul className="pb-2.5 pt-0.5 space-y-1.5 font-sans text-[11px] text-[#A89F91] pl-2">
              {['Payment Methods', 'Size Guide', 'Jewelry Care'].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('footer')}
                    className="hover:text-white block py-0.5 text-left cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Newsletter Accordion */}
        <div>
          <button
            id="btn-accordion-newsletter"
            onClick={() => toggleSection('newsletter')}
            className="w-full py-2.5 flex items-center justify-between text-left font-sans text-[11px] uppercase tracking-[0.16em] text-[#FAF6EE] cursor-pointer"
          >
            <span>Newsletter</span>
            {openSection === 'newsletter' ? (
              <Minus size={13} className="text-[#D8B26E]" />
            ) : (
              <Plus size={13} className="text-[#D8B26E]" />
            )}
          </button>
          {openSection === 'newsletter' && (
            <div className="pb-3 pt-1 px-1">
              <p className="text-[11px] text-[#A89F91] font-sans mb-2">
                Subscribe to get special offers and updates.
              </p>
              {subscribed ? (
                <div className="bg-[#14261B] border border-[#235E35] text-[#4ADE80] p-2 text-xs flex items-center gap-1.5 rounded-xs">
                  <Check size={13} />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full bg-[#14120F] border border-[#262018] text-[#FAF6EE] placeholder-[#706759] text-xs px-3 py-1.5 pr-8 outline-none focus:border-[#D8B26E] rounded-xs"
                  />
                  <button
                    type="submit"
                    aria-label="Submit newsletter subscription"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#D8B26E] text-black flex items-center justify-center rounded-xs cursor-pointer"
                  >
                    <ArrowRight size={12} />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Copyright & Payment Badges */}
      <div className="text-center space-y-2 pt-1">
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {['Visa', 'Mastercard', 'UPI', 'Net Banking'].map((badge) => (
            <span
              key={badge}
              className="px-2 py-0.5 bg-[#14120F] border border-[#262018] text-[9px] text-[#A89F91] rounded-xs"
            >
              {badge}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-[#706759] font-sans">
          © {new Date().getFullYear()} Vast Culture. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
