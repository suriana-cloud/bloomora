import React from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { FlowerPlaceholder } from './FlowerPlaceholder';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    discountAmount,
    cartTotal,
    isDiscountEligible,
    remainingRedemptions,
    setIsCheckoutOpen
  } = useBloomora();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end transition-opacity">
      <div
        className="relative w-full max-w-md bg-[#FFF9F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#F8C8DC] animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#F8C8DC] flex items-center justify-between bg-white/60">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#D88C9A]" />
            <h2 className="font-serif text-xl font-bold text-[#594A4E]">
              Your Shopping Bag
            </h2>
            <span className="text-xs bg-[#F8C8DC] px-2 py-0.5 rounded-full font-bold text-[#594A4E]">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-[#FADADD]/50 flex items-center justify-center text-[#594A4E] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Promo Tracker inside Cart */}
        {isDiscountEligible && (
          <div className="px-5 py-2.5 bg-gradient-to-r from-[#FADADD] to-[#F8C8DC] border-b border-[#D88C9A]/30 flex items-center gap-2 text-xs text-[#594A4E]">
            <Sparkles className="w-3.5 h-3.5 text-[#D88C9A] shrink-0" />
            <span>
              <strong>10% Launch Discount Active!</strong> You are saving RM{discountAmount.toFixed(2)} on this order.
            </span>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FADADD]/50 flex items-center justify-center text-2xl">
                🌷
              </div>
              <h3 className="font-serif text-lg font-bold text-[#594A4E]">
                Your bag is empty
              </h3>
              <p className="text-xs text-[#594A4E]/70 max-w-xs">
                Browse our collection of beginner-friendly DIY Fuzzy Flower Kits to start blooming!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 bg-[#D88C9A] hover:bg-[#c97b89] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Browse Flower Kits
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 bg-white rounded-2xl border border-[#F8C8DC] flex gap-3.5 items-center justify-between shadow-2xs"
              >
                {/* Mini Image placeholder */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#F8C8DC]/60 bg-[#FFF9F5]">
                  <FlowerPlaceholder product={item.product} className="w-full h-full p-1" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#594A4E] truncate">
                    {item.product.name}
                  </h4>
                  <span className="text-[11px] text-[#594A4E]/60 block">
                    RM{item.product.price.toFixed(2)} each
                  </span>

                  {/* Quantity Stepper */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="inline-flex items-center border border-[#F8C8DC] rounded-lg bg-[#FFF9F5] p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#594A4E] hover:bg-[#FADADD]/60 rounded cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold tabular-nums text-[#594A4E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#594A4E] hover:bg-[#FADADD]/60 rounded cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#594A4E]/40 hover:text-red-500 p-1 transition-colors cursor-pointer"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Item Line Total */}
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-[#594A4E] tabular-nums block">
                    RM{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Calculations */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#F8C8DC] space-y-3.5">
            <div className="space-y-1.5 text-xs text-[#594A4E]">
              <div className="flex justify-between">
                <span className="text-[#594A4E]/70">Subtotal</span>
                <span className="font-semibold tabular-nums">RM{cartSubtotal.toFixed(2)}</span>
              </div>

              {isDiscountEligible && (
                <div className="flex justify-between text-[#D88C9A]">
                  <span className="font-medium">10% Special Launch Discount</span>
                  <span className="font-bold tabular-nums">-RM{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold pt-2 border-t border-[#F8C8DC]/60 text-[#594A4E]">
                <span>Total Amount</span>
                <span className="tabular-nums">RM{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 bg-[#D88C9A] hover:bg-[#c97b89] active:scale-98 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#594A4E]/60">
              Manual DuitNow QR payment & Self Pickup / Delivery options on next step.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
