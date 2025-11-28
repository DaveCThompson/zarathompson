// FILE: src/App.tsx
import { useState, Suspense, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { useAtomValue } from 'jotai';
import { darkModeAtom } from '@/data/atoms';
import { PRODUCTS, type Product } from '@/data/products';
import { getAssetUrl } from '@/data/assets';
import confetti from 'canvas-confetti';

import { InteractiveBackground } from '@/features/layout/InteractiveBackground';
import { Header } from '@/features/layout/Header';
import { Footer } from '@/features/layout/Footer';
import { ProductGrid } from '@/features/shop/ProductGrid';
import { CharityBanner } from '@/features/layout/CharityBanner';
import { SuccessModal } from '@/features/layout/SuccessModal';
import styles from './App.module.css';

const ProductDetail = lazy(() => import('@/features/shop/ProductDetail').then(module => ({ default: module.ProductDetail })));

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const isDark = useAtomValue(darkModeAtom);

  // --- 1. THEME ENGINE ---
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // --- 2. DEEP LINKING & SUCCESS LOGIC ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Check for Product ID
    const productId = params.get('product');
    if (productId) {
      const found = PRODUCTS.find(p => p.id === productId);
      if (found) {
        setSelectedProduct(found);
        setIsDetailOpen(true);
      }
    }

    // Check for Success Flag
    if (params.get('success') === 'true') {
      setIsSuccessOpen(true);
      
      // Trigger Confetti
      const duration = 3000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#00ff00', '#0000ff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#00ff00', '#0000ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // --- 3. URL SYNCING ---
  const handleOpenChange = (open: boolean) => {
    setIsDetailOpen(open);
    if (!open) {
      // Clear product from URL when closing
      const url = new URL(window.location.href);
      url.searchParams.delete('product');
      window.history.pushState({}, '', url);
      // Small delay to prevent flashing before modal animation finishes
      setTimeout(() => setSelectedProduct(null), 300);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('product', product.id);
    window.history.pushState({}, '', url);
  };

  return (
    <>
      <Helmet>
        <title>{selectedProduct ? `${selectedProduct.title} | Zara Thompson` : 'Zara Thompson | Art for Education'}</title>
        <meta name="description" content={selectedProduct ? selectedProduct.description : "Art by Zara Thompson. Supporting Education and BC Children's Hospital."} />
      </Helmet>

      <Toaster position="top-center" />

      <InteractiveBackground />

      <div className="min-h-screen flex flex-col relative z-10">

        {/* THE UNIFIED HEADER UNIT */}
        <div className="header-group">
          <CharityBanner />
          <Header />
        </div>

        <main className={styles.main}>
          <div className={styles.hero}>
            {/* AVATAR SECTION */}
            <div className={styles.avatar}>
                <img 
                    src={getAssetUrl('/assets/zara-avatar.webp')} 
                    alt="Zara Thompson"
                    className={styles.avatarImg}
                />
            </div>

            <h2 className={styles.title}>
              Hi! I'm Zara.
            </h2>
            <p className={styles.text}>
              I'm a Grade 6 student at Royal Oak Middle School. I created this art collection to help fund my future education and support <strong>Children's Health</strong>.
              <br /><br />
              Thank you for helping me make a difference!
            </p>
          </div>

          <ProductGrid
            products={PRODUCTS}
            onProductSelect={handleProductSelect}
          />
        </main>

        <Footer />
      </div>

      <Suspense fallback={null}>
        <ProductDetail
          product={selectedProduct}
          open={isDetailOpen}
          onOpenChange={handleOpenChange}
        />
      </Suspense>

      <SuccessModal 
        open={isSuccessOpen} 
        onOpenChange={setIsSuccessOpen} 
      />
    </>
  );
}

export default App