import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Lock, Truck, CheckCircle2 } from 'lucide-react';

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('VAST10');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = (items || []).reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const freeShippingThreshold = 999;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 99;
  const finalTotal = subtotal - discount + shippingFee;

  const progressStep = Math.min(100, Math.max(0, Math.round(progressToFreeShipping / 5) * 5));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase().trim() === 'VAST10') {
      setDiscountApplied(true);
      setCouponError('');
    } else {
      setDiscountApplied(false);
      setCouponError('Invalid coupon code. Use "VAST10" for 10% off.');
    }
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end transition-opacity duration-300"
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#FAF7F2] h-full flex flex-col shadow-2xl text-[#1E1B18] border-l border-[#E2D8C6] animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFC8] bg-[#FAF4EB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-[#9E7A32]" />
            <h2 className="font-serif-luxury text-xl font-normal text-[#121110]">
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            id="btn-close-cart"
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-[#6B6152] hover:text-black transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#FAF7F2] via-[#F4EDE2] to-[#FAF7F2] border-b border-[#E8DFC8]">
          <div className="flex items-center justify-between text-xs font-sans mb-1.5">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-[#2F663B] font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#2F663B]" />
                You unlocked FREE Express Shipping!
              </span>
            ) : (
              <span className="text-[#4A4337] flex items-center gap-1.5 font-medium">
                <Truck size={13} className="text-[#9E7A32]" />
                <span>Add <strong className="text-[#9E7A32] font-semibold">₹{remainingForFreeShipping}</strong> more for <strong>FREE Shipping</strong></span>
              </span>
            )}
            <span className="text-[11px] font-sans font-semibold text-[#9E7A32]">{progressStep}%</span>
          </div>
          <div className="shipping-progress-track">
            <div
              className={`shipping-progress-bar progress-${progressStep} progress-bar-shimmer`}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#736B5E]">
              <div className="w-16 h-16 rounded-full bg-[#F0E6D8] flex items-center justify-center mb-4 text-[#A8987E]">
                <ShoppingBag size={28} />
              </div>
              <p className="font-serif-luxury text-xl text-[#1E1B18] mb-1">Your bag is empty</p>
              <p className="text-xs font-sans max-w-xs mb-6 text-[#736B5E]">
                Discover our signature handcrafted gold and pearl jewellery pieces.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0D0D0D] text-[#FAF7F2] text-xs font-sans tracking-widest uppercase hover:bg-[#D8B26E] hover:text-black transition-colors cursor-pointer"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 p-3 bg-white border border-[#E8DFC8] relative group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  loading="lazy"
                  decoding="async"
                  width="80"
                  height="80"
                  className="w-20 h-20 object-cover bg-[#F5EFEB] shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div className="pr-6">
                    <h3 className="font-serif-luxury text-sm text-[#1A1A1A] font-normal leading-snug line-clamp-1">
                      {item.product.name}
                    </h3>
                    <span className="text-[11px] text-[#786F61] font-sans">
                      18k Gold Plated
                    </span>
                    <div className="text-xs font-sans font-semibold text-[#1A1A1A] mt-1">
                      ₹{item.product.price}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#DCD3C0] bg-[#FAF7F2]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#524B3F] hover:bg-[#EDE3D0] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-2.5 text-xs font-sans font-semibold text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#524B3F] hover:bg-[#EDE3D0] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      aria-label="Remove item"
                      className="text-[#998E80] hover:text-[#B53B3B] p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals and checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8DFC8] bg-[#FAF4EB] space-y-3">
            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={13} className="absolute left-2.5 top-3 text-[#8A7E6C]" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full bg-white border border-[#DCD3C0] text-xs font-sans pl-8 pr-3 py-2 outline-none uppercase font-semibold text-[#1A1A1A] focus:border-[#D8B26E]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1A1815] text-[#FAF7F2] text-xs font-sans uppercase tracking-wider hover:bg-[#D8B26E] hover:text-black transition-colors cursor-pointer"
              >
                {discountApplied ? 'Applied' : 'Apply'}
              </button>
            </form>
            {couponError && (
              <p className="text-[11px] text-[#B53B3B] font-sans">{couponError}</p>
            )}
            {discountApplied && (
              <p className="text-[11px] text-[#2F663B] font-sans font-medium">
                ✓ 10% discount applied with code VAST10 (-₹{discount})
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs font-sans text-[#524B3F] pt-2 border-t border-[#E2D8C6]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-[#2F663B] font-medium">
                  <span>Promo Discount (10%)</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-[#2F663B]">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#121110] pt-2 border-t border-[#E2D8C6]">
                <span>Total Amount</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="btn-cart-checkout"
              onClick={onCheckout}
              className="w-full py-3.5 bg-[#0D0D0D] hover:bg-[#D8B26E] hover:text-black text-[#FAF7F2] font-sans font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 cursor-pointer luxury-shimmer-btn group"
            >
              <Lock size={14} className="text-[#D8B26E] group-hover:text-black group-hover:scale-110 transition-transform duration-300" />
              <span>PROCEED TO SECURE CHECKOUT</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7A7163] font-sans text-center">
              <ShieldCheck size={13} className="text-[#9E7A32]" />
              <span>100% Safe & Secure Checkout · 7-Day Hassle Free Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
