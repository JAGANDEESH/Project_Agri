import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { User, Phone, MapPin, CreditCard, FileText, Leaf } from 'lucide-react';

interface BagData {
  bagNumber: number;
  weight: number;
}

const MerchantPage: React.FC = () => {
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const currentDate = new Date();

  const { user } = useAuthStore(); // get user from store

  const [date, setDate] = useState(formatDate(currentDate));
  const [merchantName, setMerchantName] = useState('');
  const [vegetable, setVegetable] = useState('');
  const [tripNo, setTripNo] = useState('');
  const [price, setPrice] = useState('');
  const [noOfBags, setNoOfBags] = useState<number>(0);
  const [bags, setBags] = useState<BagData[]>([]);
  const [weight, setWeight] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      userId: user?.id,
      date,
      tripNo,
      merchantName,
      vegetable,
      price,
      noOfBags,
      bags,
      weight,
    };

    try {
      const res = await fetch('http://localhost:5000/api/merchant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.message || 'Failed to save');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const updatedBags = Array.from({ length: noOfBags }, (_, i) => ({
      bagNumber: i + 1,
      weight: 0
    }));
    setBags(updatedBags);
  }, [noOfBags]);

  useEffect(() => {
    const total = bags.reduce((sum, bag) => sum + Number(bag.weight), 0);
    setWeight(total);
  }, [bags]);

  const handleWeightChange = (index: number, weight: number) => {
    const updatedBags = [...bags];
    updatedBags[index].weight = weight;
    setBags(updatedBags);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Green Background and Floating Icons */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
        <div className="absolute top-[80px] left-10 text-4xl opacity-20 animate-bounce">🥬</div>
        <div className="absolute top-20 right-20 text-3xl opacity-20 animate-pulse">🥕</div>
        <div className="absolute bottom-20 left-10 text-3xl opacity-20 animate-bounce">🥒</div>
        <div className="absolute bottom-24 right-20 text-4xl opacity-20 animate-pulse">🍅</div>
        <div className="absolute top-1/2 left-10 text-2xl opacity-15 animate-bounce">🥦</div>
        <div className="absolute top-1/2 right-20 text-2xl opacity-15 animate-pulse">🌶️</div>

        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-lime-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float-delayed"></div>

        <div className="absolute top-16 left-1/3 opacity-10">
          <Leaf size={32} className="text-green-600 animate-pulse" />
        </div>
        <div className="absolute bottom-32 right-1/4 opacity-10">
          <Leaf size={28} className="text-emerald-600 animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-16 opacity-10">
          <Leaf size={24} className="text-lime-600 animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 min-h-screen flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Form Section */}
            <div className="lg:col-span-3 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-green-200/50 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400"></div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                    <User size={22} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Vegetable Purchase Entry</h2>
                    <p className="text-sm text-green-600">Logged in as: {user?.name} ({user?.role})</p>
                  </div>
                </div>
<div className="max-h-[400px] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FileText size={16} className="text-green-600" />
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="input input-name w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <CreditCard size={16} className="text-green-600" />
                        Trip No
                      </label>
                      <input
                        type="number"
                        value={tripNo}
                        onChange={(e) => setTripNo(e.target.value)}
                        required
                        className="input input-name w-full"
                        placeholder="Enter trip number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <User size={16} className="text-green-600" />
                        Merchant Name
                      </label>
                      <input
                        type="text"
                        value={merchantName}
                        onChange={(e) => setMerchantName(e.target.value)}
                        required
                        className="input input-name w-full"
                        placeholder="Enter merchant name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Leaf size={16} className="text-green-600" />
                        Vegetable Name
                      </label>
                      <input
                        type="text"
                        value={vegetable}
                        onChange={(e) => setVegetable(e.target.value)}
                        required
                        className="input input-name w-full"
                        placeholder="Enter vegetable name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <CreditCard size={16} className="text-green-600" />
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="input input-name w-full"
                        placeholder="Enter price"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FileText size={16} className="text-green-600" />
                        No. of Bags
                      </label>
                      <input
                        type="number"
                        value={noOfBags}
                        onChange={(e) => setNoOfBags(Number(e.target.value))}
                        required
                        min={1}
                        className="input input-name w-full"
                        placeholder="Enter number of bags"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin size={16} className="text-green-600" />
                      Bag Weights (kg)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {bags.map((bag, index) => (
                        <div key={bag.bagNumber}>
                          <label className="block text-sm text-gray-600 mb-1">Bag {bag.bagNumber}</label>
                          <input
                            type="number"
                            value={bag.weight}
                            onChange={(e) => handleWeightChange(index, Number(e.target.value))}
                            className="input input-name w-full"
                            required
                            min={0}
                            placeholder="Weight"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Phone size={16} className="text-green-600" />
                      Total Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      readOnly
                      className="input input-name w-full"
                    />
                  </div>

                 
                </form>
                </div>
                 <div className="flex flex-wrap gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg text-sm"
                    >
                      Submit & Save
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => window.history.back()}
                      className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-lg text-sm"
                    >
                      Back
                    </motion.button>
                  </div>
              </motion.div>
            </div>

            {/* Bag List Section */}
            <div className="lg:col-span-2 w-full ">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200/50 overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400"></div>

                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 mt-2">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl">
                      <Leaf className="text-white" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Bag Details</h2>
                      <p className="text-green-100 text-sm">Total Bags: {bags.length}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 overflow-x-auto overflow-y-auto">
                  {bags.length === 0 ? (
                    <div className="text-center py-12 flex flex-col justify-center">
                      <Leaf className="mx-auto text-green-400 mb-3" size={48} />
                      <div className="text-4xl mb-2">🌱</div>
                      <p className="text-gray-600 text-xl font-semibold">No bags added yet</p>
                      <p className="text-gray-500 text-sm">Add bags to see details</p>
                    </div>
                  ) : (
                    <div className="max-h-[300px] overflow-y-auto">
                    <table className="w-full min-w-[500px]">
                      <thead className="sticky top-0 bg-white/95 backdrop-blur-sm">
                        <tr className="border-b-2 border-green-200">
                          <th className="text-left py-4 px-3 text-gray-700 font-bold text-sm">#</th>
                          <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm">Bag Number</th>
                          <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm">Weight (kg)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bags.map((bag, index) => (
                          <tr key={bag.bagNumber} className="border-b border-green-100 hover:bg-green-50/50 transition-colors duration-200">
                            <td className="py-4 px-3 text-gray-600 font-semibold text-sm">{index + 1}</td>
                            <td className="py-4 px-4 text-gray-600 text-sm">{bag.bagNumber}</td>
                            <td className="py-4 px-4 text-gray-600 text-sm">{bag.weight}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-green-200 bg-white/80">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Total Weight:</span>
                    <span className="font-bold text-emerald-600">{weight} KG</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default MerchantPage;
