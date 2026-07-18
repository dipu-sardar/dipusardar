import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ShoppingBag } from 'lucide-react';
import type { Product } from '../types';
import { PRODUCTS } from './ProductCatalog';
import './SearchModal.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onAddToCart }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const filtered = PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop fade-in" onClick={onClose}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="search-modal-close-btn" onClick={onClose} aria-label="Close search">
          <X size={24} />
        </button>

        {/* Input Bar */}
        <div className="search-input-wrapper">
          <Search size={24} className="search-input-icon" />
          <input
            type="text"
            className="search-large-input"
            placeholder="Search projects, research, or modules (e.g. Vision, Interface, Robotics)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
          />
        </div>

        {/* Results Area */}
        <div className="search-results-area">
          {query.trim() === '' ? (
            <div className="search-suggestions">
              <h4 className="suggestion-title">SUGGESTED SEARCHES</h4>
              <div className="suggestion-tags">
                <button className="suggestion-tag-btn" onClick={() => setQuery('Vision')}>#VISION</button>
                <button className="suggestion-tag-btn" onClick={() => setQuery('Interface')}>#INTERFACE</button>
                <button className="suggestion-tag-btn" onClick={() => setQuery('Robotics')}>Robotics</button>
                <button className="suggestion-tag-btn" onClick={() => setQuery('Neural')}>Neural</button>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="no-results-state">
              <p className="no-results-text">No products found matching "{query}"</p>
            </div>
          ) : (
            <div className="search-results-grid">
              {results.map((product) => (
                <div key={product.id} className="search-result-item fade-in">
                  <div className="result-img-wrapper">
                    <img src={product.image} alt={product.name} className="result-img" />
                  </div>
                  <div className="result-details">
                    <span className="result-category">{product.category}</span>
                    <h4 className="result-name">{product.name}</h4>
                    <span className="result-price">${product.price}</span>
                  </div>
                  <button 
                    className="result-add-cart-btn"
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                  >
                    <ShoppingBag size={16} />
                    <span>ADD</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
