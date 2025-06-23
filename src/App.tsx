import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { Admin } from './pages/Admin';
import { useAuthStore } from './store/authStore';
import AddStaff from './components/Masters/StaffMaster/AddStaff';
import MerchantPage from './components/MerchantPage';
import Vegetable from './components/Masters/Vegetable/Vegetable';
import UOM from './components/Masters/UOM/UOM';
import PackingUnit from './components/Masters/PackingUnit/PackingUnit';
import Category from './components/Masters/Category/Category';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({
    children,
    
    adminOnly = false,
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (adminOnly && user?.role !== 'admin') {
      return <Navigate to="/products" replace />;
    }

    return <>{children}</>;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/merchant"
              element={
                <ProtectedRoute adminOnly>
                  <MerchantPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vegetable-master"
              element={
                <ProtectedRoute adminOnly>
                  <Vegetable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/uom"
              element={
                <ProtectedRoute adminOnly>
                  <UOM />
                </ProtectedRoute>
              }
            />
            <Route
              path="/packingUnit-master"
              element={
                <ProtectedRoute adminOnly>
                  <PackingUnit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/category-master"
              element={
                <ProtectedRoute adminOnly>
                  <Category />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addStaff"
              element={
                <ProtectedRoute adminOnly>
                  <AddStaff />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
