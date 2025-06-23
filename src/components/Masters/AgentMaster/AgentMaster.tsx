import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const AgentMaster = () => {
   const [formData, setFormData] = useState({
    agentName: '',
    organizationName: '',
    aadharNo: '',
    panNo: '',
    address: '',
    phoneNo: ''
  });

  const [agentList, setAgentList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchAgent = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/agent/get-all-agent');
      setAgentList(res.data);
    } catch (err) {
      console.error('Error fetching agent:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      agentName: '',
      organizationName: '',
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
      name: formData.agentName,
      organizationName: formData.organizationName,
      aadhar: formData.aadharNo || null,
      pan: formData.panNo || null,
      address: formData.address,
      phone: formData.phoneNo
    };

    try {
      if (isEditing && editingId !== null) {
        await axios.put(`http://localhost:5000/api/agent/update-agent/${editingId}`, payload);
        alert('Agent updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/agent/create', payload);
        alert('Agent added successfully');
      }

      resetForm();
      fetchAgent();
    } catch (err) {
      console.error('Error saving agent:', err);
      alert('Failed to save agent');
    }
  };

   const handleEdit = (agent: any) => {
    setFormData({
      agentName: agent.name,
      organizationName: agent.organization_name,
      aadharNo: agent.aadhar || '',
      panNo: agent.pan || '',
      address: agent.address,
      phoneNo: agent.phone
    });
    setIsEditing(true);
    setEditingId(agent.id);
  };

    const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await axios.delete(`http://localhost:5000/api/agent/delete-agent/${id}`);
        fetchAgent();
      } catch (err) {
        console.error('Error deleting agent:', err);
        alert('Failed to delete agent');
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
    fetchAgent();
  }, []);

  return (
    <div className="container mx-auto w-4/5 h-[570px] p-4 bg-white shadow-md rounded-2xl mt-5">
      <div className="flex gap-4 h-full">
        <div className="w-2/5 bg-green-100 p-4 rounded-2xl shadow">
          <h1 className="text-2xl font-bold pl-7 text-green-900">{isEditing ? 'Edit Agent' : 'Add Agent'}</h1>
          <form className="max-w-sm mx-auto mt-2" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="agentName" className="block text-sm font-medium text-gray-900">Agent Name</label>
              <input type="text" id="agentName" value={formData.agentName} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2" />
            </div>
            <div className="mb-2">
              <label htmlFor="organizationName" className="block text-sm font-medium text-gray-900">Organization Name</label>
              <input type="text" id="organizationName" value={formData.organizationName} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2" />
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
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-2/5 px-5 py-2.5">
                          {isEditing ? 'Save Changes' : 'Submit'}
            </button>
            {isEditing && <button onClick={resetForm}
            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm w-2/5 px-5 py-2.5 ml-4">
            Cancel
            </button>}
          </form>
        </div>
        <div className="w-3/5 bg-green-100 p-4 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-green-900">Agent List</h1>
          </div>
<div className="overflow-auto rounded-lg border border-gray-200 shadow">
  <table className="min-w-full text-sm text-left bg-white">
    <thead className="bg-green-200 text-gray-700 font-semibold">
      <tr>
        <th className="px-2 py-2 border">Sl.No</th>
        <th className="px-4 py-2 border">Name</th>
        <th className="px-4 py-2 border">Organization Name</th>
        <th className="px-4 py-2 border">Phone</th>
        <th className="px-4 py-2 border text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {agentList.length === 0 ? (
        <tr>
          <td colSpan={5} className="text-center py-4 text-gray-500">No data found</td>
        </tr>
      ) : (
        agentList.map((agent, index) => (
          <tr key={index} className="hover:bg-green-50 transition">
            <td className="px-2 py-2 border">{index + 1}</td>
            <td className="px-4 py-2 border">{agent.name}</td>
            <td className="px-4 py-2 border">{agent.organization_name}</td>
            <td className="px-4 py-2 border">{agent.phone}</td>
            <td className="px-4 py-2 border text-center">
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleEdit(agent)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(agent.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
        </div>
      </div>
    </div>
  );
}

export default AgentMaster