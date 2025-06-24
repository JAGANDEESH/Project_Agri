import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash } from 'lucide-react';
import { deletePackingUnit, fetchPackingUniut, postPackingUnit, updatePackingUnit } from '../../../api/packingUnitApi';
import { useAuthStore } from '../../../store/authStore';

const PackingUnit = () => {
  const [formData, setFormData] = useState({ id: null, name: '' });
  const [units, setUnits] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);

  const { user } = useAuthStore(); // get user from store


  useEffect(() => {
    fetchUnits();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchUnits = async () => {
    try {
      const res = await fetchPackingUniut()
      // console.log(res);

      setUnits(res || []);
    } catch (err) {
      console.error('Error fetching units:', err);
      setUnits([]);
    }
  };



  // Submit handler for create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required.");
      return;
    }

    const body = {
      id: formData.id,
      name: formData.name,
      userId: user.id
    }

    // console.log(body)

    try {
      let res;
      if (formData.id) {

        res = await updatePackingUnit(body)

      } else {
        res = await postPackingUnit(body)
      }
      // console.log('red', res)
      alert(res?.data.message, 'success');
      await fetchUnits();
      clearForm();
    } catch (err) {
      // console.error('Error saving unit:', err.response?.data || err.message);
    }
  };


  const clearForm = () => {
    setFormData({ id: null, name: '' });
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const update = (data: any) => {
    setFormData({ id: data.id, name: data.name });
    setEditing(true);
    // console.log(formData)
  };

  const remove = async (id: number) => {
    try {

      window.customConfirm(
        "Delete this packing unit?",
        async (isConfirmed: boolean) => {
          if (!isConfirmed) return;
          try {
            const res = await deletePackingUnit(id)
            alert(res?.data.message, 'success');

          } catch (error) {
            alert("Failed to delete packing unit", 'error');
          }
        })


      fetchUnits();
    } catch (err) {
      console.error('Error deleting unit:', err);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-center gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-96 w-96 bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-green-700">Packing Unit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full input input-name"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                {editing ? 'Update' : 'Submit & Save'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={clearForm}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                {editing ? 'Cancel' : 'Clear'}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-96 w-96 bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-green-700">Packing Unit List</h2>
          <div className="max-h-60 overflow-y-auto rounded border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {units.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4 text-gray-500">
                      No packing units added yet.
                    </td>
                  </tr>
                ) : (
                  units.map((unit) => (
                    <tr key={unit.id} className="hover:bg-gray-100 transition">
                      <td className="border p-2">{unit.id}</td>
                      <td className="border p-2">{unit.name}</td>

                      <td className=" p-2 border text-center">
                        <div className="flex justify-center gap-5">
                          <button
                            onClick={() => update(unit)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => remove(unit.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PackingUnit;
