import React, { useState } from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { X, QrCode, ShieldAlert, Sparkles, MapPin, Truck, CheckCircle2 } from 'lucide-react';
import { DeliveryMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    cartTotal,
    isDiscountEligible,
    placeOrder,
    settings
  } = useBloomora();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!customerName.trim() || customerName.trim().length < 2) {
      newErrors.name = 'Please enter your full name.';
    }
    const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      newErrors.phone = 'Please enter a valid Malaysian phone number (e.g. 012-3456789).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        customerName,
        phoneNumber,
        email: email || undefined,
        deliveryMethod,
        deliveryNotes
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#FFF9F5] rounded-3xl border border-[#F8C8DC] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#F8C8DC] flex items-center justify-between bg-white/70">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D88C9A]">
              Step 2 of 3 · Order Checkout
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#594A4E]">
              Bloomora Checkout
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-[#FADADD]/50 flex items-center justify-center text-[#594A4E] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Customer Information */}
          <div className="bg-white/80 p-5 rounded-2xl border border-[#F8C8DC] space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#594A4E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D88C9A]"></span>
              Customer Information
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#594A4E] mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Nur Farhana binti Ahmad"
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FFF9F5] border rounded-xl focus:outline-none transition-colors ${
                  errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#F8C8DC] focus:border-[#D88C9A]'
                }`}
                required
              />
              {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#594A4E] mb-1">
                  Phone Number (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 012-3456789"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FFF9F5] border rounded-xl focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-500 bg-red-50/20' : 'border-[#F8C8DC] focus:border-[#D88C9A]'
                  }`}
                  required
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#594A4E] mb-1">
                  Email Address <span className="text-xs text-[#594A4E]/50 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@student.uitm.edu.my"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FFF9F5] border border-[#F8C8DC] focus:border-[#D88C9A] focus:outline-none rounded-xl transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="bg-white/80 p-5 rounded-2xl border border-[#F8C8DC] space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#594A4E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D88C9A]"></span>
              Delivery Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  deliveryMethod === 'pickup'
                    ? 'border-[#D88C9A] bg-[#FFF0F5] shadow-xs'
                    : 'border-[#F8C8DC] bg-[#FFF9F5] hover:bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={deliveryMethod === 'pickup'}
                  onChange={() => setDeliveryMethod('pickup')}
                  className="mt-1 text-[#D88C9A] focus:ring-[#D88C9A]"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#594A4E] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D88C9A]" />
                    Self Pickup
                  </span>
                  <p className="text-[#594A4E]/70 mt-1 leading-relaxed">
                    {settings.pickupLocationDetails}
                  </p>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  deliveryMethod === 'delivery'
                    ? 'border-[#D88C9A] bg-[#FFF0F5] shadow-xs'
                    : 'border-[#F8C8DC] bg-[#FFF9F5] hover:bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="delivery"
                  checked={deliveryMethod === 'delivery'}
                  onChange={() => setDeliveryMethod('delivery')}
                  className="mt-1 text-[#D88C9A] focus:ring-[#D88C9A]"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#594A4E] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#D88C9A]" />
                    Delivery
                  </span>
                  <p className="text-[#594A4E]/70 mt-1 leading-relaxed">
                    {settings.deliveryFeeNote}
                  </p>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#594A4E] mb-1">
                {deliveryMethod === 'delivery' ? 'Full Delivery Address & Postcode' : 'Pickup Date / Specific Notes'}
              </label>
              <textarea
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                rows={2}
                placeholder={
                  deliveryMethod === 'delivery'
                    ? 'Enter street address, unit/room number, and postcode...'
                    : 'Any preferred time or campus collection note...'
                }
                className="w-full px-3.5 py-2 text-xs bg-[#FFF9F5] border border-[#F8C8DC] focus:border-[#D88C9A] focus:outline-none rounded-xl"
              />
            </div>
          </div>

          {/* Payment Method: DuitNow QR Manual Payment */}
          <div className="bg-white/80 p-5 rounded-2xl border border-[#F8C8DC] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#594A4E] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D88C9A]"></span>
                Payment Method: DuitNow QR (Manual Payment)
              </h3>
              <span className="text-[11px] text-[#D88C9A] font-semibold bg-[#FADADD]/60 px-2 py-0.5 rounded">
                Official Bloomora Account
              </span>
            </div>

            <div className="p-4 bg-[#FFF9F5] rounded-xl border border-[#F8C8DC] flex flex-col sm:flex-row items-center gap-4">
              {/* DuitNow Visual Card */}
              <div className="w-28 h-28 bg-white border-2 border-[#ED237A] rounded-2xl p-2 flex flex-col items-center justify-center shrink-0 shadow-xs text-center">
                <span className="text-[10px] font-bold text-[#ED237A] uppercase tracking-wider">
                  DuitNow QR
                </span>
                <QrCode className="w-14 h-14 text-[#594A4E] my-1" />
                <span className="text-[8px] text-[#594A4E]/60 uppercase">
                  Scan to Pay
                </span>
              </div>

              {/* Account Details */}
              <div className="text-xs space-y-1.5 flex-1">
                <div className="flex justify-between border-b border-[#F8C8DC]/60 pb-1">
                  <span className="text-[#594A4E]/70">Recipient:</span>
                  <span className="font-bold text-[#594A4E]">{settings.duitnowRecipientName}</span>
                </div>
                <div className="flex justify-between border-b border-[#F8C8DC]/60 pb-1">
                  <span className="text-[#594A4E]/70">DuitNow ID / Mobile:</span>
                  <span className="font-mono font-bold text-[#594A4E]">{settings.duitnowQrNumber}</span>
                </div>
                <div className="flex justify-between border-b border-[#F8C8DC]/60 pb-1">
                  <span className="text-[#594A4E]/70">Supported Apps:</span>
                  <span className="text-[#594A4E]">{settings.duitnowBankName}</span>
                </div>
                <p className="text-[11px] text-[#594A4E]/70 pt-1">
                  <strong>Verification policy:</strong> Orders are verified after submitting payment screenshot via WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Breakdown */}
          <div className="bg-white/80 p-5 rounded-2xl border border-[#F8C8DC] space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#594A4E]">
              Order Summary
            </h3>

            <div className="divide-y divide-[#F8C8DC]/60 text-xs">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-[#594A4E]">{item.product.name}</span>
                    <span className="text-[#594A4E]/60 ml-2">× {item.quantity}</span>
                  </div>
                  <span className="font-semibold tabular-nums text-[#594A4E]">
                    RM{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#F8C8DC] space-y-1.5 text-xs text-[#594A4E]">
              <div className="flex justify-between">
                <span className="text-[#594A4E]/70">Subtotal:</span>
                <span className="font-semibold tabular-nums">RM{cartSubtotal.toFixed(2)}</span>
              </div>
              {isDiscountEligible && (
                <div className="flex justify-between text-[#D88C9A]">
                  <span className="font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Special Launch 10% Discount:
                  </span>
                  <span className="font-bold tabular-nums">-RM{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold pt-2 border-t border-[#F8C8DC] text-[#594A4E]">
                <span>Total Payment:</span>
                <span className="tabular-nums">RM{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 px-6 bg-[#D88C9A] hover:bg-[#c97b89] active:scale-98 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Place Order · RM{cartTotal.toFixed(2)}</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-[#594A4E]/60 mt-2">
              By placing your order, an order confirmation with your unique order number will appear.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
