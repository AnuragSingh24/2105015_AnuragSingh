
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
      ))}
    </div>
  );
}

export default Pagination;
