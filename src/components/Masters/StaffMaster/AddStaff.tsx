import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus } from 'lucide-react'; // use `lucide-react` icons

const AddStaff = () => {
  const [formData, setFormData] = useState({
    staffName: '',
    fatherName: '',
    aadharNo: '',
    panNo: '',
    address: '',
    phoneNo: ''
  });

  const [staffList, setStaffList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchStaff = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/staff/get-all-staff');
      setStaffList(res.data);
    } catch (err) {
      console.error('Error fetching staff:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      staffName: '',
      fatherName: '',
      aadharNo: '',
      panNo: '',
      address: '',
      phoneNo: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.staffName,
      fatherName: formData.fatherName,
      aadhar: formData.aadharNo || null,
      pan: formData.panNo || null,
      address: formData.address,
      phone: formData.phoneNo
    };

    try {
      if (isEditing && editingId !== null) {
        await axios.put(`http://localhost:5000/api/staff/update-staff/${editingId}`, payload);
        alert('Staff updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/staff/create', payload);
        alert('Staff added successfully');
      }

      resetForm();
      fetchStaff();
    } catch (err) {
      console.error('Error saving staff:', err);
      alert('Failed to save staff');
    }
  };

   const handleEdit = (staff: any) => {
    setFormData({
      staffName: staff.name,
      fatherName: staff.father_name,
      aadharNo: staff.aadhar || '',
      panNo: staff.pan || '',
      address: staff.address,
      phoneNo: staff.phone
    });
    setIsEditing(true);
    setEditingId(staff.id);
  };

    const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this staff?')) {
      try {
        await axios.delete(`http://localhost:5000/api/staff/delete-staff/${id}`);
        fetchStaff();
      } catch (err) {
        console.error('Error deleting staff:', err);
        alert('Failed to delete staff');
      }
    }
  };
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div className="container mx-auto w-[1500px] h-[570px] p-4 bg-white shadow-md rounded-lg mt-10">
      <div className="flex gap-4 h-full">
        <div className="w-1/2 bg-green-100 p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center text-green-900">{isEditing ? 'Edit Staff' : 'Add Staff'}</h1>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="staffName" className="block text-sm font-medium text-gray-900">Staff Name</label>
              <input type="text" id="staffName" value={formData.staffName} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2" />
            </div>
            <div className="mb-2">
              <label htmlFor="fatherName" className="block text-sm font-medium text-gray-900">Father/Guardian Name</label>
              <input type="text" id="fatherName" value={formData.fatherName} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2" />
            </div>
            <div className="mb-2">
              <label htmlFor="aadharNo" className="block text-sm font-medium text-gray-900">Aadhar No</label>
              <input type="number" id="aadharNo" value={formData.aadharNo} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2" />
            </div>
            <div className="mb-2">
              <label htmlFor="panNo" className="block text-sm font-medium text-gray-900">Pan No</label>
              <input type="text" id="panNo" value={formData.panNo} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2" />
            </div>
            <div className="mb-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-900">Address</label>
              <textarea id="address" value={formData.address} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2" />
            </div>
            <div className="mb-2">
              <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-900">Phone Number</label>
              <input type="number" id="phoneNo" value={formData.phoneNo} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2" />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5">
                          {isEditing ? 'Save Changes' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-green-100 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-green-900">Staff List</h1>
            <button onClick={resetForm} className="flex items-center gap-1 text-sm bg-white text-green-700 px-3 py-1 border border-green-500 rounded hover:bg-green-200">
              <Plus size={16} /> New Staff
            </button>
          </div>
          <table className="min-w-full bg-white text-sm text-left border rounded">
            <thead className="bg-green-200">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Father Name</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-4">No data found</td></tr>
              ) : (
                staffList.map((staff, index) => (
                  <tr key={index} className="hover:bg-green-50">
                    <td className="px-4 py-2 border">{staff.name}</td>
                    <td className="px-4 py-2 border">{staff.father_name}</td>
                    <td className="px-4 py-2 border">{staff.phone}</td>
                    <td className="px-4 py-2 border text-center flex justify-center gap-3">
                      <button onClick={() => handleEdit(staff)} className="text-blue-600 hover:text-blue-800">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(staff.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
