import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions"; // Action to add user

// Renamed component
const AddUserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Initial state for the form fields remains the same
  const initialFormState = {
    name: "",
    email: "",
    description: "",
    languages: "",
    education: "",
    specialization: "",
    twitter: "",
    instagram: "",
    imageUrl: "",
  };

  const [form, setForm] = useState(initialFormState);

  // Effect to reset form when modal opens or closes (optional but good UX)
  useEffect(() => {
    if (!isOpen) {
        // Reset form when modal is closed/hidden
        setForm(initialFormState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Rerun when isOpen changes


  // Handle input changes remains the same
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name.trim() || !form.email.trim()) {
      alert("Please enter Name and Email.");
      return;
    }
    // Dispatch the action (ID is generated in action creator)
    dispatch(addUser(form));
    // Reset the form fields
    setForm(initialFormState);
    // Close the modal after successful submission
    onClose();
  };

  // --- Modal Rendering Logic ---
  // If the modal isn't open, render nothing
  if (!isOpen) {
    return null;
  }

  return (
    // Modal Backdrop (fixed position, covers screen)
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 transition-opacity duration-300"
        aria-modal="true" // Accessibility: indicates this is a modal
        role="dialog"
        onClick={onClose} // Close modal if backdrop is clicked
    >
      {/* Modal Panel (white background, padding, rounded corners, max width) */}
      <div
        className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()} // IMPORTANT: Prevents closing modal when clicking inside the panel
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h2 className="text-xl font-semibold text-gray-800">Add New Profile</h2>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none"
                aria-label="Close modal"
            >
                × {/* Close icon */}
            </button>
        </div>

        {/* Modal Body (The Form) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields - same as before */}
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" required />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" rows={3} />
          <input type="text" name="languages" value={form.languages} onChange={handleChange} placeholder="Languages (comma-separated)" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" />
          <input type="text" name="education" value={form.education} onChange={handleChange} placeholder="Education" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" />
          <input type="text" name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization (comma-separated)" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" />
          <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Profile Image URL" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" />
          <input type="url" name="twitter" value={form.twitter} onChange={handleChange} placeholder="Twitter URL (optional)" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" />
          <input type="url" name="instagram" value={form.instagram} onChange={handleChange} placeholder="Instagram URL (optional)" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" />

          {/* Modal Footer (optional, or just include submit button) */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <button
                type="button" // Important: type="button" to prevent form submission
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-150"
            >
              Cancel
            </button>
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-150"
            >
              Add Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal; // Export the renamed component