import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../../store/authStore';
import { deleteUOM, fetchUOM, postUOM, putUOM } from '../../../api/uomApi';
import { Edit, Trash } from 'lucide-react';

interface UOMType {
  id: number;
  name: string;
}

const UOM = () => {
  const [formData, setFormData] = useState({ id: null, name: '' });
  const [uoms, setUoms] = useState<UOMType[]>([]);
  const [editing, setEditing] = useState(false);

  const { user } = useAuthStore();
  const fetchUOMs = async () => {
    try {
      const res = await fetchUOM()
      setUoms(res || []);
    } catch (error) {
      console.error('Error fetching UOMs:', error);
      setUoms([]);
    }
  };

  useEffect(() => {
    fetchUOMs();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      id: formData.id,
      name: formData.name,
      userId: user.id
    }
    // console.log(body)

    try {
      let res
      if (editing && formData.id !== null) {
        res = await putUOM(body)
      } else {
        res = await postUOM(body)
      }
      alert(res?.data.message, 'success');
      fetchUOMs();
      clearForm();
    } catch (error) {
      console.error('Error submitting UOM:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setFormData({ id: null, name: '' });
    setEditing(false);
  };

  const handleEdit = (uom: UOMType) => {
    setFormData({ id: uom.id, name: uom.name });
    setEditing(true);
  };

  const handleDelete = async (id: number) => {

    window.customConfirm(
      "Delete this UOM?",
      async (isConfirmed: boolean) => {
        if (!isConfirmed) return;
        try {
          const res = await deleteUOM(id)
          alert(res?.data.message, 'success');
          fetchUOMs()
        } catch (error) {
          alert("Failed to delete packing unit", 'error');
        }
      })
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen justify-center flex flex-col  lg:flex-row gap-6">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" w-96 h-96 bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700">Unit Of Measurement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
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
          </div>
          <div className="flex justify-end gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              {editing ? 'Update' : 'Submit & Save'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={clearForm}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              {editing ? 'Cancel' : 'Clear'}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-96  h-96 bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700">Unit Of Measurement List</h2>
        <div className="space-y-4 max-h-60 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">ID</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {uoms.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-4 text-gray-500">
                    No units added yet.
                  </td>
                </tr>
              ) : (
                uoms.map((uom) => (
                  <tr key={uom.id} className="hover:bg-gray-100 transition">
                    <td className="border p-2">{uom.id}</td>
                    <td className="border p-2">{uom.name}</td>
                    <td className=" p-2 border text-center">
                      <div className="flex justify-center gap-5">
                        <button
                          onClick={() => handleEdit(uom)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(uom.id)}
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
  );
};

export default UOM;
