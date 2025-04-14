import React, { useState, useEffect, useMemo } from "react";
import { FaFilter, FaTimes } from 'react-icons/fa'; 


const SearchAndFilter = ({ profiles = [], onFilterChange }) => {


  const [isFilterVisible, setIsFilterVisible] = useState(false); 

  const [filters, setFilters] = useState({
    languages: [],
    education: [],
    specialization: [],
    search: '',
  });


  const filterOptions = useMemo(() => {
    console.log("Recalculating filter options..."); 
    const languages = new Set();
    const educations = new Set();
    const specializations = new Set();

    profiles.forEach(profile => {

      profile.languages?.split(',')
        .map(l => l.trim())
        .filter(Boolean)
        .forEach(lang => languages.add(lang));

      if (profile.education?.trim()) {
        educations.add(profile.education.trim());
      }

      profile.specialization?.split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .forEach(spec => specializations.add(spec));
    });

    return {
      languages: Array.from(languages).sort(),
      educations: Array.from(educations).sort(),
      specializations: Array.from(specializations).sort(),
    };
  }, [profiles]); 

  useEffect(() => {

    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]); 


  const handleCheckboxChange = (category, value) => {
    setFilters(prevFilters => {
      const currentSelection = prevFilters[category];

      const newSelection = currentSelection.includes(value)
        ? currentSelection.filter((v) => v !== value)
        : [...currentSelection, value];

        return { ...prevFilters, [category]: newSelection };
    });
  };

  const handleSearchChange = (e) => {
    setFilters(prevFilters => ({ ...prevFilters, search: e.target.value }));
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(prevVisible => !prevVisible);
  };


  const renderCheckboxes = (options, category, title) => {

    if (!options || options.length === 0) return null;

    return (
      <div className="mb-4 last:mb-0"> 
        <p className="font-semibold text-gray-700 capitalize mb-2">{title || category}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {options.map((option) => (
            <label key={`${category}-${option}`} className="flex items-center space-x-2 cursor-pointer text-sm group">
              <input
                type="checkbox"
                value={option}
                checked={filters[category].includes(option)}
                onChange={() => handleCheckboxChange(category, option)}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0" // Removed ring offset for cleaner look
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };


  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6 border border-gray-200">
      {/* Header Section: Title and Toggle Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Search & Filter Profiles</h2>
        {/* Filter Toggle Button */}
        <button
            onClick={toggleFilterVisibility}
            className={`ml-2.5 flex items-center justify-center sm:justify-start gap-2 text-sm font-medium px-4 py-2 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isFilterVisible
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500' 
            }`}
            aria-expanded={isFilterVisible}
            aria-controls="filter-options-section" 
        >
            {isFilterVisible ? (
                <> <FaTimes className="h-4 w-4" /> Hide Filters </>
            ) : (
                <> <FaFilter className="h-4 w-4" /> Show Filters </>
            )}
        </button>
      </div>

      {/* Search Input - Always Visible */}
      <div className="mb-4">
        <label htmlFor="profile-search" className="sr-only">Search profiles</label> 
        <input
            id="profile-search"
            type="search"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search by Name, Email, Description..."
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            aria-label="Search profiles"
        />
      </div>

      {/* Conditionally Rendered Filter Section */}
      {isFilterVisible && (
        <div
            id="filter-options-section" 
            className="mt-4 pt-4 border-t border-gray-200 animate-fade-in" 
        >
          <h3 className="text-md font-semibold text-gray-700 mb-3">Filter By Category:</h3>
          {/* Render checkbox groups */}
          {renderCheckboxes(filterOptions.languages, "languages", "Languages Known")}
          {renderCheckboxes(filterOptions.educations, "education", "Education Level")}
          {renderCheckboxes(filterOptions.specializations, "specialization", "Specialization")}
        </div>
      )}

   
    </div>
  );
};

export default SearchAndFilter;