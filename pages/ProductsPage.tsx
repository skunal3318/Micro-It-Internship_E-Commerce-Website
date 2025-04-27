import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Book, Monitor, FileText, Search, X } from 'lucide-react';
import { Product } from '../types';
import { productService } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/ui/Button';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const allProducts = await productService.getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    // Check for category in URL params
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [location.search]);
  
  useEffect(() => {
    // Filter products based on category and search query
    let result = [...products];
    
    if (activeCategory) {
      result = result.filter(product => product.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [products, activeCategory, searchQuery]);
  
  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
    // Update URL without page reload
    const url = new URL(window.location.href);
    if (category) {
      url.searchParams.set('category', category);
    } else {
      url.searchParams.delete('category');
    }
    window.history.pushState({}, '', url);
  };
  
  const clearFilters = () => {
    setActiveCategory(null);
    setSearchQuery('');
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.delete('category');
    window.history.pushState({}, '', url);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Our Products</h1>
      
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCategory === null ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(null)}
            >
              All
            </Button>
            <Button
              variant={activeCategory === 'ebook' ? 'primary' : 'outline'}
              size="sm"
              icon={<Book className="h-4 w-4" />}
              onClick={() => handleCategoryChange('ebook')}
            >
              eBooks
            </Button>
            <Button
              variant={activeCategory === 'course' ? 'primary' : 'outline'}
              size="sm"
              icon={<Monitor className="h-4 w-4" />}
              onClick={() => handleCategoryChange('course')}
            >
              Courses
            </Button>
            <Button
              variant={activeCategory === 'template' ? 'primary' : 'outline'}
              size="sm"
              icon={<FileText className="h-4 w-4" />}
              onClick={() => handleCategoryChange('template')}
            >
              Templates
            </Button>
            
            {(activeCategory || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                icon={<X className="h-4 w-4" />}
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Active filters display */}
        {(activeCategory || searchQuery) && (
          <div className="text-sm text-gray-600">
            <span>Active filters: </span>
            {activeCategory && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                Category: {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Search: "{searchQuery}"
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-48 w-full"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;