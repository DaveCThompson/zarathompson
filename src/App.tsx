import { useState } from 'react';
import { PRODUCTS, type Product } from './data/products';
import { DynamicBackground } from './features/layout/DynamicBackground';
import { Header } from './features/layout/Header';
import { Footer } from './features/layout/Footer';
import { ProductGrid } from './features/shop/ProductGrid';
import { ProductDetail } from './features/shop/ProductDetail';

import { CharityBanner } from './features/layout/CharityBanner';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  return (
    <>
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

      <ProductDetail
        product={selectedProduct}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </>
  );
}

export default App;
