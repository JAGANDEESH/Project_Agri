
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { deleteCategory, fetchCategory, postCategory, putCategory } from '../../../api/categoryApi';
import { Edit, Trash } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
const Category = () => {

    const { user } = useAuthStore(); // get user from store


    const [formData, setFormData] = useState({
        id: null,
        name: ''
    })

    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = async () => {

        try {
            const res = await fetchCategory()
            setCategoryList(res || [])
        } catch (error) {
            setCategoryList([])
        }

    }

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

        console.log(body)

        try {
            let res;
            if (formData.id) {

                res = await putCategory(body)

            } else {
                res = await postCategory(body)
            }
            // console.log('red', res)
            alert(res?.data.message)
            await getCategory();
            clearForm();
        } catch (err) {
            // console.error('Error saving unit:', err.response?.data || err.message);
        }
    };


    const clearForm = () => {
        setFormData({ id: null, name: '' });

    };
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }




    const update = async (data) => {
        setFormData({ id: data.id, name: data.name });
    }

    const remove = async (id: number) => {
        try {
            await deleteCategory(id)
            getCategory();
        } catch (err) {
            console.error('Error deleting unit:', err);
        }
    };

    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen items-center flex flex-col  gap-6">

            {/* Form Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-[50%] bg-white p-6 rounded-2xl shadow-lg"
            >
                <h2 className="text-2xl  font-bold mb-6 text-green-700">Category</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">

                        <div>
                            <label className="block font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-1"
                                required
                            />
                        </div>

                    </div>


                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="bg-green-600 text-white  px-6 py-2 rounded hover:bg-green-700 transition"
                    >
                        Submit & Save
                    </motion.button>
                </form>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-[50%] bg-white p-6 rounded-2xl shadow-lg"
            >
                <h2 className="text-2xl  font-bold mb-6 text-green-700">Category List</h2>
                <div className="space-y-4">
                    <table className="w-full border overflow-y-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2 text-left">ID</th>
                                <th className="border p-2 text-left">Name</th>
                                <th className="border p-2 text-left">Edit</th>
                                <th className="border p-2 text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryList.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="text-center p-4 text-gray-500">
                                        No unit of mesurment added yet
                                    </td>
                                </tr>
                            ) : (
                                categoryList.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-100 transition">
                                        <td className="border p-2">{category.id}</td>
                                        <td className="border p-2">{category.name}</td>
                                        <td className="border p-2">
                                            <button onClick={() => update(category)}>
                                                <Edit size={20} color="blue" />
                                            </button>
                                        </td>
                                        <td className="border p-2">
                                            <button onClick={() => remove(category.id)}>
                                                <Trash size={20} color="red" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>


                </div>
            </motion.div>


        </div>
    )
}

export default Category
