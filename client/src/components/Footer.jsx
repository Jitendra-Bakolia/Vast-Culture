import React, { useState } from 'react';
import { ArrowRight, Instagram, Facebook, Youtube, Check, ChevronDown } from 'lucide-react';
import logo from '../img/logo.png';

const PinterestIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

export const Footer = ({
  onNavigateToHome,
  onNavigateToShop,
  onNavigateSection,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

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

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <footer 
      id="footer"
      aria-label="Footer"
      className="w-full bg-[#0D0D0D] border-t border-[#23201B] text-[#FAF7F2] pt-14 sm:pt-18 md:pt-20 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid: 1 col on mobile, 2 col on tablet, 12 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-[#26221C]">
          {/* Brand Statement & Socials (5 Cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:pr-6">
            <div 
              onClick={onNavigateToHome}
              className="cursor-pointer mb-5 flex items-center gap-3 leading-none select-none group"
            >
              <div className="relative flex-shrink-0 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Vast Culture"
                  className="w-10 h-10 object-contain drop-shadow-[0_1px_8px_rgba(216,178,110,0.35)] group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-cinzel-luxury text-[20px] sm:text-[22px] tracking-[0.24em] font-semibold text-[#F5E8D0] group-hover:text-white transition-colors">
                  VAST
                </span>
                <span className="font-cinzel-luxury text-[11px] sm:text-[12px] tracking-[0.44em] font-medium text-[#D8B26E] group-hover:text-[#F3D79B] transition-colors mt-0.5">
                  CULTURE
                </span>
              </div>
            </div>

            <div className="font-serif-luxury text-sm sm:text-base text-[#D4CDC3] leading-relaxed mb-6 sm:mb-7 italic space-y-0.5">
              <p>Jewelry that defines you.</p>
              <p>Crafted with purpose,</p>
              <p>made to be cherished forever.</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 sm:space-x-4 text-[#C4B7A6]">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#181614] border border-[#2B2721] flex items-center justify-center hover:text-[#D8B26E] hover:border-[#D8B26E] transition-colors cursor-pointer"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#181614] border border-[#2B2721] flex items-center justify-center hover:text-[#D8B26E] hover:border-[#D8B26E] transition-colors cursor-pointer"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#pinterest"
                aria-label="Pinterest"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#181614] border border-[#2B2721] flex items-center justify-center hover:text-[#D8B26E] hover:border-[#D8B26E] transition-colors cursor-pointer"
              >
                <PinterestIcon size={15} />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#181614] border border-[#2B2721] flex items-center justify-center hover:text-[#D8B26E] hover:border-[#D8B26E] transition-colors cursor-pointer"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Center-Left: QUICK LINKS */}
          <div className="lg:col-span-2 border-t border-[#23201B] lg:border-t-0 pt-4 lg:pt-0">
            <button
              onClick={() => toggleAccordion('links')}
              className="w-full flex items-center justify-between lg:pointer-events-none text-left mb-3 lg:mb-5 cursor-pointer"
            >
              <h3 className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-[#D8B26E]">
                QUICK LINKS
              </h3>
              <ChevronDown
                size={16}
                className={`text-[#D8B26E] lg:hidden transition-transform ${
                  openAccordion === 'links' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <ul className={`space-y-2.5 sm:space-y-3 font-sans text-xs text-[#B5ABA0] ${
              openAccordion === 'links' ? 'block pb-3' : 'hidden lg:block'
            }`}>
              {[
                { name: 'Home', action: () => onNavigateToHome?.() },
                { name: 'Shop All Pieces', action: () => onNavigateToShop?.() },
                { name: 'Earrings Collection', action: () => onNavigateToShop?.('Earrings') },
                { name: 'Necklaces & Pendants', action: () => onNavigateToShop?.('Necklaces') },
                { name: 'Bracelets & Cuffs', action: () => onNavigateToShop?.('Bracelets') },
                { name: 'Statement Rings', action: () => onNavigateToShop?.('Rings') },
                { name: 'About Us', action: () => onNavigateSection?.('our-story') },
                { name: 'Contact Us', action: () => onNavigateSection?.('footer') },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.action}
                    className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-all text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Center-Right: CUSTOMER CARE */}
          <div className="lg:col-span-2 border-t border-[#23201B] lg:border-t-0 pt-4 lg:pt-0">
            <button
              onClick={() => toggleAccordion('care')}
              className="w-full flex items-center justify-between lg:pointer-events-none text-left mb-3 lg:mb-5 cursor-pointer"
            >
              <h3 className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-[#D8B26E]">
                CUSTOMER CARE
              </h3>
              <ChevronDown
                size={16}
                className={`text-[#D8B26E] lg:hidden transition-transform ${
                  openAccordion === 'care' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <ul className={`space-y-2.5 sm:space-y-3 font-sans text-xs text-[#B5ABA0] ${
              openAccordion === 'care' ? 'block pb-3' : 'hidden lg:block'
            }`}>
              {['Track Your Order', 'Shipping & Delivery', 'Returns & Exchanges', 'Jewelry Care Guide', 'FAQs'].map((item) => (
                <li key={item}>
                  <a
                    href="#care"
                    className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: NEWSLETTER */}
          <div className="lg:col-span-3 border-t border-[#23201B] lg:border-t-0 pt-6 lg:pt-0">
            <h3 className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-[#D8B26E] mb-3">
              THE VAST SOCIETY
            </h3>
            <p className="text-xs text-[#B5ABA0] font-sans font-light leading-relaxed mb-4">
              Subscribe for early access to private vault drops, styling guides, and 10% off your first order.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#1C281F] border border-[#376642] text-[#A6E8B5] text-xs font-sans flex items-center gap-2 rounded-xs">
                <Check size={16} />
                <span>Welcome to the Vast Society.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181614] border border-[#332D24] focus:border-[#D8B26E] px-3.5 py-2.5 text-xs text-[#FAF7F2] placeholder-[#786F63] outline-none rounded-xs font-sans transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 px-3 py-1.5 bg-[#D8B26E] text-black hover:bg-[#EBD5A0] text-xs transition-colors rounded-xs cursor-pointer"
                  >
                    <ArrowRight size={13} />
                  </button>
                </div>
                <span className="text-[10px] text-[#736B5E] font-sans block">
                  By joining, you agree to our Privacy Policy. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#786F63]">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} VAST CULTURE. All rights reserved. Crafted with timeless precision.</p>
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#A69A89]">
            <span className="px-2 py-1 bg-[#1A1815] border border-[#2B2720] rounded-xs">UPI</span>
            <span className="px-2 py-1 bg-[#1A1815] border border-[#2B2720] rounded-xs">VISA</span>
            <span className="px-2 py-1 bg-[#1A1815] border border-[#2B2720] rounded-xs">MASTERCARD</span>
            <span className="px-2 py-1 bg-[#1A1815] border border-[#2B2720] rounded-xs">NET BANKING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
