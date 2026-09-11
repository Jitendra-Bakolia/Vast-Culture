import React, { useState } from 'react';
import { ArrowRight, Instagram, Facebook, Youtube, Check } from 'lucide-react';

const PinterestIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

export const DesktopFooter = ({ onShopClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
      id="footer"
      aria-label="Footer"
      className="w-full bg-[#0D0D0D] border-t border-[#23201B] text-[#FAF7F2] pt-20 pb-12 px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#26221C]">
          {/* Left Column: Brand Statement & Socials (4 Cols) */}
          <div className="md:col-span-4 flex flex-col items-start pr-4">
            <div className="cursor-pointer mb-6 flex flex-col leading-none">
              <span className="font-cinzel-luxury text-[22px] tracking-[0.32em] font-semibold text-[#D8B26E]">
                VAST
              </span>
              <span className="font-cinzel-luxury text-[14px] tracking-[0.48em] font-medium text-[#C49E59] -mt-0.5">
                CULTURE
              </span>
            </div>

            <div className="font-serif-luxury text-base text-[#D4CDC3] leading-relaxed mb-8 italic space-y-1">
              <p>Jewelry that defines you.</p>
              <p>Crafted with purpose,</p>
              <p>made to be cherished.</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 text-[#C4B7A6]">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#181614] border border-[#2B2721] flex items-center justify-center hover:text-[#D8B26E] hover:border-[#D8B26E] transition-colors"
              >
                <Instagram size={17} />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#181614] border border-[#2B2721] flex items-center justify-center hover:text-[#D8B26E] hover:border-[#D8B26E] transition-colors"
              >
                <Facebook size={17} />
              </a>
              <a
                href="#pinterest"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-[#181614] border border-[#2B2721] flex items-center justify-center hover:text-[#D8B26E] hover:border-[#D8B26E] transition-colors"
              >
                <PinterestIcon size={16} />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[#181614] border border-[#2B2721] flex items-center justify-center hover:text-[#D8B26E] hover:border-[#D8B26E] transition-colors"
              >
                <Youtube size={17} />
              </a>
            </div>
          </div>

          {/* Center-Left: QUICK LINKS (2 Cols) */}
          <div className="md:col-span-2">
            <h3 className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-[#D8B26E] mb-6">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 font-sans text-xs text-[#B5ABA0]">
              {[
                { name: 'Home', link: '#hero' },
                { name: 'Collections', action: onShopClick },
                { name: 'Shop All Jewelry', action: onShopClick },
                { name: 'About Us', link: '#our-story' },
                { name: 'Contact Us', link: '#footer' },
              ].map((item) => (
                <li key={item.name}>
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-all cursor-pointer text-left"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.link}
                      className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-all"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Center-Right: CUSTOMER CARE (3 Cols) */}
          <div className="md:col-span-3">
            <h3 className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-[#D8B26E] mb-6">
              CUSTOMER CARE
            </h3>
            <ul className="space-y-3 font-sans text-xs text-[#B5ABA0]">
              {['Shipping Policy', 'Return & Exchange', "FAQ's", 'Track Order', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: SHOP INFO & NEWSLETTER (3 Cols) */}
          <div className="md:col-span-3">
            <div className="mb-8">
              <h3 className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-[#D8B26E] mb-4">
                SHOP INFO
              </h3>
              <ul className="space-y-2.5 font-sans text-xs text-[#B5ABA0]">
                {['Payment Methods', 'Size Guide', 'Jewelry Care'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-all"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h3 className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-[#D8B26E] mb-2">
                NEWSLETTER
              </h3>
              <p className="text-xs text-[#A89E92] font-sans font-light mb-3 leading-relaxed">
                Subscribe to get special offers and updates.
              </p>

              {subscribed ? (
                <div className="bg-[#1C281F] border border-[#3E6547] text-[#9FE3AC] px-3.5 py-2.5 text-xs flex items-center gap-2">
                  <Check size={14} />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    aria-label="Email for newsletter"
                    className="w-full bg-[#171513] border border-[#383229] focus:border-[#D8B26E] text-[#FAF7F2] placeholder-[#736B60] text-xs px-3.5 py-3 pr-10 outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#D8B26E] hover:bg-[#EBD5A0] text-[#0D0D0D] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8174] font-sans">
          <p>© 2025 Vast Culture. All Rights Reserved.</p>

          {/* Payment Icons */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] uppercase tracking-wider text-[#696155] mr-1">We Accept:</span>
            {['Visa', 'Mastercard', 'PayPal', 'UPI'].map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 bg-[#1A1815] border border-[#2B2721] text-[10px] font-medium tracking-wide text-[#DDD5C7] rounded-xs"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
