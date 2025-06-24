import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { fetchPackingUniut } from '../../../api/packingUnitApi';
import { fetchUOM } from '../../../api/uomApi';
import { useAuthStore } from '../../../store/authStore';
import { deleteVegetable, fetchVegetable, postVegetable, updateVegetable } from '../../../api/vegetableApi';
import { Edit, Trash } from 'lucide-react';


const Vegetable = () => {

    const { user } = useAuthStore(); // get user from store

    const [formData, setFormData] = useState({
        id: 0,
        vegName: '',
        packingUnit: 0,
        uom: 0
    })

    const [vegetableList, setVegetableList] = useState([])
    const [uomList, setuomList] = useState([])
    const [packingUnitList, setPackingUnitList] = useState([])

    useEffect(() => {
        getVegetableList()
        fetchUnits()
        fetchUOMs()
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [])

    const getVegetableList = async () => {
        try {

            const res = await fetchVegetable(user.id)
            console.log(res)
            setVegetableList(res || [])

        } catch (error) {

        }
    }


    const fetchUOMs = async () => {
        try {
            const res = await fetchUOM()
            setuomList(res || []);
        } catch (error) {
            console.error('Error fetching UOMs:', error);
            setuomList([]);
        }
    };
    const fetchUnits = async () => {
        try {
            const res = await fetchPackingUniut()
            // console.log(res);

            setPackingUnitList(res || []);
            // console.log(res)
            // setFormData((prev) => ({...prev , packingUnit:res[0].id}) )
        } catch (err) {
            console.error('Error fetching units:', err);
            setPackingUnitList([]);
        }
    };

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const body = {
            id: formData.id,
            vegName: formData.vegName,
            uom: formData.uom,
            packingUnit: formData.packingUnit,
            user_id: user.id
        }
        console.log(body)

        try {
            let res;
            if (formData.id) {

                res = await updateVegetable(body)
            } else {
                res = await postVegetable(body)
            }
            alert(res?.data.message, 'success');

            getVegetableList()
        } catch (error) {

        }

        clearForm()
    }

    const clearForm = () => {
        setFormData({
            id: 0,
            vegName: '',
            packingUnit: 0,
            uom: 0
        })
    }

    const handleEdit = (data: any) => {
        setFormData({
            id: data.id,
            packingUnit: data.packing_unit_id,
            uom: data.uom_id,
            vegName: data.name
        });

    };

    const handleDelete = async (id: number) => {

        window.customConfirm(
            "Delete this vegetable?",
            async (isConfirmed: boolean) => {
                if (!isConfirmed) return;
                try {
                    const res = await deleteVegetable(id)
                    alert(res?.data.message, 'success');
                    getVegetableList()
                } catch (error) {
                    alert("Failed to delete packing unit", 'error');
                }
            })
    };

    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen flex justify-center flex-col lg:flex-row gap-6">

            {/* Form Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=" w-96 h-96 bg-white p-6 rounded-2xl shadow-lg"
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
                                className="w-full  input input-name  "
                                required
                            />
                        </div>
                        <div >
                            <label className="block mb-1 font-medium">Packing Unit</label>
                            <select id="" name='packingUnit'
                                value={formData.packingUnit}
                                onChange={handleChange}
                                className="w-full input input-name " >
                                <option value={0}>select</option>
                                {packingUnitList.map((pu) => (

                                    <option key={pu.id} value={pu.id}> {pu.name} </option>
                                )

                                )}

                            </select>

                        </div>
                        <div >
                            <label className="block mb-1 font-medium">UOM</label>
                            <select id="" name='uom'
                                value={formData.uom}
                                onChange={handleChange}
                                className="w-full input input-name" >
                                <option value={0}>select</option>
                                {uomList.map((uom) => (

                                    <option key={uom.id} value={uom.id} > {uom.name} </option>
                                ))}

                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2" >

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="bg-green-600 text-white  px-6 py-2 rounded hover:bg-green-700 transition"
                        >
                            {formData.id ? 'Update' : "Submit & Save"}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            onClick={clearForm}
                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                        >
                            {formData.id ? 'Cancel' : "Clear"}
                        </motion.button>
                    </div>



                </form>
            </motion.div>

            {/* Bag List */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className=" w-96 lg:w-1/2 h-96 bg-white p-4 rounded-2xl shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-4 text-green-700">Vegetable List</h2>
                <div className="max-h-60 overflow-y-auto rounded border">

                    <table className="w-full border ">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2 text-left"> Vegetable Name </th>
                                <th className="border p-2 text-left"> Packing Unit </th>
                                <th className="border p-2 text-left"> UOM </th>
                                <th className="border p-2 text-left"> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {vegetableList.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="text-center p-4 text-gray-500">
                                        No vegetables added yet
                                    </td>
                                </tr>
                            ) : (
                                // <p>yes</p>
                                vegetableList.map((veg) => (
                                    <tr key={veg.id} className="hover:bg-gray-100 transition">
                                        <td className="border p-2">{veg.name}</td>
                                        <td className="border p-2">{veg.packing_unit}</td>
                                        <td className="border p-2">{veg.uom}</td>
                                        <td className=" py-2 border text-center">
                                            <div className="flex justify-center gap-5">
                                                <button
                                                    onClick={() => handleEdit(veg)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(veg.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}

export default Vegetable
