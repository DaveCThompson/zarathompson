import { useState, Suspense, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster, toast } from 'sonner';
import { useAtomValue } from 'jotai';
import { darkModeAtom } from '@/data/atoms';
import { PRODUCTS, type Product } from '@/data/products';
import { InteractiveBackground } from '@/features/layout/InteractiveBackground';
import { Header } from '@/features/layout/Header';
import { Footer } from '@/features/layout/Footer';
import { ProductGrid } from '@/features/shop/ProductGrid';
import { CharityBanner } from '@/features/layout/CharityBanner';

const ProductDetail = lazy(() => import('@/features/shop/ProductDetail').then(module => ({ default: module.ProductDetail })));

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const isDark = useAtomValue(darkModeAtom);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      toast.success('Order confirmed! Check your email.', {
        duration: 5000,
        style: {
          background: 'var(--glass-surface)',
          color: 'var(--fg-primary)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(20px)'
        }
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Zara Thompson | Liquid Glass Collection</title>
        <meta name="description" content="A limited series of abstract prints exploring the boundaries of color and light." />
      </Helmet>
      
      <Toaster position="top-center" />
      
      <InteractiveBackground />

      <div className="min-h-screen flex flex-col relative z-10">
        
        {/* THE UNIFIED HEADER UNIT */}
        {/* Styles defined in index.css (.header-group) */}
        <div className="header-group">
          <CharityBanner />
          <Header />
        </div>

        <main style={{ flex: 1, padding: '0 var(--space-lg)' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingTop: 'var(--space-xl)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-brand)',
              fontSize: '3.5rem',
              color: 'var(--fg-primary)',
              marginBottom: 'var(--space-md)',
              textShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              Liquid Glass Collection
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--fg-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              marginBottom: 'var(--space-xl)',
              fontSize: '1.125rem',
              lineHeight: '1.6'
            }}>
              A limited series of abstract prints exploring the boundaries of color and light.
              <br/>
              <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>
                Move your cursor to ripple the glass.
              </span>
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
          onOpenChange={setIsDetailOpen}
        />
      </Suspense>
    </>
  );
}

export default App