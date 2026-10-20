import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  PromotionState,
  BusinessSettings,
  OrderStatus,
  DeliveryMethod,
  CustomerEnquiry
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_BUSINESS_SETTINGS } from '../data/products';
import { db } from '../services/firebase';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

interface BloomoraContextType {
  // Products
  products: Product[];
  updateProduct: (updated: Product) => void;
  resetProducts: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  cartTotal: number;
  isDiscountEligible: boolean;

  // Promotion
  promotion: PromotionState;
  remainingRedemptions: number;
  applyPromoManually: boolean;
  updatePromotion: (newPromo: Partial<PromotionState>) => void;

  // Orders
  orders: Order[];
  placeOrder: (customerData: {
    customerName: string;
    phoneNumber: string;
    email?: string;
    deliveryMethod: DeliveryMethod;
    deliveryNotes?: string;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  verifyOrderPayment: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;

  // Customer Enquiries
  enquiries: CustomerEnquiry[];
  submitEnquiry: (data: { name: string; contact: string; message: string }) => Promise<boolean>;

  // Settings
  settings: BusinessSettings;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;

  // Navigation & Modals
  activePage: string;
  setActivePage: (page: string) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastConfirmedOrder: Order | null;
  setLastConfirmedOrder: (order: Order | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Firebase State
  isFirebaseConfigured: boolean;
  setIsFirebaseConfigured: (status: boolean) => void;
}

const BloomoraContext = createContext<BloomoraContextType | undefined>(undefined);

const SEED_ORDERS: Order[] = [
  {
    id: 'ord-seed-1',
    orderNumber: 'BLM-20261019-1021',
    customerName: 'Nurul Aina',
    phoneNumber: '012-8839201',
    email: 'nurul.aina@example.com',
    items: [
      { productId: 'mix-flowers-bouquet-kit', productName: 'Mix Flowers Bouquet Kit', price: 25.0, quantity: 1 },
      { productId: 'single-tulip-kit', productName: 'Single Tulip Kit', price: 5.0, quantity: 2 }
    ],
    subtotal: 35.0,
    discount: 3.5,
    discountApplied: true,
    totalAmount: 31.5,
    deliveryMethod: 'pickup',
    deliveryNotes: 'Pickup at UiTM Student Centre after 4pm',
    paymentMethod: 'duitnow_qr',
    isPaid: true,
    orderStatus: 'preparing_kit',
    createdAt: '2026-10-19T14:22:00.000Z'
  },
  {
    id: 'ord-seed-2',
    orderNumber: 'BLM-20261020-1022',
    customerName: 'Bryan Tan',
    phoneNumber: '017-3458920',
    email: 'bryan.tan@example.com',
    items: [
      { productId: 'sunflower-bouquet-kit', productName: 'Sunflower Bouquet Kit', price: 15.0, quantity: 1 }
    ],
    subtotal: 15.0,
    discount: 1.5,
    discountApplied: true,
    totalAmount: 13.5,
    deliveryMethod: 'delivery',
    deliveryNotes: 'Address: Seksyen 7, Shah Alam',
    paymentMethod: 'duitnow_qr',
    isPaid: false,
    orderStatus: 'pending_payment',
    createdAt: '2026-10-20T08:15:00.000Z'
  }
];

export const BloomoraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bloomora_products_v4');
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        const map = new Map<string, Product>();
        INITIAL_PRODUCTS.forEach((p) => map.set(p.id, p));
        parsed.forEach((p) => {
          if (map.has(p.id)) {
            map.set(p.id, {
              ...map.get(p.id)!,
              ...p,
              kitNumber: map.get(p.id)!.kitNumber,
              included: map.get(p.id)!.included,
            });
          } else {
            map.set(p.id, p);
          }
        });
        return Array.from(map.values()).sort((a, b) => (a.kitNumber || 99) - (b.kitNumber || 99));
      }
    } catch (e) {
      console.warn('Failed to load products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bloomora_products_v4', JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to persist products', e);
    }
  }, [products]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bloomora_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('bloomora_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to persist cart', e);
    }
  }, [cart]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('bloomora_orders_v2') || localStorage.getItem('bloomora_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load orders', e);
    }
    return SEED_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bloomora_orders_v2', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to persist orders', e);
    }
  }, [orders]);

  // Promotion
  const [promotion, setPromotion] = useState<PromotionState>(() => {
    try {
      const saved = localStorage.getItem('bloomora_promo_v2') || localStorage.getItem('bloomora_promo_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load promo', e);
    }
    return {
      campaignName: 'BLOOMORA SPECIAL LAUNCH – 10% OFF!',
      discountPercent: 10,
      maxRedemptions: 30,
      currentRedemptions: 19,
      isActive: true
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('bloomora_promo_v2', JSON.stringify(promotion));
    } catch (e) {
      console.warn('Failed to persist promo', e);
    }
  }, [promotion]);

  // Enquiries
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem('bloomora_enquiries');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load enquiries', e);
    }
    return [];
  });

  // Settings
  const [settings, setSettings] = useState<BusinessSettings>(() => {
    try {
      const saved = localStorage.getItem('bloomora_settings_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load settings', e);
    }
    return INITIAL_BUSINESS_SETTINGS;
  });

  // Navigation & Modals
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<Order | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState<boolean>(true);

  // Background Firestore synchronization
  useEffect(() => {
    // Sync products from Firestore if available
    let unsubProducts = () => {};
    try {
      unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteMap = new Map<string, Product>();
          snapshot.forEach((docSnap) => {
            remoteMap.set(docSnap.id, { ...(docSnap.data() as Product), id: docSnap.id });
          });
          const merged = INITIAL_PRODUCTS.map((init) => {
            if (remoteMap.has(init.id)) {
              return { ...init, ...remoteMap.get(init.id) };
            }
            return init;
          });
          remoteMap.forEach((val, key) => {
            if (!INITIAL_PRODUCTS.some((p) => p.id === key)) {
              merged.push(val);
            }
          });
          setProducts(merged.sort((a, b) => (a.kitNumber || 99) - (b.kitNumber || 99)));
        }
      }, () => {});
    } catch (e) {}

    // Sync orders from Firestore
    let unsubOrders = () => {};
    try {
      unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteOrders: Order[] = [];
          snapshot.forEach((docSnap) => {
            remoteOrders.push({ ...(docSnap.data() as Order), id: docSnap.id });
          });
          remoteOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setOrders(remoteOrders);
        }
      }, () => {});
    } catch (e) {}

    // Sync promotions from Firestore
    let unsubPromo = () => {};
    try {
      unsubPromo = onSnapshot(doc(db, 'promotions', 'special_launch'), (snap) => {
        if (snap.exists()) {
          setPromotion(snap.data() as PromotionState);
        }
      }, () => {});
    } catch (e) {}

    return () => {
      unsubProducts();
      unsubOrders();
      unsubPromo();
    };
  }, []);

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const isDiscountEligible =
    promotion.isActive &&
    promotion.currentRedemptions < promotion.maxRedemptions &&
    cart.length > 0;
  const discountAmount = isDiscountEligible ? Number((cartSubtotal * 0.1).toFixed(2)) : 0;
  const cartTotal = Number((cartSubtotal - discountAmount).toFixed(2));
  const remainingRedemptions = Math.max(0, promotion.maxRedemptions - promotion.currentRedemptions);

  // Place Order (Stores order safely without deleting any data)
  const placeOrder = async ({
    customerName,
    phoneNumber,
    email,
    deliveryMethod,
    deliveryNotes
  }: {
    customerName: string;
    phoneNumber: string;
    email?: string;
    deliveryMethod: DeliveryMethod;
    deliveryNotes?: string;
  }): Promise<Order> => {
    const timestamp = Date.now();
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `BLM-${dateStr}-${randSuffix}`;
    const orderId = `ord-${timestamp}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email?.trim(),
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      discountApplied: isDiscountEligible,
      totalAmount: cartTotal,
      deliveryMethod,
      deliveryNotes: deliveryNotes?.trim(),
      paymentMethod: 'duitnow_qr',
      isPaid: false,
      orderStatus: 'pending_payment',
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Persist to Firestore
    try {
      await setDoc(doc(db, 'orders', orderId), newOrder);
    } catch (err) {
      console.warn('Order saved locally:', err);
    }

    if (isDiscountEligible) {
      const nextRedemptions = promotion.currentRedemptions + 1;
      setPromotion((prev) => ({
        ...prev,
        currentRedemptions: nextRedemptions
      }));
      try {
        await updateDoc(doc(db, 'promotions', 'special_launch'), {
          currentRedemptions: nextRedemptions
        });
      } catch (err) {}
    }

    clearCart();
    setLastConfirmedOrder(newOrder);
    setIsCheckoutOpen(false);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const isPaid = status === 'payment_verified' || status === 'preparing_kit' || status === 'ready' || status === 'completed';
          return { ...order, orderStatus: status, isPaid: order.isPaid || isPaid };
        }
        return order;
      })
    );
    try {
      updateDoc(doc(db, 'orders', orderId), { orderStatus: status });
    } catch (e) {}
  };

  const verifyOrderPayment = (orderId: string) => {
    updateOrderStatus(orderId, 'payment_verified');
  };

  const deleteOrder = async (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch (e) {}
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    try {
      setDoc(doc(db, 'products', updated.id), updated, { merge: true });
    } catch (e) {}
  };

  const resetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  const updatePromotion = (newPromo: Partial<PromotionState>) => {
    setPromotion((prev) => {
      const updated = { ...prev, ...newPromo };
      try {
        setDoc(doc(db, 'promotions', 'special_launch'), updated, { merge: true });
      } catch (e) {}
      return updated;
    });
  };

  const submitEnquiry = async (data: { name: string; contact: string; message: string }): Promise<boolean> => {
    const enqId = `enq-${Date.now()}`;
    const newEnquiry: CustomerEnquiry = {
      id: enqId,
      name: data.name.trim(),
      contact: data.contact.trim(),
      message: data.message.trim(),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    setEnquiries((prev) => [newEnquiry, ...prev]);

    try {
      await setDoc(doc(db, 'enquiries', enqId), newEnquiry);
    } catch (err) {}

    return true;
  };

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('bloomora_settings_v2', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <BloomoraContext.Provider
      value={{
        products,
        updateProduct,
        resetProducts,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        discountAmount,
        cartTotal,
        isDiscountEligible,
        promotion,
        remainingRedemptions,
        applyPromoManually: true,
        updatePromotion,
        orders,
        placeOrder,
        updateOrderStatus,
        verifyOrderPayment,
        deleteOrder,
        enquiries,
        submitEnquiry,
        settings,
        updateSettings,
        activePage,
        setActivePage,
        selectedProductForModal,
        setSelectedProductForModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastConfirmedOrder,
        setLastConfirmedOrder,
        isAdminOpen,
        setIsAdminOpen,
        isFirebaseConfigured,
        setIsFirebaseConfigured
      }}
    >
      {children}
    </BloomoraContext.Provider>
  );
};

export const useBloomora = () => {
  const context = useContext(BloomoraContext);
  if (!context) {
    throw new Error('useBloomora must be used within a BloomoraProvider');
  }
  return context;
};
