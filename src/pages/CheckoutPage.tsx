import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/api';
import Button from '../components/ui/Button';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Prepare order data
      const orderItems = items.map(item => ({
        id: item.product.id,
        quantity: item.quantity
      }));
      
      // Submit order
      const result = await orderService.createOrder(orderItems);
      
      if (result.success) {
        // Clear cart and redirect to success page
        clearCart();
        navigate(`/checkout/success?orderId=${result.orderId}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error (you could set an error state here)
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Validate form
  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.includes('@') &&
      formData.cardNumber.trim().length >= 15 &&
      formData.cardExpiry.trim() !== '' &&
      formData.cardCvc.trim().length >= 3
    );
  };
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="divide-y divide-gray-200">
              {items.map(item => (
                <div key={item.product.id} className="py-4 flex items-center">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-800">{item.product.title}</h3>
                    <p className="mt-1 text-xs text-gray-500 capitalize">
                      {item.product.category} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p className="text-blue-600">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Form */}
        <div>
          <h2 className="text-xl font-medium mb-4">Payment Information</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Lock className="h-4 w-4 mr-2" />
                  <span>Your information is secure</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        required
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                disabled={isSubmitting || !isFormValid()}
              >
                Complete Purchase
              </Button>
              
              <div className="mt-4 text-center text-xs text-gray-500">
                <p>
                  By completing this purchase, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;