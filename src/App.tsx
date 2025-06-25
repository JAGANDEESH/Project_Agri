import React, { useState } from 'react';
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
import AgentMaster from './components/Masters/AgentMaster/agentMaster';
import CustomConfirmModal from './messageBoxs/CustomConfirmModel';
import AlertModal from './messageBoxs/AlertModal';
import FarmerMaster from './components/Masters/FarmerMaster/FarmerMaster';

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


  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [action, setAction] = useState(null);

  window.alert = (message: React.SetStateAction<string>, type: React.SetStateAction<string>) => {
    setAlertMessage(message);
    setAlertType(type); // "error", "success", "info"
    setAlertOpen(true);
  };



  window.customConfirm = (message, callback) => {
    setConfirmMessage(message);
    setAction(() => callback);
    setShowConfirm(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <CustomConfirmModal
          message={confirmMessage}
          onConfirm={(confirmed) => {
            setShowConfirm(false);
            action && action(confirmed);
          }}
          onCancel={() => {
            setShowConfirm(false);
            action && action(false);
          }}
          showModel={showConfirm}
        />

        <AlertModal
          message={alertMessage}
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          msgType={alertType}
        />
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
            <Route
              path="/agent-master"
              element={
                <ProtectedRoute adminOnly>
                  <AgentMaster />
                </ProtectedRoute>
              }
            />
             <Route
              path="/farmer-master"
              element={
                <ProtectedRoute adminOnly>
                  <FarmerMaster />
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
