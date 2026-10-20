export type FlowerCategory = 'all' | 'single' | 'bouquet' | 'mixed';

export interface CustomerEnquiry {
  id: string;
  name: string;
  contact: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  createdAt: string;
  respondedBy?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number; // in Malaysian Ringgit (RM)
  category: 'single' | 'bouquet' | 'mixed';
  flowerType: 'Tulip' | 'Lily' | 'Sunflower' | 'Hibiscus' | 'Daisy' | 'Mixed';
  shortDescription: string;
  description: string;
  included: string[];
  beginnerInfo: {
    difficulty: string;
    estimatedTime: string;
    targetAudience: string;
    isNoExperienceRequired: boolean;
  };
  kitNumber?: number;
  imagePlaceholderColor: string;
  customImageUrl?: string;
  inStock: boolean;
  isPopular?: boolean;
  updatedBy?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryMethod = 'pickup' | 'delivery';

export type OrderStatus = 
  | 'pending_payment'
  | 'payment_verified'
  | 'preparing_kit'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  discountApplied: boolean;
  totalAmount: number;
  deliveryMethod: DeliveryMethod;
  deliveryNotes?: string;
  paymentMethod: 'duitnow_qr';
  isPaid: boolean;
  orderStatus: OrderStatus;
  updatedBy?: string;
  updatedAt?: string;
  createdAt: string;
}

export interface PromotionState {
  campaignName: string;
  discountPercent: number; // 10
  maxRedemptions: number; // 30
  currentRedemptions: number;
  isActive: boolean;
  updatedBy?: string;
  updatedAt?: string;
}

export interface BusinessSettings {
  whatsappNumber: string;
  facebookUrl: string;
  instagramUrl: string;
  duitnowQrNumber: string;
  duitnowRecipientName: string;
  duitnowBankName: string;
  pickupLocationDetails: string;
  deliveryFeeNote: string;
}
