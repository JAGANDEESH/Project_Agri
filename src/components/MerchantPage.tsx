import React, { useState, useEffect } from 'react';

interface BagData {
  bagNumber: number;
  weight: number;
}

const MerchantPage: React.FC = () => {
  const formteDate =(date) =>{
  return date.toISOString().split("T")[0];
}
      const currentDate = new Date();
  const [date,setdate]=useState(formteDate(currentDate));
  const [merchantName, setMerchantName] = useState('');
  const [Vegetable,setVegetable]=useState('');
  const [tripNo, setTripNo] = useState('');
  const [price, setPrice] = useState('');
  const [noOfBags, setNoOfBags] = useState<number>(0);
  const [bags, setBags] = useState<BagData[]>([]);

  // When noOfBags changes, generate initial bag list
  useEffect(() => {
    const updatedBags = Array.from({ length: noOfBags }, (_, i) => ({
      bagNumber: i + 1,
      weight: 0
    }));
    setBags(updatedBags);
  }, [noOfBags]);
const [weight, setWeight] = useState(0);

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
      merchantName,
      tripNo,
      price,
      bags,
    });
    // Submit to backend here if needed
  };

  return (
    <div className="flex gap-3 p-6 bg-gray-100 min-h-screen">
      {/* Left Table */}
    

      {/* Right Form */}
      <div className="w-2/3 bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-6">Merchant Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
     <div>
  <label htmlFor="date" className="block mb-1 font-medium">
    Date:
  </label>
  <input
    id="date"
    type="date"
    value={date}
    onChange={(e) => setdate(e.target.value)}
    className="w-full border rounded p-2"
    required
  />
</div>

 <div>
            <label className="block mb-1 font-medium">Trip No</label>
            <input
              type="text"
              value={tripNo}
              onChange={(e) => setTripNo(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Merchant Name</label>
            <input
              type="text"
              value={merchantName}
              onChange={(e) => setMerchantName(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>



     <div>
            <label className="block mb-1 font-medium">Vegetable Name</label>
            <input
              type="text"
              value={Vegetable}
              onChange={(e) => setVegetable(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">No. of Bags</label>
            <input
              type="number"
              value={noOfBags}
              onChange={(e) => setNoOfBags(Number(e.target.value))}
              className="w-full border rounded p-2"
              required
              min={0}
            />
          </div>

          {/* Weight Inputs for Each Bag */}
          {bags.map((bag, index) => (
            <div key={bag.bagNumber}>
              <label className="block mb-1 font-medium">
                Weight for Bag {bag.bagNumber} (kg)
              </label>
              <input
                type="number"
                value={bag.weight}
                onChange={(e) =>
                  handleWeightChange(index, Number(e.target.value))
                }
                className="w-full border rounded p-2"
                required
                min={0}
              />
            </div>
          ))}
<div>
            <label className="block mb-1 font-medium">Total Weight : </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full border rounded p-2"
              required
              min={0}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit & Save
          </button>
        </form>
      </div>
        <div className="w-1/3 bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Bag List</h2>
        <table className="w-full border">
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
                <tr key={bag.bagNumber}>
                  <td className="border p-2">{bag.bagNumber}</td>
                  <td className="border p-2">{bag.weight}</td>
                </tr>
              ))
            )}
           
          </tbody>     
        </table>
      </div>
    </div>
  );
};

export default MerchantPage;
