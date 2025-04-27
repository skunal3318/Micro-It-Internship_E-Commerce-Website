import { Product, User } from '../types';

export const products: Product[] = [
  {
    id: '1',
    title: 'Modern JavaScript: From Fundamentals to Advanced',
    description: 'Master JavaScript with this comprehensive guide covering everything from basic syntax to advanced patterns and modern ES6+ features. Includes practical exercises and real-world examples.',
    price: 29.99,
    imageUrl: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'ebook',
    featured: true
  },
  {
    id: '2',
    title: 'React Development Masterclass',
    description: 'Learn to build professional React applications from scratch. This course covers component architecture, state management, hooks, context API, and integration with backend services.',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/4974920/pexels-photo-4974920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'course',
    featured: true
  },
  {
    id: '3',
    title: 'The Complete TypeScript Handbook',
    description: 'Comprehensive guide to TypeScript, covering types, interfaces, generics, decorators, and advanced type manipulation. Perfect for JavaScript developers looking to add type safety to their projects.',
    price: 24.99,
    imageUrl: 'https://images.pexels.com/photos/5926370/pexels-photo-5926370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'ebook'
  },
  {
    id: '4',
    title: 'Node.js API Development Course',
    description: 'Learn to build robust, scalable APIs with Node.js, Express, and MongoDB. Covers RESTful design, authentication, error handling, testing, and deployment strategies.',
    price: 79.99,
    imageUrl: 'https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'course'
  },
  {
    id: '5',
    title: 'Professional Portfolio Website Template',
    description: 'A clean, modern portfolio template for developers and designers. Built with HTML, CSS, and JavaScript, this template is fully responsive and customizable.',
    price: 19.99,
    imageUrl: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'template'
  },
  {
    id: '6',
    title: 'Advanced CSS and Sass Techniques',
    description: 'Master advanced CSS and Sass with this comprehensive guide. Learn flexbox, grid, animations, responsive design, and how to write maintainable CSS with Sass.',
    price: 34.99,
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'ebook'
  }
];

// Mock user data
export const users: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123', // This would be hashed in a real app
    name: 'Demo User'
  }
];
