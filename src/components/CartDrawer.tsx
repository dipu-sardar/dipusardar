import React from 'react';
import type { CartItem } from '../types';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import './CartDrawer.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-backdrop fade-in" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrapper">
            <ShoppingBag size={20} />
            <h2 className="drawer-title">SAVED PROJECTS</h2>
            <span className="drawer-item-count">({cartItems.length})</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close drawer">
            <X size={22} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={48} className="empty-cart-icon" />
              <h3 className="empty-cart-title">Your deck is empty</h3>
              <p className="empty-cart-desc">
                Looks like you haven't added any projects to your deck yet.
              </p>
              <button className="empty-cart-shop-btn" onClick={onClose}>
                EXPLORE PROJECTS
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-img-wrapper">
                    <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <span className="cart-item-category">{item.product.category}</span>
                      <h4 className="cart-item-name">{item.product.name}</h4>
                    </div>
                    <div className="cart-item-footer">
                      {/* Quantity Controls */}
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      {/* Price and Trash */}
                      <div className="cart-item-price-remove">
                        <span className="cart-item-price">${item.product.price * item.quantity}</span>
                        <button 
                          className="remove-item-btn"
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span className="summary-label">Total Licensing</span>
              <span className="summary-value">${subtotal.toFixed(2)}k</span>
            </div>
            <p className="shipping-note">Estimates calculated for custom integration licensing.</p>
            <button className="checkout-btn" onClick={onCheckout}>
              SUBMIT INQUIRY DECK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
