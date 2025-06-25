import { useEffect, useState } from 'react'

import { fetchPackingUniut } from '../../../api/packingUnitApi';
import { fetchUOM } from '../../../api/uomApi';
import { useAuthStore } from '../../../store/authStore';
import { deleteVegetable, fetchVegetable, postVegetable, updateVegetable } from '../../../api/vegetableApi';
import { Leaf, List, Package, Pencil, Plus, Save, Trash2, Users, Weight, X } from 'lucide-react';


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



        <div className="min-h-screen relative overflow-hidden">
            {/* Green Vegetable-themed Background */}
            {/* Green Vegetable-themed Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
                {/* Floating Vegetable Elements */}
                <div className="absolute top-[80px] left-10 text-4xl opacity-20 animate-bounce">🥬</div>
                <div className="absolute top-20 right-20 text-3xl opacity-20 animate-pulse">🥕</div>
                <div className="absolute bottom-20 left-10 text-3xl opacity-20 animate-bounce">🥒</div>
                <div className="absolute bottom-24 right-20 text-4xl opacity-20 animate-pulse">🍅</div>
                <div className="absolute top-1/2 left-10 text-2xl opacity-15 animate-bounce">🥦</div>
                <div className="absolute top-1/2 right-20 text-2xl opacity-15 animate-pulse">🌶️</div>

                {/* Floating Green Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
                <div className="absolute -bottom-8 left-20 w-80 h-80 bg-lime-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float-delayed"></div>

                {/* Leaf Decorations */}
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

            {/* Content */}
            <div className="relative z-10 p-6 h-[570 px] flex flex-col">
                <div className="flex-1 max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-5 gap-6 h-full">
                        {/* Form Section */}
                        <div className="lg:col-span-2 flex flex-col">
                            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-green-200/50 flex-1 relative overflow-hidden">
                                {/* Form Header Decoration */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400"></div>

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                                        <Plus className="text-white" size={22} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">
                                            {formData.id ? 'Edit Vegetable' : 'Add New Vegetable'}
                                        </h2>
                                        <p className="text-sm text-green-600">Manage your vegetable efficiently</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
                                    <div className="flex-1 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="vegName" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <Leaf size={16} className="text-green-600" />
                                                    Vegetable Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name='vegName'
                                                    value={formData.vegName}
                                                    onChange={handleChange}
                                                    required
                                                    className="input input-name"
                                                    placeholder="Enter full name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="packingUnit" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <Package size={16} className="text-green-600" />
                                                    Packing Unit
                                                </label>
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
                                            <div className="space-y-2">
                                                <label htmlFor="uom" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <Weight size={16} className="text-green-600" />
                                                    UOM
                                                </label>
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


                                        <div className="flex flex-row gap-3 pt-4 flex-wrap sm:flex-nowrap">
                                            <button
                                                style={{ zIndex: 1000 }}
                                                type="submit"
                                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-black font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                                            >
                                                <Save size={16} />
                                                {formData.id ? 'Update Vegetable' : 'Add Vegetable'}
                                            </button>

                                            {formData.id && (
                                                <button
                                                    type="button"
                                                    onClick={clearForm}
                                                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                                                >
                                                    <X size={16} />
                                                    Cancel
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="lg:col-span-3 flex flex-col">
                            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200/50 overflow-hidden flex-1 flex flex-col relative">
                                {/* Table Header Decoration */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400"></div>

                                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 mt-2">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/20 rounded-2xl">
                                            <List className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Vegetable Details</h2>
                                            <p className="text-green-100 text-sm flex items-center gap-2">
                                                <Leaf size={14} />
                                                Total Vegetables : {vegetableList.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 overflow-hidden">
                                    {vegetableList.length === 0 ? (
                                        <div className="text-center py-12 h-full flex flex-col justify-center">
                                            <div className="mb-4">
                                                <Leaf className="mx-auto text-green-400 mb-3" size={48} />
                                                <div className="text-4xl mb-2">🌱</div>
                                            </div>
                                            <p className="text-gray-600 text-xl font-semibold">No vegetables yet</p>
                                            {/* <p className="text-gray-500 text-sm">Start building your vegetable business team</p> */}
                                        </div>
                                    ) : (
                                        <div className=" max-h-60 overflow-auto">
                                            <table className="w-full">
                                                <thead className="sticky top-0 bg-white/95 backdrop-blur-sm">
                                                    <tr className="border-b-2 border-green-200">
                                                        <th className="text-left py-4 px-3 text-gray-700 font-bold text-sm">#</th>
                                                        <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm">Vegetable Name</th>
                                                        <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm">Packing Unit</th>
                                                        <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm">UOM</th>
                                                        <th className="text-center py-4 px-4 text-gray-700 font-bold text-sm">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {vegetableList.map((veg, index) => (
                                                        <tr
                                                            key={veg.id}
                                                            className="border-b border-green-100 hover:bg-green-50/50 transition-colors duration-200"
                                                        >
                                                            <td className="py-4 px-3 text-gray-600 font-semibold text-sm">{index + 1}</td>
                                                            <td className="py-4 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    {/* <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                                                                        <User className="text-white" size={16} />
                                                                    </div> */}
                                                                    <div>
                                                                        <span className="font-semibold text-gray-800 text-sm">{veg.name}</span>
                                                                        {/* <div className="text-xs text-green-600">Team Member</div> */}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-gray-600 text-sm">{veg.packing_unit}</td>
                                                            <td className="py-4 px-4">
                                                                <div className="flex items-center gap-2">
                                                                    {/* <Phone size={14} className="text-green-600" /> */}
                                                                    <span className="text-gray-700 text-sm">{veg.uom}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                <div className="flex justify-center gap-2">
                                                                    <button
                                                                        onClick={() => handleEdit(veg)}
                                                                        className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors duration-200 shadow-sm"
                                                                        title="Edit Staff"
                                                                    >
                                                                        <Pencil size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(veg.id)}
                                                                        className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors duration-200 shadow-sm"
                                                                        title="Delete Staff"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-180deg);
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(90deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
        </div>



    )
}

export default Vegetable
