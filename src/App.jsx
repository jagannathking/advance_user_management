import React, { useState, useEffect, useCallback } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setFilteredUsers } from './redux/actions';
import { useLocalStorage } from './hooks/useLocalStorage';
import AddUserModal from './components/AddUserForm'; 
import SearchAndFilter from './components/SearchAndFilter';
import UserCard from './components/UserCard';
import { FaPlus } from 'react-icons/fa'; 

function App() {
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.userManagement.users || []);
  const filteredUsers = useSelector(state => state.userManagement.filteredUsers || []);
  const [localUsers, setLocalUsers] = useLocalStorage('userProfiles', []);

  // --- NEW: State for controlling the Add User Modal ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (localUsers && localUsers.length > 0 && allUsers.length === 0) {
      dispatch(setUsers(localUsers));
    }
  }, [localUsers, dispatch, allUsers.length]);

  useEffect(() => {
     if (JSON.stringify(allUsers) !== JSON.stringify(localUsers)) {
         setLocalUsers(allUsers);
     }
  }, [allUsers, setLocalUsers, localUsers]);

  const handleFilterChange = useCallback((filters) => {

    const { languages = [], education = [], specialization = [], search = '' } = filters;
    const lowerCaseSearch = search.toLowerCase().trim();
    let results = [...allUsers];
    if (lowerCaseSearch) {
      results = results.filter(user =>
        (user.name?.toLowerCase().includes(lowerCaseSearch)) ||
        (user.email?.toLowerCase().includes(lowerCaseSearch)) ||
        (user.description?.toLowerCase().includes(lowerCaseSearch)) ||
        (user.specialization?.toLowerCase().includes(lowerCaseSearch))
      );
    }
    if (languages.length > 0) {
      results = results.filter(user => {
        const userLangs = user.languages?.split(',').map(l => l.trim().toLowerCase()) || [];
        return languages.every(filterLang => userLangs.includes(filterLang.toLowerCase()));
      });
    }
     if (education.length > 0) {
      results = results.filter(user => {
         const userEdu = user.education?.trim().toLowerCase();
         return education.some(filterEdu => filterEdu.toLowerCase() === userEdu);
      });
    }
    if (specialization.length > 0) {
      results = results.filter(user => {
        const userSpecs = user.specialization?.split(',').map(s => s.trim().toLowerCase()) || [];
        return specialization.every(filterSpec => userSpecs.includes(filterSpec.toLowerCase()));
      });
    }
    dispatch(setFilteredUsers(results));
  }, [allUsers, dispatch]);


  // --- Render ---
  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-100 min-h-screen">
      <header className="text-center mb-8">
         {/* Header content */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Advanced Profile Manager</h1>
        {/* <p className="text-gray-600">Manage, Filter, and Search User Profiles</p> */}
      </header>

      <main>
        {/* --- NEW: Button to Trigger the Modal --- */}
        <div className="mb-6 text-center sm:text-right">
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-md shadow hover:bg-green-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
                <FaPlus /> Add New Profile
            </button>
        </div>

        {/* REMOVE the old AddUserForm component */}
        {/* <AddUserForm /> */}

        {/* Search and Filter Component remains the same */}
        <SearchAndFilter profiles={allUsers} onFilterChange={handleFilterChange} />

        <section className="mt-8">
           {/* (User card rendering logic as before) */}
           <h2 className="text-2xl font-semibold text-gray-700 mb-4">
             Displaying Profiles ({filteredUsers.length} / {allUsers.length} total)
           </h2>
            {/*  rest of the card display logic */}
            {allUsers.length === 0 ? (
                 <p className="text-center text-gray-500 py-10 bg-white rounded shadow border border-gray-200">No profiles have been added yet. Click 'Add New Profile' above!</p>
            ) : filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {filteredUsers.map(user => (
                    <UserCard key={user.id} user={user} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-10 bg-white rounded shadow border border-gray-200">No profiles found matching your current search and filter criteria.</p>
            )}
        </section>
      </main>

 
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)} 
      />

    </div>
  );
}

export default App;