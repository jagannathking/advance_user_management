import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/actions'; 

const EditUserModal = ({ user, onClose }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(user || {});


  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id) {
        console.error("Cannot update user without ID.");
        return;
    }
    dispatch(updateUser(form));
    onClose(); 
  };

  if (!user) {
    return null;
  }

  return (
    // Modal backdrop with centering
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
      {/* Modal panel */}
      <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-semibold text-gray-800">Edit Profile: {form.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">×</button>
        </div>
        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields (similar to AddUserForm but pre-filled) */}

          <input type="text" name="name" value={form.name || ''} onChange={handleChange} placeholder="Full Name *" className="w-full border p-2 rounded" required />
          {/* Email is often non-editable */}
          <input type="email" name="email" value={form.email || ''} placeholder="Email Address *" className="w-full border p-2 rounded bg-gray-100" disabled required />
          <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" rows={3} />
          <input type="text" name="languages" value={form.languages || ''} onChange={handleChange} placeholder="Languages (comma-separated)" className="w-full border p-2 rounded" />
          <input type="text" name="education" value={form.education || ''} onChange={handleChange} placeholder="Education" className="w-full border p-2 rounded" />
          <input type="text" name="specialization" value={form.specialization || ''} onChange={handleChange} placeholder="Specialization (comma-separated)" className="w-full border p-2 rounded" />
          <input type="url" name="imageUrl" value={form.imageUrl || ''} onChange={handleChange} placeholder="Profile Image URL" className="w-full border p-2 rounded" />
          <input type="url" name="twitter" value={form.twitter || ''} onChange={handleChange} placeholder="Twitter URL" className="w-full border p-2 rounded" />
          <input type="url" name="instagram" value={form.instagram || ''} onChange={handleChange} placeholder="Instagram URL" className="w-full border p-2 rounded" />

          {/* Modal Footer with Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-150">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-150">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;