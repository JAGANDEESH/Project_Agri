import  { useState } from 'react'
import { motion } from 'framer-motion';


const Vegetable = () => {

    const [formData, setFormData] = useState({
        vegName: '',
        packingUnit: 0,
        vom: 0
    })

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        console.log(formData)
        setFormData({
            vegName: '',
            packingUnit: 0,
            vom: 0
        })
    }

    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col lg:flex-row gap-6">

            {/* Form Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-2/3 bg-white p-6 rounded-2xl shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-green-700">Vegetable Master</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">

                        <div>
                            <label className="block font-medium mb-1">Vegetable Name</label>
                            <input
                                type="text"
                                name='vegName'
                                value={formData.vegName}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-1"
                                required
                            />
                        </div>
                        <div >
                            <label className="block mb-1 font-medium">Packing Unit</label>
                            <select id="" name='packingUnit'
                                value={formData.packingUnit}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-1" >
                                {/* <option value="select"></option> */}
                                <option value="kg">KG</option>
                                <option value="tons">TONS</option>
                            </select>

                        </div>
                        <div >
                            <label className="block mb-1 font-medium">VOM</label>
                            <select id="" name='vom'
                                value={formData.vom}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-1" >
                                {/* <option value="select"></option> */}
                                <option value="kg">KG</option>
                                <option value="tons">TONS</option>
                            </select>
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

            {/* Bag List */}
            {/* <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/3 bg-white p-4 rounded-2xl shadow-lg"
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
            </motion.div> */}
        </div>
    )
}

export default Vegetable
