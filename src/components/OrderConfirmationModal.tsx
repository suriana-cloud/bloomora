import React from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { CheckCircle2, Clock, MessageSquare, Copy, X, Sparkles, QrCode } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { lastConfirmedOrder, setLastConfirmedOrder, settings } = useBloomora();
  const [copied, setCopied] = React.useState(false);

  if (!lastConfirmedOrder) return null;

  const order = lastConfirmedOrder;

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rawDigits = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const cleanPhone = rawDigits.startsWith('0')
    ? '6' + rawDigits
    : rawDigits.startsWith('60')
    ? rawDigits
    : '60' + rawDigits;
  const whatsappReceiptMessage = encodeURIComponent(
    `Hi Bloomora! 🌷 I have placed Order #${order.orderNumber} for RM ${order.totalAmount.toFixed(2)}. Here is my payment receipt for verification.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappReceiptMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-[#FFF9F5] rounded-3xl border border-[#F8C8DC] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FADADD] via-[#F8C8DC] to-[#FADADD] p-6 text-center relative border-b border-[#D88C9A]/30">
          <button
            onClick={() => setLastConfirmedOrder(null)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-[#594A4E] flex items-center justify-center cursor-pointer"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-xs mb-3">
            <CheckCircle2 className="w-8 h-8 text-[#D88C9A]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#594A4E]">
            Thank You, {order.customerName}!
          </h2>
          <p className="text-xs sm:text-sm text-[#594A4E]/80 mt-1">
            Your DIY Fuzzy Flower Kit order has been submitted.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Order Reference Box */}
          <div className="p-4 bg-white rounded-2xl border border-[#F8C8DC] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#D88C9A] tracking-wider block">
                Your Order Number
              </span>
              <span className="text-lg font-mono font-bold text-[#594A4E]">
                {order.orderNumber}
              </span>
            </div>

            <button
              onClick={handleCopyOrderNumber}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#594A4E] bg-[#FFF9F5] hover:bg-[#FADADD]/50 border border-[#F8C8DC] rounded-lg transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-[#D88C9A]" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Order Status Notice (Explicitly unpaid until verified) */}
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-900 block text-sm">
                Order Status: Pending Payment Verification
              </span>
              <p className="text-amber-800/90 mt-1 leading-relaxed">
                As per Bloomora policy, your order is recorded as <strong>Unpaid</strong> until your DuitNow payment transfer is verified by our team. Please complete payment below.
              </p>
            </div>
          </div>

          {/* Ordered Products Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-[#F8C8DC] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#594A4E]">
              Ordered DIY Kits
            </h3>
            <div className="divide-y divide-[#F8C8DC]/60 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2 flex justify-between">
                  <span className="text-[#594A4E]">
                    {item.productName} × {item.quantity}
                  </span>
                  <span className="font-semibold tabular-nums text-[#594A4E]">
                    RM{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#F8C8DC] flex justify-between text-sm font-bold text-[#594A4E]">
              <span>Total Payment:</span>
              <span className="tabular-nums text-[#D88C9A]">RM{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Instructions & DuitNow QR */}
          <div className="p-5 bg-white rounded-2xl border border-[#F8C8DC] space-y-3">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#ED237A]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#594A4E]">
                Payment Instructions (DuitNow QR)
              </h3>
            </div>

            <ol className="text-xs text-[#594A4E]/80 space-y-2 list-decimal pl-4">
              <li>
                Open your online banking (Maybank, CIMB, Bank Islam, etc.) or eWallet (Touch 'n Go, GrabPay).
              </li>
              <li>
                Transfer <strong>RM{order.totalAmount.toFixed(2)}</strong> to DuitNow ID: <strong className="font-mono text-[#594A4E]">{settings.duitnowQrNumber}</strong> ({settings.duitnowRecipientName}).
              </li>
              <li>
                In the transfer reference, enter your Order Number: <strong className="font-mono">{order.orderNumber}</strong>.
              </li>
              <li>
                Save your payment receipt screenshot.
              </li>
            </ol>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 text-center cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send Payment Receipt via WhatsApp</span>
            </a>

            <button
              onClick={() => setLastConfirmedOrder(null)}
              className="w-full py-3 px-4 bg-white hover:bg-[#FADADD]/40 border border-[#F8C8DC] text-[#594A4E] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Back to Storefront
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
