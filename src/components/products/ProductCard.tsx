import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Book, Monitor, FileText } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

// Helper function to get the right icon based on category
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'ebook':
      return <Book className="h-4 w-4" />;
    case 'course':
      return <Monitor className="h-4 w-4" />;
    case 'template':
      return <FileText className="h-4 w-4" />;
    default:
      return <Book className="h-4 w-4" />;
  }
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link 
      to={`/products/${product.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-semibold flex items-center">
          {getCategoryIcon(product.category)}
          <span className="ml-1 capitalize">{product.category}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-blue-600 font-bold">
            ${product.price.toFixed(2)}
          </div>
          
          <Button
            variant="primary"
            size="sm"
            icon={<ShoppingCart className="h-4 w-4" />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
