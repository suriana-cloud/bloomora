import React, { useState } from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { auth } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import {
  X,
  Lock,
  Package,
  ShoppingBag,
  TrendingUp,
  Percent,
  Settings,
  CheckCircle2,
  Clock,
  AlertCircle,
  Database,
  ExternalLink,
  MessageSquare,
  Search,
  RefreshCw,
  LogOut,
  Phone,
  Mail,
  DollarSign,
  Tag,
  Trash2
} from 'lucide-react';
import { OrderStatus, Product } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    orders,
    updateOrderStatus,
    verifyOrderPayment,
    deleteOrder,
    products,
    updateProduct,
    resetProducts,
    promotion,
    updatePromotion,
    settings,
    updateSettings,
    enquiries
  } = useBloomora();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUserEmail, setAdminUserEmail] = useState<string>('');
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'analytics' | 'promotions' | 'settings'>('orders');
  const [orderFilter, setOrderFilter] = useState<'all' | OrderStatus>('all');
  const [searchOrder, setSearchOrder] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Local settings form state
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  if (!isAdminOpen) return null;

  // Handle Passcode / Email login
  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (passcode.trim() === 'bloomora2026' || passcode.trim() === 'admin123') {
      setIsAuthenticated(true);
      setAdminUserEmail('owner@bloomora.uitm');
      return;
    }
    setLoginError('Invalid administrator credentials. Please check your passcode.');
  };

  // Handle Google Sign-in
  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setLoginError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        setIsAuthenticated(true);
        setAdminUserEmail(result.user.email || 'Admin');
      }
    } catch (err: any) {
      console.warn('Google sign-in fallback to passcode:', err);
      setLoginError('Google sign-in was cancelled or blocked in iframe. You may use the team passcode: bloomora2026');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    setIsAuthenticated(false);
    setAdminUserEmail('');
    setPasscode('');
  };

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesFilter = orderFilter === 'all' || order.orderStatus === orderFilter;
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchOrder.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchOrder.toLowerCase()) ||
      order.phoneNumber.includes(searchOrder);
    return matchesFilter && matchesSearch;
  });

  // Calculate analytics
  const totalRevenue = orders
    .filter((o) => o.isPaid || o.orderStatus === 'payment_verified' || o.orderStatus === 'completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingRevenue = orders
    .filter((o) => !o.isPaid && o.orderStatus === 'pending_payment')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const paidOrdersCount = orders.filter((o) => o.isPaid || o.orderStatus === 'payment_verified').length;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending_payment').length;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const statusColors: Record<OrderStatus, string> = {
    pending_payment: 'bg-amber-100 text-amber-800 border-amber-300',
    payment_verified: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    preparing_kit: 'bg-blue-100 text-blue-800 border-blue-300',
    ready: 'bg-purple-100 text-purple-800 border-purple-300',
    completed: 'bg-stone-100 text-stone-800 border-stone-300',
    cancelled: 'bg-rose-100 text-rose-800 border-rose-300'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FFF9F5] border border-[#F8C8DC] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-white border-b border-[#F8C8DC] px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FADADD] border border-[#D88C9A]/40 flex items-center justify-center text-[#594A4E]">
              <Lock className="w-5 h-5 text-[#D88C9A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-lg text-[#594A4E]">BLOOMORA Admin Portal</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-[#F8C8DC]/60 text-[#594A4E] border border-[#D88C9A]/30">
                  Business Dashboard
                </span>
              </div>
              <p className="text-xs text-[#594A4E]/70">
                {isAuthenticated ? `Signed in as ${adminUserEmail}` : 'Authorised team members access only'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#F8C8DC] text-xs font-semibold text-[#594A4E] hover:bg-[#FADADD]/40 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-9 h-9 rounded-full bg-[#FFF9F5] border border-[#F8C8DC] hover:border-[#D88C9A] flex items-center justify-center text-[#594A4E] transition-colors"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {!isAuthenticated ? (
            /* --- LOGIN FORM --- */
            <div className="p-6 sm:p-12 max-w-md mx-auto my-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FADADD] border-2 border-[#D88C9A] flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#594A4E]" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#594A4E]">Admin Authentication</h3>
                <p className="text-xs sm:text-sm text-[#594A4E]/70 mt-1">
                  Access live customer orders, verify DuitNow payments, and manage fuzzy flower kits.
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 text-left flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handleGoogleLogin}
                  disabled={isSigningIn}
                  className="w-full py-3 px-4 bg-white hover:bg-stone-50 border border-stone-300 rounded-2xl shadow-xs text-xs sm:text-sm font-semibold text-stone-700 flex items-center justify-center gap-3 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{isSigningIn ? 'Connecting to Google...' : 'Sign in with Google Account'}</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-[#F8C8DC]"></div>
                  <span className="flex-shrink mx-3 text-[11px] font-semibold text-[#594A4E]/60 uppercase">
                    or Team Passcode
                  </span>
                  <div className="flex-grow border-t border-[#F8C8DC]"></div>
                </div>

                <form onSubmit={handlePasscodeLogin} className="space-y-3">
                  <input
                    type="password"
                    placeholder="Enter team passcode (bloomora2026)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#F8C8DC] focus:border-[#D88C9A] rounded-2xl text-xs sm:text-sm text-[#594A4E] focus:outline-hidden text-center"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#D88C9A] hover:bg-[#c97b89] text-[#FFF9F5] font-semibold text-xs sm:text-sm rounded-2xl shadow-xs transition-colors cursor-pointer"
                  >
                    Unlock Dashboard
                  </button>
                </form>

                <p className="text-[11px] text-[#594A4E]/60">
                  Pre-configured for student owner: <code className="bg-[#FADADD]/40 px-1.5 py-0.5 rounded font-mono">2025177489@student.uitm.edu.my</code>
                </p>
              </div>
            </div>
          ) : (
            /* --- AUTHENTICATED ADMIN DASHBOARD --- */
            <div className="p-4 sm:p-6 space-y-6">
              
              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-[#F8C8DC] pb-3 overflow-x-auto text-xs sm:text-sm font-medium">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'orders'
                      ? 'bg-[#D88C9A] text-white font-semibold shadow-xs'
                      : 'text-[#594A4E] hover:bg-[#F8C8DC]/30'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Customer Orders ({orders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'products'
                      ? 'bg-[#D88C9A] text-white font-semibold shadow-xs'
                      : 'text-[#594A4E] hover:bg-[#F8C8DC]/30'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Product Management ({products.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'analytics'
                      ? 'bg-[#D88C9A] text-white font-semibold shadow-xs'
                      : 'text-[#594A4E] hover:bg-[#F8C8DC]/30'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Sales & Analytics</span>
                </button>

                <button
                  onClick={() => setActiveTab('promotions')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'promotions'
                      ? 'bg-[#D88C9A] text-white font-semibold shadow-xs'
                      : 'text-[#594A4E] hover:bg-[#F8C8DC]/30'
                  }`}
                >
                  <Percent className="w-4 h-4" />
                  <span>10% Launch Promotion</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'settings'
                      ? 'bg-[#D88C9A] text-white font-semibold shadow-xs'
                      : 'text-[#594A4E] hover:bg-[#F8C8DC]/30'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Business Settings & Enquiries ({enquiries.length})</span>
                </button>
              </div>

              {/* TAB 1: CUSTOMER ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {/* Filters and search */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                      {(['all', 'pending_payment', 'payment_verified', 'preparing_kit', 'ready', 'completed'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => setOrderFilter(status)}
                          className={`px-3 py-1.5 rounded-lg font-medium border transition-colors cursor-pointer capitalize whitespace-nowrap ${
                            orderFilter === status
                              ? 'bg-[#594A4E] text-[#FFF9F5] border-[#594A4E]'
                              : 'bg-white text-[#594A4E] border-[#F8C8DC] hover:border-[#D88C9A]'
                          }`}
                        >
                          {status.replace('_', ' ')}
                        </button>
                      ))}
                    </div>

                    <div className="relative min-w-[200px]">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#594A4E]/50" />
                      <input
                        type="text"
                        placeholder="Search order #, customer, phone..."
                        value={searchOrder}
                        onChange={(e) => setSearchOrder(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#F8C8DC] rounded-xl text-xs text-[#594A4E] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {filteredOrders.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-[#F8C8DC]">
                      <p className="text-sm text-[#594A4E]/70">No customer orders found matching this filter.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredOrders.map((order) => {
                        const rawPhone = order.phoneNumber.replace(/[^0-9]/g, '');
                        const waPhone = rawPhone.startsWith('0') ? '6' + rawPhone : rawPhone;
                        const waChatUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                          `Hi ${order.customerName}! 🌷 Bloomora here regarding your order #${order.orderNumber}.`
                        )}`;

                        return (
                          <div
                            key={order.id}
                            className="p-4 sm:p-5 bg-white rounded-2xl border border-[#F8C8DC] shadow-2xs space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F8C8DC]/40 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-sm text-[#594A4E]">
                                  {order.orderNumber}
                                </span>
                                <span
                                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                                    statusColors[order.orderStatus]
                                  }`}
                                >
                                  {order.orderStatus.replace('_', ' ')}
                                </span>
                                {order.discountApplied && (
                                  <span className="text-[10px] font-semibold bg-[#FADADD] text-[#8B3A4D] px-2 py-0.5 rounded-full">
                                    10% OFF Applied
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 text-xs text-[#594A4E]/70">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{new Date(order.createdAt).toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Customer and Items Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                              {/* Customer Information */}
                              <div className="space-y-1">
                                <strong className="block text-[#594A4E] text-sm">{order.customerName}</strong>
                                <div className="flex items-center gap-1.5 text-[#594A4E]/80">
                                  <Phone className="w-3.5 h-3.5 text-[#D88C9A]" />
                                  <span>{order.phoneNumber}</span>
                                  <a
                                    href={waChatUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-1 text-[10px] text-[#25D366] font-semibold hover:underline flex items-center gap-0.5"
                                  >
                                    <MessageSquare className="w-3 h-3" /> WhatsApp
                                  </a>
                                </div>
                                {order.email && (
                                  <div className="flex items-center gap-1.5 text-[#594A4E]/80">
                                    <Mail className="w-3.5 h-3.5 text-[#D88C9A]" />
                                    <span>{order.email}</span>
                                  </div>
                                )}
                                <div className="pt-1">
                                  <span className="font-semibold text-[#594A4E]">Delivery: </span>
                                  <span className="capitalize">{order.deliveryMethod}</span>
                                  {order.deliveryNotes && (
                                    <p className="text-[11px] text-[#594A4E]/70 italic mt-0.5">
                                      “{order.deliveryNotes}”
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Order Items */}
                              <div className="space-y-1">
                                <span className="font-semibold text-[#594A4E] block">Items Ordered:</span>
                                <ul className="space-y-1">
                                  {order.items.map((item, idx) => (
                                    <li key={idx} className="flex justify-between text-[#594A4E]/90">
                                      <span>
                                        {item.quantity}× {item.productName}
                                      </span>
                                      <span className="font-medium">
                                        RM {(item.price * item.quantity).toFixed(2)}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Payment Total & Actions */}
                              <div className="space-y-2 flex flex-col justify-between">
                                <div className="bg-[#FFF9F5] p-2.5 rounded-xl border border-[#F8C8DC]/60 space-y-1">
                                  <div className="flex justify-between text-[#594A4E]/70">
                                    <span>Subtotal:</span>
                                    <span>RM {order.subtotal.toFixed(2)}</span>
                                  </div>
                                  {order.discount > 0 && (
                                    <div className="flex justify-between text-[#8B3A4D] font-medium">
                                      <span>Discount (10%):</span>
                                      <span>-RM {order.discount.toFixed(2)}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between text-[#594A4E] font-bold text-sm pt-1 border-t border-[#F8C8DC]">
                                    <span>Total:</span>
                                    <span>RM {order.totalAmount.toFixed(2)}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 pt-1">
                                  {!order.isPaid && (
                                    <button
                                      onClick={() => verifyOrderPayment(order.id)}
                                      className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>Verify DuitNow</span>
                                    </button>
                                  )}

                                  <select
                                    value={order.orderStatus}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                    className="py-1.5 px-2 bg-white border border-[#F8C8DC] rounded-xl text-xs text-[#594A4E] focus:outline-hidden font-medium"
                                  >
                                    <option value="pending_payment">Pending Payment</option>
                                    <option value="payment_verified">Payment Verified</option>
                                    <option value="preparing_kit">Preparing Kit</option>
                                    <option value="ready">Ready (Pickup/Delivery)</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>

                                  <button
                                    onClick={() => {
                                      if (confirm(`Delete order ${order.orderNumber}?`)) {
                                        deleteOrder(order.id);
                                      }
                                    }}
                                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                                    title="Delete Order"
                                  >
                                    <Trash2 className="w-4 h-4" />
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
              )}

              {/* TAB 2: PRODUCT MANAGEMENT */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-[#594A4E]">Bloomora Flower Kits Catalogue</h4>
                      <p className="text-xs text-[#594A4E]/70">
                        Edit prices, toggle stock availability, and update DIY descriptions.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('Reset all 11 products to default catalogue prices?')) {
                          resetProducts();
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl border border-[#F8C8DC] text-xs font-semibold text-[#594A4E] hover:bg-[#FADADD]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Catalog</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 bg-white rounded-2xl border border-[#F8C8DC] shadow-2xs space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D88C9A]">
                              {product.category} kit
                            </span>
                            <h5 className="font-serif font-bold text-sm text-[#594A4E]">{product.name}</h5>
                            <p className="text-xs text-[#594A4E]/70 line-clamp-1">{product.shortDescription}</p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-serif font-bold text-base text-[#594A4E]">
                              RM {product.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Quick In-line adjustments */}
                        <div className="pt-2 border-t border-[#F8C8DC]/60 flex items-center justify-between text-xs">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={product.inStock}
                              onChange={(e) => updateProduct({ ...product, inStock: e.target.checked })}
                              className="w-4 h-4 text-[#D88C9A] rounded border-[#F8C8DC] focus:ring-0"
                            />
                            <span className={product.inStock ? 'text-emerald-700 font-semibold' : 'text-rose-600'}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </label>

                          <div className="flex items-center gap-2">
                            <span className="text-[#594A4E]/70">Price: RM</span>
                            <input
                              type="number"
                              step="0.5"
                              value={product.price}
                              onChange={(e) => {
                                const newPrice = parseFloat(e.target.value) || 0;
                                updateProduct({ ...product, price: newPrice });
                              }}
                              className="w-20 px-2 py-1 bg-[#FFF9F5] border border-[#F8C8DC] rounded-lg text-xs font-semibold text-[#594A4E]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SALES & ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-[#F8C8DC] shadow-2xs space-y-1">
                      <span className="text-xs font-semibold uppercase text-[#D88C9A] block">Total Verified Sales</span>
                      <strong className="text-2xl font-serif font-bold text-[#594A4E] block">
                        RM {totalRevenue.toFixed(2)}
                      </strong>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        From {paidOrdersCount} verified orders
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-[#F8C8DC] shadow-2xs space-y-1">
                      <span className="text-xs font-semibold uppercase text-amber-700 block">Pending Verification</span>
                      <strong className="text-2xl font-serif font-bold text-[#594A4E] block">
                        RM {pendingRevenue.toFixed(2)}
                      </strong>
                      <span className="text-[11px] text-amber-800 font-medium">
                        {pendingOrdersCount} orders awaiting slip
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-[#F8C8DC] shadow-2xs space-y-1">
                      <span className="text-xs font-semibold uppercase text-[#D88C9A] block">Total Orders</span>
                      <strong className="text-2xl font-serif font-bold text-[#594A4E] block">
                        {orders.length}
                      </strong>
                      <span className="text-[11px] text-[#594A4E]/70 font-medium">
                        Student Boutique Orders
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-[#F8C8DC] shadow-2xs space-y-1">
                      <span className="text-xs font-semibold uppercase text-[#D88C9A] block">Avg. Order Value</span>
                      <strong className="text-2xl font-serif font-bold text-[#594A4E] block">
                        RM {orders.length > 0 ? (totalRevenue / (paidOrdersCount || 1)).toFixed(2) : '0.00'}
                      </strong>
                      <span className="text-[11px] text-[#594A4E]/70 font-medium">
                        Per verified order
                      </span>
                    </div>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="p-5 bg-white rounded-2xl border border-[#F8C8DC] space-y-3">
                    <h5 className="font-serif font-bold text-[#594A4E]">Order Status Distribution</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      {(['pending_payment', 'payment_verified', 'preparing_kit', 'ready', 'completed'] as const).map(
                        (st) => {
                          const count = orders.filter((o) => o.orderStatus === st).length;
                          return (
                            <div key={st} className="p-3 bg-[#FFF9F5] rounded-xl border border-[#F8C8DC]/60">
                              <span className="capitalize font-semibold text-[#594A4E] block">
                                {st.replace('_', ' ')}
                              </span>
                              <span className="text-lg font-bold text-[#D88C9A]">{count}</span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: 10% LAUNCH PROMOTION */}
              {activeTab === 'promotions' && (
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-2xl border border-[#F8C8DC] shadow-2xs space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D88C9A]">
                          Campaign Status
                        </span>
                        <h4 className="font-serif text-xl font-bold text-[#594A4E]">
                          {promotion.campaignName}
                        </h4>
                        <p className="text-xs text-[#594A4E]/70 mt-1">
                          10% discount for the first 30 eligible orders. Synchronized with Firebase Firestore.
                        </p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-bold border ${
                          promotion.isActive
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-stone-100 text-stone-700 border-stone-300'
                        }`}
                      >
                        {promotion.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs font-medium text-[#594A4E]">
                        <span>
                          Redemptions: <strong>{promotion.currentRedemptions}</strong> of{' '}
                          <strong>{promotion.maxRedemptions}</strong>
                        </span>
                        <span className="text-[#8B3A4D] font-bold">
                          {Math.max(0, promotion.maxRedemptions - promotion.currentRedemptions)} spots left
                        </span>
                      </div>

                      <div className="w-full bg-[#FFF9F5] border border-[#F8C8DC] h-3 rounded-full overflow-hidden p-0.5">
                        <div
                          className="bg-gradient-to-r from-[#F8C8DC] to-[#D88C9A] h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              100,
                              (promotion.currentRedemptions / promotion.maxRedemptions) * 100
                            )}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="pt-4 border-t border-[#F8C8DC]/60 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => updatePromotion({ isActive: !promotion.isActive })}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          promotion.isActive
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {promotion.isActive ? 'Pause Promotion' : 'Activate Promotion'}
                      </button>

                      <button
                        onClick={() => {
                          const newCount = prompt('Set current redemption count (0-30):', String(promotion.currentRedemptions));
                          if (newCount !== null) {
                            const parsed = parseInt(newCount, 10);
                            if (!isNaN(parsed) && parsed >= 0 && parsed <= 30) {
                              updatePromotion({ currentRedemptions: parsed });
                            }
                          }
                        }}
                        className="px-4 py-2 bg-white border border-[#F8C8DC] hover:border-[#D88C9A] rounded-xl text-xs font-semibold text-[#594A4E] transition-colors cursor-pointer"
                      >
                        Adjust Redemption Counter
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Reset redemption counter to 0?')) {
                            updatePromotion({ currentRedemptions: 0 });
                          }
                        }}
                        className="px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      >
                        Reset Counter
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BUSINESS SETTINGS & ENQUIRIES */}
              {activeTab === 'settings' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Settings Form */}
                  <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#F8C8DC] shadow-2xs space-y-4">
                    <div>
                      <h4 className="font-serif font-bold text-[#594A4E]">Boutique Contact & DuitNow Settings</h4>
                      <p className="text-xs text-[#594A4E]/70">
                        Update WhatsApp number, DuitNow QR account details, and pickup location info.
                      </p>
                    </div>

                    {settingsSaved && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Settings saved successfully!</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveSettings} className="space-y-3 text-xs">
                      <div>
                        <label className="font-semibold text-[#594A4E] block mb-1">Official WhatsApp Contact</label>
                        <input
                          type="text"
                          value={settingsForm.whatsappNumber}
                          onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F8C8DC] rounded-xl text-[#594A4E] focus:outline-hidden"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-[#594A4E] block mb-1">DuitNow Recipient Name</label>
                          <input
                            type="text"
                            value={settingsForm.duitnowRecipientName}
                            onChange={(e) => setSettingsForm({ ...settingsForm, duitnowRecipientName: e.target.value })}
                            className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F8C8DC] rounded-xl text-[#594A4E] focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-[#594A4E] block mb-1">DuitNow Bank / E-Wallet</label>
                          <input
                            type="text"
                            value={settingsForm.duitnowBankName}
                            onChange={(e) => setSettingsForm({ ...settingsForm, duitnowBankName: e.target.value })}
                            className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F8C8DC] rounded-xl text-[#594A4E] focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#594A4E] block mb-1">Self-Pickup Hub Location</label>
                        <textarea
                          rows={2}
                          value={settingsForm.pickupLocationDetails}
                          onChange={(e) => setSettingsForm({ ...settingsForm, pickupLocationDetails: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F8C8DC] rounded-xl text-[#594A4E] focus:outline-hidden"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-[#D88C9A] hover:bg-[#c97b89] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Customer Enquiries */}
                  <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#F8C8DC] shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-[#594A4E]">Customer Enquiries ({enquiries.length})</h4>
                    </div>

                    {enquiries.length === 0 ? (
                      <p className="text-xs text-[#594A4E]/70 py-4 text-center">No customer enquiries submitted yet.</p>
                    ) : (
                      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                        {enquiries.map((enq) => (
                          <div key={enq.id} className="p-3 bg-[#FFF9F5] rounded-xl border border-[#F8C8DC]/60 space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <strong className="text-[#594A4E]">{enq.name}</strong>
                              <span className="text-[10px] text-[#594A4E]/60">
                                {new Date(enq.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#D88C9A] font-medium">{enq.contact}</p>
                            <p className="text-[#594A4E]/80 text-[11px] leading-relaxed pt-1">
                              “{enq.message}”
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
