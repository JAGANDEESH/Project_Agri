
import { useState } from 'react'
import { motion } from 'framer-motion';
const Category = () => {
    const [formData, setFormData] = useState({
        name: ''
    })

    const dummyData = [{ id: 1, name: 'Import' }, { id: 2, name: 'Export' }, { id: 3, name: 'Normal' }]

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log(formData)
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }



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
                                <th className="border p-2 text-left">Bag No</th>
                                <th className="border p-2 text-left">Weight (kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="text-center p-4 text-gray-500">
                                        No unit of mesurment added yet
                                    </td>
                                </tr>
                            ) : (
                                dummyData.map((bag) => (
                                    <tr key={bag.id} className="hover:bg-gray-100 transition">
                                        <td className="border p-2">{bag.id}</td>
                                        <td className="border p-2">{bag.name}</td>
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
