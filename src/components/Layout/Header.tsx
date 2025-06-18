import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Leaf, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const navigate = useNavigate();
  const cartItemCount = Number(getItemCount()) || 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-md sticky top-4 mx-2 sm:mx-4 rounded-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FreshVeggies</span>
          </Link>

          {/* Hamburger Menu Button (Mobile Only) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-green-600 transition-colors">
              Products
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-green-600 transition-colors">
                Admin
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/orders" className="text-gray-700 hover:text-green-600 transition-colors">
                Orders
              </Link>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                to="/merchant"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Merchant Entry
              </Link>

            )}
        {isAuthenticated && user?.role === 'admin' && (
  <div className="relative group">
    <div className="cursor-pointer text-gray-700 hover:text-green-600 transition-colors">
      Master
    </div>

    {/* Dropdown Menu */}
    <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 z-10">
      <ul className="py-2 text-sm text-gray-700">
        <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={()=> navigate("")}>Vegetable Master</li>
        <li className="px-4 py-2 hover:bg-green-100 cursor-pointer"onClick={()=> navigate("")}>Staff Master</li>
        <li className="px-4 py-2 hover:bg-green-100 cursor-pointer"onClick={()=> navigate("")}>Agent Master</li>
      <li className="px-4 py-2 hover:bg-green-100 cursor-pointer"onClick={()=> navigate("")}>farmer Master</li>
      </ul>
    </div>
  </div>
)}

          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                {/* Profile + Logout */}
                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{user?.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 transition-colors px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-2 flex flex-col space-y-2 bg-white rounded-md px-4 py-2 shadow">
            <Link to="/products" className="text-gray-700 hover:text-green-600">
              Products
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-green-600">
                Admin
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/orders" className="text-gray-700 hover:text-green-600">
                Orders
              </Link>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/merchant" className="text-gray-700 hover:text-green-600">
                Merchant Entry
              </Link>
            )}
 {isAuthenticated && user?.role === 'admin' && (
              <Link to="/merchant" className="text-gray-700 hover:text-green-600">
                Master
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="text-gray-700 hover:text-green-600">
                  Cart ({cartItemCount})
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-green-600">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-green-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
