import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, Shield, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: Leaf,
      title: 'Fresh & Organic',
      description: 'Hand-picked vegetables from local farms, delivered fresh to your door.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Same-day delivery available with real-time tracking.'
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: '100% satisfaction guarantee on all our products.'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Order anytime, anywhere with our convenient platform.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-25 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Fresh Vegetables
              <span className="block text-green-200">Delivered Daily</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
              Experience the finest selection of farm-fresh vegetables delivered straight to your doorstep. 
              Quality, freshness, and convenience in every order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={isAuthenticated ? "/products" : "/register"}
                className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-300 flex items-center group shadow-lg"
              >
                {isAuthenticated ? "Shop Now" : "Get Started"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-700 transition-all duration-300"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FreshVeggies?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to bringing you the freshest vegetables with unmatched convenience and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-green-100">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Eating Fresh?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of customers who trust us for their daily vegetable needs.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-300 shadow-lg"
            >
              Create Your Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};