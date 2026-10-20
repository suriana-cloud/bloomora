import React, { useState, useMemo } from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { FlowerPlaceholder } from './FlowerPlaceholder';
import { Search, ShoppingBag, Eye, Plus, Minus, Check } from 'lucide-react';
import { Product, FlowerCategory } from '../types';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    addToCart,
    setSelectedProductForModal,
    setIsCartOpen,
    isDiscountEligible
  } = useBloomora();

  const [activeCategory, setActiveCategory] = useState<FlowerCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories: { id: FlowerCategory; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'single', label: 'Single Flower Kits' },
    { id: 'bouquet', label: 'Bouquet Kits' },
    { id: 'mixed', label: 'Mixed Flower Kits' },
  ];

  const getQty = (productId: string) => quantities[productId] || 1;

  const handleQtyChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, Math.min(20, current + delta));
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product: Product) => {
    const qty = getQty(product.id);
    addToCart(product, qty);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1800);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flowerType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <section id="shop" className="py-16 md:py-24 bg-[#FFF9F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#F8C8DC]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D88C9A]">
              Craft Your Own Blooms
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#594A4E] tracking-tight mt-1">
              Bloomora Collection
            </h2>
            <p className="text-sm text-[#594A4E]/75 mt-1.5">
              11 beginner-friendly fuzzy wire kits with complete materials & illustrated guides.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#594A4E]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tulips, daisies, bouquets..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[#F8C8DC] focus:border-[#D88C9A] focus:outline-none rounded-xl text-[#594A4E] placeholder:text-[#594A4E]/40 shadow-2xs transition-colors"
            />
          </div>
        </div>

        {/* Filter Controls (Interactive Buttons/Tabs) */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#594A4E] text-[#FFF9F5] shadow-xs'
                  : 'bg-white hover:bg-[#FADADD]/40 text-[#594A4E]/80 border border-[#F8C8DC]'
              }`}
            >
              {cat.label}
              {cat.id === 'all' && ` (${products.length})`}
            </button>
          ))}
        </div>

        {/* Notice: Respecting Prompt Constraint on Real Photos */}
        <div className="mb-8 p-3.5 bg-[#FFF0F5] border border-[#F8C8DC] rounded-xl flex items-center justify-between text-xs text-[#594A4E]/80 gap-3">
          <span className="flex items-center gap-2">
            <span className="text-[#D88C9A] text-sm">💡</span>
            <span>
              <strong>Authentic Handmade Assurance:</strong> Displaying illustrated craft placeholders until official Bloomora batch photographs are uploaded. No misleading AI product images.
            </span>
          </span>
          <span className="hidden sm:inline text-[11px] text-[#D88C9A] font-semibold whitespace-nowrap">
            100% Beginner Tested
          </span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#F8C8DC] p-8">
            <p className="text-[#594A4E]/60 text-sm mb-3">No flower kits match your search.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#D88C9A] text-white rounded-lg hover:bg-[#c97b89] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const qty = getQty(product.id);
              const isAdded = justAddedId === product.id;
              const discountedPrice = isDiscountEligible
                ? (product.price * 0.9).toFixed(2)
                : null;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-[#F8C8DC] hover:border-[#D88C9A] hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Art / Image Area */}
                  <div
                    className="cursor-pointer relative overflow-hidden"
                    onClick={() => setSelectedProductForModal(product)}
                  >
                    <FlowerPlaceholder product={product} className="aspect-[4/3] w-full" />
                    
                    {/* Hover quick-view pill */}
                    <div className="absolute inset-0 bg-[#594A4E]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 bg-white/95 text-[#594A4E] text-xs font-medium rounded-full shadow-sm flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#D88C9A]" />
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Quiet category metadata */}
                      <div className="flex items-center justify-between text-xs text-[#594A4E]/60 mb-1.5">
                        <span className="uppercase tracking-wider font-semibold text-[#D88C9A] text-[11px]">
                          {product.category === 'single'
                            ? 'Single Kit'
                            : product.category === 'bouquet'
                            ? 'Bouquet Kit'
                            : 'Mixed Kit'}
                        </span>
                        <span className="tabular-nums">
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3
                        onClick={() => setSelectedProductForModal(product)}
                        className="font-serif text-lg sm:text-xl font-bold text-[#594A4E] group-hover:text-[#D88C9A] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-[#594A4E]/75 line-clamp-2 mt-1.5 mb-4 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="pt-4 border-t border-[#F8C8DC]/60 space-y-3.5">
                      {/* Price in Malaysian Ringgit (RM) */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          {discountedPrice ? (
                            <div className="flex items-baseline gap-2">
                              <span className="font-bold text-lg sm:text-xl text-[#594A4E] tabular-nums">
                                RM{discountedPrice}
                              </span>
                              <span className="text-xs text-[#594A4E]/50 line-through tabular-nums">
                                RM{product.price.toFixed(2)}
                              </span>
                              <span className="text-[10px] font-semibold text-[#D88C9A] uppercase tracking-wide">
                                10% Launch
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-lg sm:text-xl text-[#594A4E] tabular-nums">
                              RM{product.price.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center border border-[#F8C8DC] rounded-lg bg-[#FFF9F5] p-0.5">
                          <button
                            onClick={() => handleQtyChange(product.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-[#594A4E] hover:bg-[#FADADD]/50 rounded cursor-pointer transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#594A4E]">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleQtyChange(product.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#594A4E] hover:bg-[#FADADD]/50 rounded cursor-pointer transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons: Add to Cart & View Details */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#D88C9A] hover:bg-[#c97b89] active:scale-95 text-white shadow-xs'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setSelectedProductForModal(product)}
                          className="flex items-center justify-center gap-1 py-2.5 px-3 text-xs font-medium text-[#594A4E] bg-[#FFF9F5] hover:bg-[#FADADD]/40 border border-[#F8C8DC] rounded-xl transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#594A4E]/70" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
