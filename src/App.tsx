/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BloomoraProvider } from './context/BloomoraContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProductCatalog } from './components/ProductCatalog';
import { PromotionsSection } from './components/PromotionsSection';
import { HowItWorks } from './components/HowItWorks';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  return (
    <BloomoraProvider>
      <div className="min-h-screen bg-[#FFF9F5] text-[#594A4E] flex flex-col font-sans selection:bg-[#F8C8DC] selection:text-[#594A4E]">
        {/* Sticky Header with 3-Zone layout and Promo Bar */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <WhyChooseUs />
          <ProductCatalog />
          <PromotionsSection />
          <HowItWorks />
          <AboutUs />
          <ContactUs />
        </main>

        {/* Boutique Footer */}
        <Footer />

        {/* Modals, Drawers & Floating Controls */}
        <ProductModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderConfirmationModal />
        <FloatingWhatsApp />
        <AdminDashboard />
      </div>
    </BloomoraProvider>
  );
}
