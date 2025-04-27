import { Product, User } from '../types';
import { products, users } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Product Service
export const productService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    await delay(500); // Simulate network delay
    return [...products];
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product | undefined> => {
    await delay(300);
    return products.find(product => product.id === id);
  },

  // Get featured products
  getFeaturedProducts: async (): Promise<Product[]> => {
    await delay(500);
    return products.filter(product => product.featured);
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    await delay(500);
    return products.filter(product => product.category === category);
  }
};

// Auth Service
export const authService = {
  // Login
  login: async (email: string, password: string): Promise<User | null> => {
    await delay(800); // Simulate network delay
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      // In a real app, we'd return a user without the password
      const { password, ...userWithoutPassword } = user;
      return { ...userWithoutPassword, password: '' };
    }
    return null;
  },

  // Signup
  signup: async (name: string, email: string, password: string): Promise<User | null> => {
    await delay(1000);
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return null;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };
    
    // In a real app, we'd persist this user
    users.push(newUser);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return { ...userWithoutPassword, password: '' };
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
};

// Order Service
export const orderService = {
  // Create order
  createOrder: async (products: { id: string; quantity: number }[]): Promise<{ success: boolean; orderId: string }> => {
    await delay(1500); // Simulate network delay
    
    // In a real app, we'd persist this order
    return {
      success: true,
      orderId: `ORDER-${Date.now()}`
    };
  }
};
