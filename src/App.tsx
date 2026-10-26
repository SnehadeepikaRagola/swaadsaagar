import { useCallback, useState } from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { AboutSection, Footer } from '@/components/AboutSection';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal, type OrderInfo } from '@/components/CheckoutModal';
import { ConfirmationModal } from '@/components/ConfirmationModal';

function Shell() {
  const { clear } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [order, setOrder] = useState<OrderInfo | null>(null);

  const openCheckout = useCallback(() => {
    setCartOpen(false);
    setCheckoutOpen(true);
  }, []);

  const handleConfirmed = useCallback(
    (info: OrderInfo) => {
      setCheckoutOpen(false);
      setOrder(info);
    },
    []
  );

  const closeConfirmation = useCallback(() => {
    setOrder(null);
    clear();
  }, [clear]);

  return (
    <div className="min-h-screen bg-cream font-sans text-stone-800">
      <Header onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <MenuSection />
        <AboutSection />
      </main>
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={openCheckout}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onConfirmed={handleConfirmed}
      />
      <ConfirmationModal
        order={order}
        onClose={() => setOrder(null)}
        onHome={closeConfirmation}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}
