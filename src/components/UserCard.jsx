import React, { useState } from 'react';
import { FaTwitter, FaInstagram, FaEdit, FaTrash } from 'react-icons/fa'; 
import EditUserModal from './EditUserModal'; 
import { useDispatch } from 'react-redux';
import { deleteUser } from '../redux/actions';

const UserCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const defaultImage = 'https://via.placeholder.com/300x200/E2E8F0/A0AEC0?text=No+Image';
  const imageUrl = user.imageUrl || defaultImage;

  const renderTags = (itemsString) => {
    if (!itemsString?.trim()) return <span className="text-xs text-gray-500">N/A</span>;
    return itemsString.split(',')
        .map(item => item.trim())
        .filter(Boolean)
        .map((item, index) => (
            <span key={index} className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-1">
                {item}
            </span>
        ));
  };

  // Handler for the delete button click.
  const handleDelete = () => {
      // if (window.confirm(`Are you sure you want to delete the profile for ${user.name}? This cannot be undone.`)) {
      //     dispatch(deleteUser(user.id));
      // }
      dispatch(deleteUser(user.id));
  };

  // Handler to safely open social links.
  const openLink = (url) => {
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn("Invalid or missing URL:", url);
    }
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow bg-white flex flex-col h-full relative transition-shadow hover:shadow-lg">
       {/* Edit and Delete Buttons */}
       <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full text-xs shadow transition duration-150" title="Edit Profile"> <FaEdit /> </button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full text-xs shadow transition duration-150" title="Delete Profile"> <FaTrash /> </button>
       </div>

      {/* Profile Image */}
      <img src={imageUrl} alt={`Profile of ${user.name}`} className="w-full h-40 sm:h-48 object-cover rounded-md mb-4 bg-gray-100 border border-gray-200" onError={(e) => { e.target.onerror = null; e.target.src=defaultImage }} />

      {/* Main Content Area */}
      <div className="flex-grow mb-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate" title={user.name}>{user.name || 'Unnamed Profile'}</h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-2 truncate" title={user.email}>{user.email || 'No Email Provided'}</p>
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">{user.description || 'No description available.'}</p>

        {/* Details Section */}
        <div className="space-y-3 text-sm">
            <div> <p className="font-semibold text-xs text-gray-500 uppercase mb-1">Languages</p> <div>{renderTags(user.languages)}</div> </div>
            <div> <p className="font-semibold text-xs text-gray-500 uppercase mb-1">Education</p> <p className="text-gray-700">{user.education || 'N/A'}</p> </div>
            <div> <p className="font-semibold text-xs text-gray-500 uppercase mb-1">Specialization</p> <div>{renderTags(user.specialization)}</div> </div>
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-gray-200 flex justify-start gap-4">
        {user.twitter && ( <button onClick={() => openLink(user.twitter)} className="text-blue-500 hover:text-blue-700 transition duration-150" title="Twitter Profile"> <FaTwitter size={18} /> </button> )}
        {user.instagram && ( <button onClick={() => openLink(user.instagram)} className="text-pink-600 hover:text-pink-800 transition duration-150" title="Instagram Profile"> <FaInstagram size={18} /> </button> )}
        {!(user.twitter || user.instagram) && ( <p className="text-xs text-gray-400 italic">No social links.</p> )}
      </div>

      {isEditing && <EditUserModal user={user} onClose={() => setIsEditing(false)} />}
    </div>
  );
};

export default UserCard;