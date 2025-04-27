import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartContextType, CartItem, Product } from '../types';

// Create context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Update localStorage and calculate totals when items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Calculate total items and price
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const price = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    
    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  // Add product to cart
  const addToCart = (product: Product) => {
    setItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex !== -1) {
        // If product exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // Otherwise, add new item
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};