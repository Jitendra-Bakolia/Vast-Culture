import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, UserCheck } from 'lucide-react';

export const CheckoutModal = ({
  isOpen,
  onClose,
  items,
  currentUser,
  onOrderComplete,
}) => {
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Priyanka Verma',
    email: currentUser?.email || 'priyankavrma1994@gmail.com',
    phone: currentUser?.phone || '+91 98765 43210',
    address: 'Flat 402, Royal Palms, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    paymentMethod: 'upi',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone,
      }));
    }
  }, [currentUser]);

  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = (items || []).reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal >= 999 ? subtotal : subtotal + 99;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      onOrderComplete();
      setOrderSuccess(false);
      onClose();
    }, 2800);
  };

  return (
    <div 
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div 
        id="checkout-modal-content"
        className="bg-[#12100E] border border-[#2E271D] w-full max-w-xl shadow-2xl relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 text-[#FAF6EE]"
      >
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute top-4 right-4 text-[#A89F91] hover:text-[#FAF6EE] p-1 cursor-pointer"
        >
          <X size={20} />
        </button>

        {orderSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#14261B] border border-[#235E35] text-[#4ADE80] flex items-center justify-center mx-auto shadow-md">
              <Check size={32} />
            </div>
            <span className="text-[10px] tracking-[0.3em] font-sans font-semibold uppercase text-[#D8B26E] block">
              VAST CULTURE ORDER CONFIRMED
            </span>
            <h2 className="font-serif-luxury text-3xl text-[#FAF6EE]">
              Thank You for Your Order!
            </h2>
            <p className="text-xs sm:text-sm text-[#C5BCAD] font-sans max-w-sm mx-auto leading-relaxed">
              Order #VC-2025-8842 has been placed successfully. A bespoke velvet keepsake box is being prepared for you.
            </p>
            <div className="pt-2 text-xs font-sans text-[#A89F91]">
              Estimated delivery: 2-3 business days.
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <span className="font-cinzel-luxury text-xs tracking-[0.25em] font-semibold text-[#D8B26E]">
                  VAST CULTURE
                </span>
                <span className="text-xs text-[#A89F91]">• Secure Checkout</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF6EE] mt-1">
                Complete Your Order
              </h2>

              {currentUser && (
                <div className="mt-3 p-2.5 bg-[#181512] border border-[#2C251C] rounded-xs flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-2 text-[#FAF6EE]">
                    <UserCheck size={15} className="text-[#D8B26E] shrink-0" />
                    <span>Logged in as <strong>{currentUser.name}</strong> ({currentUser.email})</span>
                  </div>
                  <span className="text-[10px] text-[#D8B26E] uppercase font-bold tracking-wider">
                    Verified
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#C5BCAD] font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#181512] border border-[#2C251C] px-3 py-2 text-[#FAF6EE] outline-none focus:border-[#D8B26E] rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#C5BCAD] font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#181512] border border-[#2C251C] px-3 py-2 text-[#FAF6EE] outline-none focus:border-[#D8B26E] rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#C5BCAD] font-medium mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#181512] border border-[#2C251C] px-3 py-2 text-[#FAF6EE] outline-none focus:border-[#D8B26E] rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#C5BCAD] font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#181512] border border-[#2C251C] px-3 py-2 text-[#FAF6EE] outline-none focus:border-[#D8B26E] rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#C5BCAD] font-medium mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-[#181512] border border-[#2C251C] px-3 py-2 text-[#FAF6EE] outline-none focus:border-[#D8B26E] rounded-xs"
                  />
                </div>
              </div>

              {/* Payment selection */}
              <div>
                <label className="block text-[#C5BCAD] font-medium mb-1.5">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / GPay' },
                    { id: 'card', label: 'Credit/Debit Card' },
                    { id: 'cod', label: 'Cash on Delivery' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      className={`p-2 border text-center rounded-xs transition-colors cursor-pointer ${
                        formData.paymentMethod === method.id
                          ? 'border-[#D8B26E] bg-[#1E1A15] text-[#D8B26E] font-semibold'
                          : 'border-[#2C251C] bg-[#181512] text-[#A89F91] hover:text-[#FAF6EE]'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order summary mini-box */}
              <div className="bg-[#181512] p-3 border border-[#2C251C] flex items-center justify-between text-xs font-sans rounded-xs">
                <div>
                  <span className="font-semibold text-[#FAF6EE]">
                    Total ({(items || []).reduce((sum, i) => sum + i.quantity, 0)} items):
                  </span>
                  <span className="text-[#A89F91] block text-[10px]">Free Luxury Velvet Packaging Included</span>
                </div>
                <span className="text-base font-bold text-[#E5C378]">₹{total}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#D8B26E] to-[#C89D52] hover:from-[#E5C378] hover:to-[#D8B26E] text-black font-sans font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-md cursor-pointer"
              >
                PLACE ORDER (₹{total})
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#A89F91] text-center">
                <ShieldCheck size={13} className="text-[#D8B26E]" />
                <span>SSL 256-Bit Encrypted Payment Security</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
