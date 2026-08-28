import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { CartDrawer } from './components/CartDrawer';
import { ContactModal } from './components/ContactModal';
import { SearchModal } from './components/SearchModal';
import { ContactSection } from './components/ContactSection';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { MouseClickEffect } from './components/MouseClickEffect';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { ScrollFX } from './components/ScrollFX';
import type { Product, CartItem } from './types';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Product | null>(null);

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
    if (['projects', 'contact', 'about', 'skills'].includes(sectionId)) {
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
      <MouseClickEffect />
      <ScrollFX />
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
        onSelectProduct={setSelectedProject}
      />

      {/* About Section */}
      <About />

      {/* Skills / Tech Stack Section */}
      <Skills />

      {/* Aesthetic Contact Section */}
      <ContactSection />

      {/* Vibrant Lime Reference Design Footer */}
      <Footer
        onNavClick={handleScrollToSection}
        onShowToast={showToast}
      />

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

      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default App;
