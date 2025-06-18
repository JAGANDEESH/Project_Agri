import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BagData {
  bagNumber: number;
  weight: number;
}

const MerchantPage: React.FC = () => {
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const currentDate = new Date();

  const [date, setDate] = useState(formatDate(currentDate));
  const [merchantName, setMerchantName] = useState('');
  const [vegetable, setVegetable] = useState('');
  const [tripNo, setTripNo] = useState('');
  const [price, setPrice] = useState('');
  const [noOfBags, setNoOfBags] = useState<number>();
  const [bags, setBags] = useState<BagData[]>([]);
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    const updatedBags = Array.from({ length: noOfBags }, (_, i) => ({
      bagNumber: i + 1,
      weight: 0
    }));
    setBags(updatedBags);
  }, [noOfBags]);

  useEffect(() => {
    const total = bags.reduce((sum, bag) => sum + Number(bag.weight || 0), 0);
    setWeight(total);
  }, [bags]);

  const handleWeightChange = (index: number, weight: number) => {
    const updatedBags = [...bags];
    updatedBags[index].weight = weight;
    setBags(updatedBags);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      date,
      tripNo,
      merchantName,
      vegetable,
      price,
      noOfBags,
      bags,
      weight,
    });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col lg:flex-row gap-6">
      
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-2/3 bg-green-100 p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700">Vegetable Purchase Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Date & Trip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded px-3 py-1"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Trip No</label>
              <input
                type="number"
                value={tripNo}
                onChange={(e) => setTripNo(e.target.value)}
                className="w-full border rounded px-3 py-1"
                required
              />
            </div>
          </div>

          {/* Merchant & Vegetable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Merchant Name</label>
              <input
                type="text"
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                className="w-full border rounded px-3 py-1"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Vegetable Name</label>
              <input
                type="text"
                value={vegetable}
                onChange={(e) => setVegetable(e.target.value)}
                className="w-full border rounded px-3 py-1"
                required
              />
            </div>
          </div>

          {/* Price & No. of Bags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border rounded px-3 py-1"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">No. of Bags</label>
              <input
                type="number"
                value={noOfBags}
                onChange={(e) => setNoOfBags(Number(e.target.value))}
                className="w-full border rounded px-3 py-1"
                required
                min={1}
              />
            </div>
          </div>

          {/* Bag Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bags.map((bag, index) => (
              <div key={bag.bagNumber}>
                <label className="block font-medium mb-1">
                  Weight for Bag {bag.bagNumber} (kg)
                </label>
                <input
                  type="number"
                  value={bag.weight}
                  onChange={(e) =>
                    handleWeightChange(index, Number(e.target.value))
                  }
                  className="w-full border rounded px-3 py-1"
                  required
                  min={0}
                />
              </div>
            ))}
          </div>

          {/* Total Weight */}
          <div>
            <label className="block font-medium mb-1">Total Weight (kg)</label>
            <input
              type="number"
              value={weight}
              readOnly
              className="w-full bg-gray-100 border rounded px-3 py-1 cursor-not-allowed"
            />
          </div>
<div className="flex justify-end space-x-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            onClick={() => window.history.back()}
            className="bg-green-600 text-white   px-6 py-2 rounded hover:bg-green-700 transition"
          >
            back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-green-600 text-white  px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Submit & Save
          </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Bag List */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/3 bg-yellow-100 p-4 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-green-700">Bag List</h2>
        <table className="w-full border overflow-y-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Bag No</th>
              <th className="border p-2 text-left">Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {bags.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center p-4 text-gray-500">
                  No bags added yet
                </td>
              </tr>
            ) : (
              bags.map((bag) => (
                <tr key={bag.bagNumber} className="hover:bg-gray-100 transition">
                  <td className="border p-2">{bag.bagNumber}</td>
                  <td className="border p-2">{bag.weight}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default MerchantPage;
