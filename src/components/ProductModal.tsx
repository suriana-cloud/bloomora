import React, { useState } from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { FlowerPlaceholder } from './FlowerPlaceholder';
import { X, Check, ShoppingBag, Plus, Minus, Clock, Sparkles, Package, BookOpen } from 'lucide-react';
import { Product } from '../types';

export const ProductModal: React.FC = () => {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    products,
    addToCart,
    isDiscountEligible
  } = useBloomora();

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;

  const discountedPrice = isDiscountEligible
    ? (product.price * 0.9).toFixed(2)
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1800);
  };

  // 3 Related products in the same category or popular
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#FFF9F5] rounded-3xl border border-[#F8C8DC] shadow-2xl overflow-hidden transition-all my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#594A4E] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          aria-label="Close product modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Placeholder */}
          <div className="bg-white/60 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#F8C8DC]">
            <FlowerPlaceholder
              product={product}
              className="w-full aspect-square max-w-[320px] rounded-2xl shadow-xs"
            />
            <div className="mt-4 text-center">
              <span className="text-[11px] text-[#594A4E]/60 uppercase tracking-widest block">
                Official Bloomora DIY Fuzzy Wire Kit
              </span>
              <span className="text-xs text-[#D88C9A] font-medium mt-0.5 block">
                Reusable Floral Stem & Materials
              </span>
            </div>
          </div>

          {/* Right Column: Details & Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Stock */}
              <div className="flex items-center justify-between text-xs text-[#594A4E]/70 mb-2">
                <span className="uppercase tracking-wider font-semibold text-[#D88C9A]">
                  {product.category === 'single'
                    ? 'Single Flower Kit'
                    : product.category === 'bouquet'
                    ? 'Bouquet Kit'
                    : 'Mixed Collection'}
                </span>
                <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                  {product.inStock ? 'Ready in Stock' : 'Pre-order Only'}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#594A4E] leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                {discountedPrice ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-bold text-[#594A4E] tabular-nums">
                      RM{discountedPrice}
                    </span>
                    <span className="text-sm text-[#594A4E]/50 line-through tabular-nums">
                      RM{product.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-[#D88C9A] bg-[#FADADD]/60 px-2 py-0.5 rounded">
                      10% Special Launch
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-[#594A4E] tabular-nums">
                    RM{product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#594A4E]/80 leading-relaxed">
                {product.description}
              </p>

              {/* What's Included */}
              <div className="mt-5 p-4 bg-white/80 rounded-2xl border border-[#F8C8DC]/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#594A4E]">
                  <Package className="w-3.5 h-3.5 text-[#D88C9A]" />
                  <span>What’s Included in the DIY Kit:</span>
                </div>
                <ul className="text-xs text-[#594A4E]/80 space-y-1.5 pl-1">
                  {product.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D88C9A] font-bold text-xs mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Beginner Friendly Information */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-[#FFF0F5] rounded-xl border border-[#F8C8DC] flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D88C9A] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-[#594A4E]/60 uppercase font-semibold">Crafting Time</span>
                    <span className="font-semibold text-[#594A4E]">{product.beginnerInfo.estimatedTime}</span>
                  </div>
                </div>
                <div className="p-3 bg-[#FFF0F5] rounded-xl border border-[#F8C8DC] flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#D88C9A] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-[#594A4E]/60 uppercase font-semibold">Skill Level</span>
                    <span className="font-semibold text-[#594A4E]">{product.beginnerInfo.difficulty}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quantity Stepper & Add to Cart button */}
            <div className="pt-4 border-t border-[#F8C8DC] space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#594A4E]">Quantity:</span>
                <div className="flex items-center border border-[#F8C8DC] rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#594A4E] hover:bg-[#FADADD]/40 rounded-lg cursor-pointer transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-sm font-bold tabular-nums text-[#594A4E]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#594A4E] hover:bg-[#FADADD]/40 rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-3.5 px-6 font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D88C9A] hover:bg-[#c97b89] active:scale-98 text-white shadow-md'
                } disabled:opacity-50`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity} to Cart · RM{((discountedPrice ? Number(discountedPrice) : product.price) * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Related Product Recommendations */}
            <div className="pt-3 border-t border-[#F8C8DC]/60">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#594A4E]/70 block mb-2">
                You May Also Love
              </span>
              <div className="grid grid-cols-3 gap-2">
                {relatedProducts.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => {
                      setSelectedProductForModal(rel);
                      setQuantity(1);
                    }}
                    className="p-2 rounded-xl bg-white border border-[#F8C8DC] hover:border-[#D88C9A] text-left transition-all group cursor-pointer"
                  >
                    <span className="text-[11px] font-bold text-[#594A4E] group-hover:text-[#D88C9A] truncate block">
                      {rel.name}
                    </span>
                    <span className="text-[10px] text-[#594A4E]/60 tabular-nums">
                      RM{rel.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
