import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const CheckoutSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // Set current time when component mounts
    setCurrentTime(new Date());
  }, []);
  
  // Format date as "Month Day, Year"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentTime);
  
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Purchase!
        </h1>
        
        <p className="text-lg text-gray-700 mb-6">
          Your order has been successfully processed.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-left mb-4">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-lg font-medium">{orderId}</p>
          </div>
          
          <div className="text-left mb-4">
            <p className="text-sm text-gray-500">Date</p>
            <p className="text-lg">{formattedDate}</p>
          </div>
          
          <div className="text-left">
            <p className="text-sm text-gray-500">Download</p>
            <p className="text-blue-600">
              Your download link has been sent to your email. You can also access your purchases from your account.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-600 mb-6">
            We've sent a receipt to your email address. If you have any questions about your order, please contact our support team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;