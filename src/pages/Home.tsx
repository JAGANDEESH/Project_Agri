import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, Shield, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import heroBgImage from '../assets/vegetable_img.jpg';

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

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative text-white overflow-hidden h-screen">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroBgImage} 
            alt="Fresh vegetables"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-800/80"></div>
        </div>
        
        {/* Animated floating circles */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full opacity-20"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute top-32 right-20 w-16 h-16 bg-green-300 rounded-full opacity-30"
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-25"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          ></motion.div>
        </div>
        
        {/* Hero content */}
        <div className="relative h-full flex items-center justify-center pt-16"> {/* Added pt-16 to account for header height */}
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              variants={item}
            >
              Fresh Vegetables
              <motion.span 
                className="block text-green-200 mt-2"
                variants={item}
              >
                Delivered Daily
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed"
              variants={item}
            >
              Experience the finest selection of farm-fresh vegetables delivered straight to your doorstep. 
              Quality, freshness, and convenience in every order.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={item}
            >
              <Link
                to={isAuthenticated ? "/products" : "/register"}
                className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-300 flex items-center group shadow-lg hover:shadow-xl"
              >
                {isAuthenticated ? "Shop Now" : "Get Started"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
              >
                Browse Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FreshVeggies?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to bringing you the freshest vegetables with unmatched convenience and quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 group bg-white border border-gray-100 hover:border-green-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300 group-hover:rotate-[15deg]">
                  <feature.icon className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-green-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-green-200 opacity-20"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-green-300 opacity-30"></div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Eating Fresh?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of customers who trust us for their daily vegetable needs.
          </p>
          {!isAuthenticated && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create Your Account
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
};