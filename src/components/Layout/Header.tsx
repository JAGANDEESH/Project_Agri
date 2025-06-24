import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Leaf, Menu, X, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const navigate = useNavigate();

  const cartItemCount = Number(getItemCount()) || 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavigation = (path: string) => {
    // Close menus when navigating
    setIsMenuOpen(false);
    setOpen(false);
    // Use window.location for full page reload if needed
    window.location.href = path;
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <motion.div 
              className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-full shadow-md group-hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Leaf className="h-6 w-6 text-white" />
            </motion.div>
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              FreshVeggies
            </motion.span>
          </a>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="/products" 
                className="hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
              >
                Products
              </a>
            </motion.div>
            
            {isAuthenticated && user?.role === 'admin' && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    href="/admin" 
                    className="hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
                  >
                    Admin
                  </a>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    href="/merchant" 
                    className="hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
                  >
                    Merchant
                  </a>
                </motion.div>
                
                <div className="relative" ref={ref}>
                  <motion.div
                    className="cursor-pointer hover:text-green-600 transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-green-50"
                    onClick={() => setOpen(!open)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Masters <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </motion.div>
                  
                  <AnimatePresence>
                    {open && (
                      <motion.div 
                        className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-xl z-20 border border-gray-100 overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <ul className="py-2">
                          {[
                            { path: "/vegetable-master", label: "Vegetable Master" },
                            { path: "/uom", label: "UOM" },
                            { path: "/packingUnit-master", label: "Packing Unit" },
                            { path: "/category-master", label: "Category" },
                            { path: "/AddStaff", label: "Staff Master" },
                            { path: "/agent-master", label: "Agent Master" },
                            { path: "/farmer-master", label: "Farmer Master" }
                          ].map((item) => (
                            <motion.li 
                              key={item.path}
                              whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                              whileTap={{ scale: 0.98 }}
                              className="px-4 py-2 cursor-pointer text-gray-700 hover:text-green-600"
                              onClick={() => handleNavigation(item.path)}
                            >
                              {item.label}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
            
            {isAuthenticated && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a 
                  href="/orders" 
                  className="hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
                >
                  Orders
                </a>
              </motion.div>
            )}
          </nav>

          {/* Desktop Auth/Cart Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <a 
                    href="/cart" 
                    className="p-2 rounded-full hover:bg-green-50 transition-colors flex items-center"
                  >
                    <ShoppingCart className="h-6 w-6 text-gray-700" />
                    {cartItemCount > 0 && (
                      <motion.span 
                        className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        {cartItemCount}
                      </motion.span>
                    )}
                  </a>
                </motion.div>
                
                <div className="flex items-center space-x-2">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2"
                  >
                    <a 
                      href="/profile" 
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-green-50"
                    >
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-700">{user?.name}</span>
                    </a>
                  </motion.div>
                  
                  <motion.button
                    onClick={handleLogout}
                    className="p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Logout"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LogOut className="h-5 w-5 text-red-500" />
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    href="/login" 
                    className="hover:text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 font-medium"
                  >
                    Login
                  </a>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="/register" 
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2.5 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-medium"
                  >
                    Sign Up
                  </a>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden mt-2 pb-4 flex flex-col space-y-2 bg-white rounded-lg px-4 shadow-lg overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div 
                whileHover={{ backgroundColor: "#f0fdf4" }}
                className="px-3 py-3 rounded-lg"
              >
                <a
                  href="/products" 
                  className="block hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </a>
              </motion.div>
              
              {isAuthenticated && user?.role === 'admin' && (
                <>
                  <motion.div 
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="px-3 py-3 rounded-lg"
                  >
                    <a
                      href="/admin" 
                      className="block hover:text-green-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </a>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="px-3 py-3 rounded-lg"
                  >
                    <a
                      href="/merchant" 
                      className="block hover:text-green-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Merchant Entry
                    </a>
                  </motion.div>
                  
                  <div className="flex flex-col">
                    <motion.div 
                      whileHover={{ backgroundColor: "#f0fdf4" }}
                      className="px-3 py-3 rounded-lg cursor-pointer flex items-center justify-between"
                      onClick={() => setOpen(!open)}
                    >
                      <span className="font-medium">Masters</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </motion.div>
                    
                    <AnimatePresence>
                      {open && (
                        <motion.div 
                          className="ml-4 space-y-1 overflow-hidden"
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {[
                            { path: "/vegetable-master", label: "Vegetable Master" },
                            { path: "/uom", label: "UOM" },
                            { path: "/packingUnit-master", label: "Packing Unit" },
                            { path: "/category-master", label: "Category" },
                            { path: "/staff-master", label: "Staff Master" },
                            { path: "/agent-master", label: "Agent Master" },
                            { path: "/farmer-master", label: "Farmer Master" }
                          ].map((item) => (
                            <motion.div
                              key={item.path}
                              whileHover={{ backgroundColor: "#f0fdf4" }}
                              className="px-3 py-2 rounded-lg"
                              onClick={() => handleNavigation(item.path)}
                            >
                              <span className="block hover:text-green-600">{item.label}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
              
              {isAuthenticated && (
                <motion.div 
                  whileHover={{ backgroundColor: "#f0fdf4" }}
                  className="px-3 py-3 rounded-lg"
                >
                  <a
                    href="/orders" 
                    className="block hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </a>
                </motion.div>
              )}
              
              {isAuthenticated ? (
                <>
                  <motion.div 
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="px-3 py-3 rounded-lg"
                  >
                    <a
                      href="/cart" 
                      className="block hover:text-green-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span>Cart</span>
                        {cartItemCount > 0 && (
                          <span className="bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                          </span>
                        )}
                      </div>
                    </a>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="px-3 py-3 rounded-lg"
                  >
                    <a
                      href="/profile" 
                      className="block hover:text-green-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </a>
                  </motion.div>
                  
                  <motion.button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left px-3 py-3 rounded-lg flex items-center space-x-2 text-red-600 hover:bg-red-50"
                    whileHover={{ backgroundColor: "#fef2f2" }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </motion.button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <motion.div 
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="px-3 py-3 rounded-lg"
                  >
                    <a
                      href="/login"
                      className="block hover:text-green-600 text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </a>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href="/register" 
                      className="block bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md text-center font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </a>
                  </motion.div>
                </div>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};