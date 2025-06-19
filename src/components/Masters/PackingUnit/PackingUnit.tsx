
import { useState } from 'react'
import { motion } from 'framer-motion';
import { Edit, Trash } from 'lucide-react';
const PackingUnit = () => {
    const [formData, setFormData] = useState({
        id: null,
        name: ''
    })

    const dummyData = [
        { id: 1, name: 'Boxs' },
        { id: 2, name: 'Bags' },
        { id: 3, name: 'Palet' },
    ]

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (formData.id) {

            // post
            console.log('put')

        } else {
            // put
            console.log('post')
        }
        console.log(formData)
        clearForm()
    }

    const clearForm = () => {

        setFormData({
            id: null,
            name: ''
        })
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const update = (data: any) => {

        setFormData({
            id: data.id,
            name: data.name
        })
    }


    return (
        <div className="p-4 bg-gray-100 min-h-screen ">

            {/* Form Section */}
            <div className='justify-center  flex flex-col lg:flex-row  gap-6'>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className=" h-96 w-96 bg-white p-6 rounded-2xl shadow-lg"
                >
                    <h2 className="text-2xl  font-bold mb-6 text-green-700">Packing Unit</h2>
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
                        <div className='flex justify-end' >

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                className="bg-green-600 text-white  px-6 py-2 rounded hover:bg-green-700 transition"
                            >
                                Submit & Save
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                type="reset"
                                onClick={() => clearForm()}
                                className="bg-red-600 text-white  px-6 py-2 rounded hover:bg-red-700 transition"
                            >
                                {formData.id ? 'Cancel' : 'Clear'}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className=" h-96 w-96 bg-white p-6 rounded-2xl shadow-lg"
                >
                    <h2 className="text-2xl  font-bold mb-6 text-green-700">Packing Unit List</h2>
                    <div className="space-y-4 max-h-60 overflow-y-auto rounded border">
                        <table className="w-full border-collapse">

                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2 text-left">Bag No</th>
                                    <th className="border p-2 text-left">Weight (kg)</th>
                                    <th className="border p-2 text-left">Edit</th>
                                    <th className="border p-2 text-left">Delete</th>
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
                                            <td onClick={() => update(bag)} > <Edit size={20} color='blue' /> </td>
                                            <td> <Trash size={20} color='red' /> </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>


                    </div>
                </motion.div>
            </div>


        </div>
    )
}

export default PackingUnit
