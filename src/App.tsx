import { useState, Suspense, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster, toast } from 'sonner';
import { PRODUCTS, type Product } from '@/data/products';
import { DynamicBackground } from '@/features/layout/DynamicBackground';
import { Header } from '@/features/layout/Header';
import { Footer } from '@/features/layout/Footer';
import { ProductGrid } from '@/features/shop/ProductGrid';
import { CharityBanner } from '@/features/layout/CharityBanner';

// Lazy load the heavy detail view
const ProductDetail = lazy(() => import('@/features/shop/ProductDetail').then(module => ({ default: module.ProductDetail })));

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  // Check for success param from Stripe redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      toast.success('Order confirmed! Check your email.', {
        duration: 5000,
        style: {
          background: 'var(--bg-surface)',
          color: 'var(--fg-primary)',
          border: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(10px)'
        }
      });
      // Clean URL
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
      <DynamicBackground />

      <div className="min-h-screen flex flex-col">
        <CharityBanner />
        <Header />

        <main style={{ flex: 1, padding: '0 var(--space-lg)' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingTop: 'var(--space-xl)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-brand)',
              fontSize: '3rem',
              color: 'var(--fg-primary)',
              marginBottom: 'var(--space-md)'
            }}>
              Liquid Glass Collection
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--fg-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              marginBottom: 'var(--space-xl)'
            }}>
              A limited series of abstract prints exploring the boundaries of color and light.
              Proceeds support local art education and children's healthcare.
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