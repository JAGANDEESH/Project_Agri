import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Leaf, Menu, X, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const navigate = useNavigate();

  const cartItemCount = Number(getItemCount()) || 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-lg sticky top-4 left-0 right-0 mx-2 sm:mx-4 rounded-2xl z-50 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-full shadow-md hover:scale-110 transition-transform">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FreshVeggies</span>
          </Link>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
            <Link to="/products" className="hover:text-green-600 transition-colors">Products</Link>
            {isAuthenticated && user?.role === 'admin' && (
              <>
                <Link to="/admin" className="hover:text-green-600 transition-colors">Admin</Link>
                <Link to="/merchant" className="hover:text-green-600 transition-colors">Merchant Entry</Link>
                <div className="relative" ref={ref}>
                  <div
                    className="cursor-pointer hover:text-green-600 transition-colors flex items-center gap-1"
                    onClick={() => setOpen(!open)}
                  >
                    Master <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </div>
                  {open && (
                    <div className="absolute left-0 mt-2 w-44 bg-white shadow-xl rounded-xl z-20">
                      <ul className="py-2 text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => navigate("/vegetable-master")}>Vegetable Master</li>
                        <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => navigate("/uom")}>UOM</li>
                        <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => navigate("/packingUnit-master")}>Packing Unit</li>
                        <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => navigate("/category-master")}>Category</li>
                        <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => navigate("/staff-master")}>Staff Master</li>
                        <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => navigate("/agent-master")}>Agent Master</li>
                        <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => navigate("/farmer-master")}>Farmer Master</li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
            {isAuthenticated && (
              <Link to="/orders" className="hover:text-green-600 transition-colors">Orders</Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative p-2 hover:text-green-600 transition-colors">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="flex items-center space-x-2 hover:text-green-600">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{user?.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="hover:text-green-600 px-3 py-2">Login</Link>
                <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Sign Up</Link>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-2 flex flex-col space-y-2 bg-white rounded-lg px-4 py-2 shadow-lg animate-fade-in">
            <Link to="/products" className="hover:text-green-600">Products</Link>
            {isAuthenticated && user?.role === 'admin' && (
              <>
                <Link to="/admin" className="hover:text-green-600">Admin</Link>
                <Link to="/merchant" className="hover:text-green-600">Merchant Entry</Link>
                <div className="flex flex-col gap-1">
                  <div className="text-gray-700 font-semibold flex items-center gap-1">
                    Master <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <div className="cursor-pointer hover:text-green-600" onClick={() => navigate("/vegetable-master")}>Vegetable Master</div>
                    <div className="cursor-pointer hover:text-green-600" onClick={() => navigate("/uom")}>UOM</div>
                    <div className="cursor-pointer hover:text-green-600" onClick={() => navigate("/packingUnit-master")}>Packing Unit</div>
                    <div className="cursor-pointer hover:text-green-600" onClick={() => navigate("/category-master")}>Category</div>
                    <div className="cursor-pointer hover:text-green-600" onClick={() => navigate("/staff-master")}>Staff Master</div>
                    <div className="cursor-pointer hover:text-green-600" onClick={() => navigate("/agent-master")}>Agent Master</div>
                    <div className="cursor-pointer hover:text-green-600" onClick={() => navigate("/farmer-master")}>Farmer Master</div>
                  </div>
                </div>
              </>
            )}
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="hover:text-green-600">Cart ({cartItemCount})</Link>
                <Link to="/profile" className="hover:text-green-600">Profile</Link>
                <button onClick={handleLogout} className="text-left text-red-600 hover:text-red-800">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-600">Login</Link>
                <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Sign Up</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
