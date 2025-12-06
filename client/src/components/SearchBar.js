import React, { useState, useEffect } from 'react';

// Search component with debounced input for filtering employees
// Updates search term after user stops typing for better performance
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search input to prevent too many API calls
  // Waits 300ms after user stops typing before searching
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  // Update search term when user types in the input
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Clear the search input and reset the filter
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search by name or department..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="search-clear-btn"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;