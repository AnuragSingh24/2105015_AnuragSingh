
import React, { useState } from 'react';

function Filter({ onFilterChange }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilterChange = () => {
    // Validate input
    if (minPrice !== '' && maxPrice !== '') {
      onFilterChange(minPrice, maxPrice);
    }
  };

  return (
    <div>
      <input 
        type="number" 
        value={minPrice} 
        onChange={(e) => setMinPrice(e.target.value)} 
        placeholder="Min Price" 
      />
      <input 
        type="number" 
        value={maxPrice} 
        onChange={(e) => setMaxPrice(e.target.value)} 
        placeholder="Max Price" 
      />
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
}

export default Filter;
