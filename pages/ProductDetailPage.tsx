import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, BookOpen, Clock, DownloadCloud, Shield } from 'lucide-react';
import { Product } from '../types';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        if (!id) {
          throw new Error('Product ID is missing');
        }
        
        const productData = await productService.getProductById(id);
        if (!productData) {
          throw new Error('Product not found');
        }
        
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-80 rounded-lg"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Button variant="outline" onClick={() => navigate(-1)} icon={<ArrowLeft className="h-4 w-4" />}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-700 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="outline" onClick={() => navigate('/products')} icon={<ArrowLeft className="h-4 w-4" />}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <button onClick={() => navigate('/products')} className="hover:text-blue-600">
          Products
        </button>
        <span className="mx-2">/</span>
        <span className="capitalize">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{product.title}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-full object-cover aspect-[4/3]" 
          />
        </div>
        
        {/* Product Info */}
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <div className="text-2xl font-bold text-blue-600 mb-6">${product.price.toFixed(2)}</div>
          
          <div className="prose max-w-none text-gray-700 mb-6">
            <p>{product.description}</p>
          </div>
          
          {/* Features */}
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <h3 className="text-lg font-medium mb-3">What's Included:</h3>
            <ul className="space-y-2">
              {product.category === 'ebook' && (
                <>
                  <li className="flex items-center">
                    <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                    <span>100+ pages of content</span>
                  </li>
                  <li className="flex items-center">
                    <DownloadCloud className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Available in PDF, EPUB, and MOBI formats</span>
                  </li>
                </>
              )}
              
              {product.category === 'course' && (
                <>
                  <li className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <span>10+ hours of video content</span>
                  </li>
                  <li className="flex items-center">
                    <DownloadCloud className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Downloadable resources and exercises</span>
                  </li>
                </>
              )}
              
              {product.category === 'template' && (
                <>
                  <li className="flex items-center">
                    <DownloadCloud className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Source code included</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Lifetime updates</span>
                  </li>
                </>
              )}
              
              <li className="flex items-center">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                <span>30-day money-back guarantee</span>
              </li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth
              icon={<ShoppingCart className="h-5 w-5" />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              fullWidth
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;