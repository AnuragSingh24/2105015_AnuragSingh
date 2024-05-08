
import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard';
import Filters from '../Components/Filters';
import Pagination from '../Components/Pagination';
import { fetchProducts } from '../api';

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch products based on filters and pagination
    fetchProducts(filters, currentPage).then((data) => {
      setProducts(data.products);
      setTotalPages(data.totalPages);
    });
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Filters onChange={handleFilterChange} />
      <div className="products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AllProductsPage;
