import React from 'react';
import type { Product } from '../types';
import { Heart, ShoppingBag } from 'lucide-react';
import './ProductCatalog.css';

// Import local assets
import blackBucketHatImg from '../assets/black_bucket_hat.png';
import greenCapImg from '../assets/green_cap.png';
import editorialManImg from '../assets/editorial_man.png';

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Neural Vision Core',
    price: 78,
    image: blackBucketHatImg,
    category: 'VISION',
    description: 'A deep learning framework for real-time semantic segmentation and object detection in technical environments.'
  },
  {
    id: 'prod-2',
    name: 'Latent Space Visualizer',
    price: 64,
    image: greenCapImg,
    category: 'INTERFACE',
    description: 'An interactive web interface for navigating high-dimensional generative embedding spaces in real-time.'
  },
  {
    id: 'prod-3',
    name: 'Autonomous Edge Traversal',
    price: 240,
    image: editorialManImg,
    category: 'ROBOTICS',
    description: 'A fully integrated computer vision and edge computing platform for autonomous drone navigation.'
  }
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  return (
    <section className="product-catalog-section" id="projects">
      <div className="catalog-header">
        <h2 className="catalog-subtitle">SELECTED WORK</h2>
        <h1 className="catalog-title">FEATURED PROJECTS</h1>
        <p className="catalog-intro">
          Explore our latest collection of deep learning architectures, generative interfaces, and technical designs, bridging logic and interaction.
        </p>
      </div>

      <div className="product-grid">
        {PRODUCTS.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          return (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-actions-overlay">
                  <button 
                    className={`product-action-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={() => onToggleWishlist(product)}
                    aria-label="Add to Wishlist"
                  >
                    <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                  <button 
                    className="product-action-btn add-cart-btn"
                    onClick={() => onAddToCart(product)}
                    aria-label="Add to Cart"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <div className="product-title-row">
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-price">${product.price}</span>
                </div>
                <p className="product-desc">{product.description}</p>
                <button className="mobile-add-btn" onClick={() => onAddToCart(product)}>
                  <ShoppingBag size={16} />
                  <span>ADD TO CART</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
