import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Monitor, FileText } from 'lucide-react';
import { Product } from '../types';
import { productService } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await productService.getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Premium Digital Products for Modern Creators
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover high-quality ebooks, courses, and templates to enhance your skills and boost your projects.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg">
                    Browse Products
                  </Button>
                </Link>
                <Link to="/products?category=course">
                  <Button variant="outline" size="lg" className="bg-white bg-opacity-10 border-white text-white">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 bg-blue-500 rounded-lg w-64 h-64 opacity-20"></div>
                <div className="absolute -bottom-6 -right-6 bg-purple-500 rounded-lg w-64 h-64 opacity-20"></div>
                <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Digital products showcase"
                    className="rounded-lg shadow-md mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-gray-800 font-medium">Digital Creation Masterclass</h3>
                      <p className="text-blue-600 font-bold">$89.99</p>
                    </div>
                    <Button variant="primary" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">eBooks</h3>
              <p className="text-gray-600 mb-4">Comprehensive guides and references on various tech topics and development.</p>
              <Link 
                to="/products?category=ebook" 
                className="text-blue-600 font-medium flex items-center hover:text-blue-800"
              >
                Browse eBooks
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Monitor className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Online Courses</h3>
              <p className="text-gray-600 mb-4">Interactive video courses with exercises and projects to build your skills.</p>
              <Link 
                to="/products?category=course" 
                className="text-purple-600 font-medium flex items-center hover:text-purple-800"
              >
                Browse Courses
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-teal-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Templates</h3>
              <p className="text-gray-600 mb-4">Ready-to-use templates and boilerplates to jumpstart your projects.</p>
              <Link 
                to="/products?category=template" 
                className="text-teal-600 font-medium flex items-center hover:text-teal-800"
              >
                Browse Templates
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-blue-600 font-medium flex items-center hover:text-blue-800"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John M.</h4>
                  <p className="text-gray-600 text-sm">Web Developer</p>
                </div>
              </div>
              <p className="text-gray-700">"The React Development Masterclass completely transformed my approach to building web applications. The content is comprehensive and well-structured."</p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah L.</h4>
                  <p className="text-gray-600 text-sm">UX Designer</p>
                </div>
              </div>
              <p className="text-gray-700">"I purchased the Professional Portfolio Template and was able to customize it and get my portfolio live in just a few hours! Excellent quality and documentation."</p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xl">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Alex P.</h4>
                  <p className="text-gray-600 text-sm">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-700">"The Advanced CSS and Sass Techniques eBook has been an invaluable resource for our team. The concepts are explained clearly with practical examples."</p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to enhance your skills?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Browse our collection of premium digital products and take your skills to the next level.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Explore All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;