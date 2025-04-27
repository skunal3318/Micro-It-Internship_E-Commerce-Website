import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button variant="primary" icon={<ShoppingBag className="h-5 w-5" />}>
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Cart Items ({totalItems})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear Cart
                  </button>
                </div>
                <div className="divide-y divide-gray-200">
                  {items.map(item => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Link 
                to="/products" 
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3 mb-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                fullWidth
                onClick={handleCheckout}
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Secure checkout powered by DigitalMarket</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
