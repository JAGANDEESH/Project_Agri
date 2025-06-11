import { create } from 'zustand';
import { Product } from '../types';

interface ProductState {
  products: Product[];
  loading: boolean;
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  fetchProducts: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  getFilteredProducts: () => Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    description: 'Juicy, ripe tomatoes perfect for salads and cooking',
    price: 3.99,
    quantity: 50,
    category: 'Fruits',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'kg',
    inStock: true
  },
  {
    id: '2',
    name: 'Organic Carrots',
    description: 'Fresh organic carrots, rich in vitamins and minerals',
    price: 2.49,
    quantity: 30,
    category: 'Root Vegetables',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'kg',
    inStock: true
  },
  {
    id: '3',
    name: 'Green Spinach',
    description: 'Fresh leafy spinach, perfect for salads and smoothies',
    price: 1.99,
    quantity: 25,
    category: 'Leafy Greens',
    image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'bunch',
    inStock: true
  },
  {
    id: '4',
    name: 'Bell Peppers',
    description: 'Colorful bell peppers, sweet and crunchy',
    price: 4.99,
    quantity: 40,
    category: 'Fruits',
    image: 'https://images.pexels.com/photos/594137/pexels-photo-594137.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'kg',
    inStock: true
  },
  {
    id: '5',
    name: 'Fresh Broccoli',
    description: 'Nutritious broccoli florets, great for steaming',
    price: 3.49,
    quantity: 20,
    category: 'Cruciferous',
    image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'head',
    inStock: true
  },
  {
    id: '6',
    name: 'Red Onions',
    description: 'Sharp and flavorful red onions for cooking',
    price: 1.79,
    quantity: 35,
    category: 'Root Vegetables',
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'kg',
    inStock: true
  }
];

const categories = ['All', 'Fruits', 'Root Vegetables', 'Leafy Greens', 'Cruciferous'];

export const useProductStore = create<ProductState>((set, get) => ({
  products: mockProducts,
  loading: false,
  searchTerm: '',
  selectedCategory: 'All',
  categories,

  fetchProducts: async () => {
    set({ loading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ loading: false });
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },

  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category });
  },

  getFilteredProducts: () => {
    const { products, searchTerm, selectedCategory } = get();
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory && product.inStock;
    });
  },

  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    set(state => ({
      products: [...state.products, newProduct]
    }));
  },

  updateProduct: (id: string, productData) => {
    set(state => ({
      products: state.products.map(product =>
        product.id === id ? { ...product, ...productData } : product
      )
    }));
  },

  deleteProduct: (id: string) => {
    set(state => ({
      products: state.products.filter(product => product.id !== id)
    }));
  }
}));