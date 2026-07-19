import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { CartDrawer } from './components/CartDrawer';
import { ContactModal } from './components/ContactModal';
import { SearchModal } from './components/SearchModal';
import { ContactSection } from './components/ContactSection';
import { InfiniteCarousel } from './components/InfiniteCarousel';
import type { Product, CartItem } from './types';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show a premium floating toast message
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to your bag.`);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.product.id === productId);
      if (item) {
        showToast(`Removed "${item.product.name}" from your bag.`);
      }
      return prevItems.filter((i) => i.product.id !== productId);
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from your wishlist.`);
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to your wishlist.`);
        return [...prevWishlist, product];
      }
    });
  };

  const handleCheckout = () => {
    alert('Thank you! Project inquiry submitted successfully. I will get in touch shortly to discuss collaboration.');
    setCartItems([]);
    setCartOpen(false);
  };

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'projects' || sectionId === 'contact') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    // Fallback/Stub alerts for other sections
    showToast(`${sectionId.toUpperCase()} section placeholder - will be connected soon.`);
  };



  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification fade-in">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Layout Header */}
      <Header
        onNavClick={handleScrollToSection}
        onCallClick={() => {
          showToast('Opening dialer for call contact...');
          window.location.href = 'tel:+8801333655039';
        }}
      />

      {/* Hero Section */}
      <Hero />

      {/* Product Catalog Collections */}
      <ProductCatalog
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlist.map((w) => w.id)}
      />

      {/* Infinite Scrolling Carousel */}
      <InfiniteCarousel />

      {/* Aesthetic Contact Section */}
      <ContactSection />

      {/* Elegant Editorial Branding Footer */}
      <footer className="editorial-footer">
        <div className="footer-line"></div>
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">DIPU SARDAR</h2>
            <p className="footer-tagline">Machine Learning. Interface Design.</p>
          </div>
          <div className="footer-links">
            <div className="footer-link-col">
              <h4>EXPERTISE</h4>
              <button onClick={() => handleScrollToSection('projects')}>Computer Vision</button>
              <button onClick={() => handleScrollToSection('projects')}>Generative Systems</button>
              <button onClick={() => handleScrollToSection('projects')}>Autonomous Edge</button>
            </div>
            <div className="footer-link-col">
              <h4>CONNECT</h4>
              <button onClick={() => handleScrollToSection('contact')}>Contact Us</button>
              <button onClick={() => window.open('https://github.com/dipu-sardar', '_blank')}>GitHub</button>
              <button onClick={() => window.open('https://www.linkedin.com/in/dipu-sardar-1b6a07321/', '_blank')}>LinkedIn</button>
            </div>
            <div className="footer-link-col">
              <h4>LEGAL</h4>
              <button onClick={() => showToast('Privacy Policy: All works belong to corresponding research labs and partners.')}>Privacy Policy</button>
              <button onClick={() => showToast('Terms of Service: Feel free to clone this open-source portfolio.')}>Terms of Service</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} DIPU SARDAR. All rights reserved. Developed as an industry-standard portfolio layout.</p>
        </div>
      </footer>

      {/* Overlays / Modal Windows */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

export default App;
