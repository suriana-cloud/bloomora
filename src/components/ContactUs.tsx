import React, { useState } from 'react';
import { useBloomora } from '../context/BloomoraContext';
import { MessageSquare, Instagram, Facebook, Send, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const { settings, submitEnquiry } = useBloomora();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const rawDigits = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const cleanPhone = rawDigits.startsWith('0')
    ? '6' + rawDigits
    : rawDigits.startsWith('60')
    ? rawDigits
    : '60' + rawDigits;
  const generalWhatsappMsg = encodeURIComponent(
    "Hi Bloomora! 🌷 I'm interested in your DIY Fuzzy Flower Kits. May I know more about your products?"
  );
  const whatsappLink = `https://wa.me/${cleanPhone}?text=${generalWhatsappMsg}`;

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitted(true);
    await submitEnquiry({ name, contact, message });
    setTimeout(() => {
      setName('');
      setContact('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FFF9F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D88C9A]">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#594A4E] tracking-tight">
            Contact Bloomora
          </h2>
          <p className="text-sm sm:text-base text-[#594A4E]/80 leading-relaxed">
            Have questions about our DIY Fuzzy Flower Kits, bulk orders, or custom bouquet arrangements? We’d love to help you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Channels & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 bg-white rounded-3xl border border-[#F8C8DC] shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#594A4E]">
                Connect With Us
              </h3>

              {/* WhatsApp direct button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp ({settings.whatsappNumber})</span>
              </a>

              {/* Social Channels */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#594A4E]/70 block">
                  Official Social Channels
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#FFF9F5] hover:bg-[#FADADD]/40 border border-[#F8C8DC] rounded-xl flex items-center gap-2 text-xs font-semibold text-[#594A4E] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                    <span className="truncate">Instagram</span>
                  </a>

                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#FFF9F5] hover:bg-[#FADADD]/40 border border-[#F8C8DC] rounded-xl flex items-center gap-2 text-xs font-semibold text-[#594A4E] transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-[#1877F2]" />
                    <span className="truncate">Facebook</span>
                  </a>
                </div>
              </div>

              {/* Student pickup location info */}
              <div className="pt-3 border-t border-[#F8C8DC]/60 space-y-2 text-xs text-[#594A4E]/80">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D88C9A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#594A4E]">Self-Pickup Hub:</strong>
                    <span>{settings.pickupLocationDetails}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Customer Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#F8C8DC] shadow-xs">
            <h3 className="font-serif text-xl font-bold text-[#594A4E] mb-1">
              Send an Enquiry
            </h3>
            <p className="text-xs text-[#594A4E]/70 mb-6">
              Fill in your details and our student team will get back to you promptly.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-base text-emerald-900">
                  Thank you for reaching out!
                </h4>
                <p className="text-xs text-emerald-800">
                  Your enquiry has been received. You can also chat directly on WhatsApp for immediate assistance.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#594A4E] mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Siti Nurhaliza"
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FFF9F5] border border-[#F8C8DC] focus:border-[#D88C9A] focus:outline-none rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#594A4E] mb-1">
                    Phone / WhatsApp or Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. 013-9876543 or email@example.com"
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FFF9F5] border border-[#F8C8DC] focus:border-[#D88C9A] focus:outline-none rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#594A4E] mb-1">
                    Your Message / Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Ask us anything about kit materials, bouquet wrapping, or workshop enquiries..."
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FFF9F5] border border-[#F8C8DC] focus:border-[#D88C9A] focus:outline-none rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#D88C9A] hover:bg-[#c97b89] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
