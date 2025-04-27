import React from 'react';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1">
        <h3 className="text-base font-medium text-gray-800">{product.title}</h3>
        <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)} × {quantity}</p>
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remove item"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
