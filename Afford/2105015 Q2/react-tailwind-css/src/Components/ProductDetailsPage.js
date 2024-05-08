
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../api';

function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    
    fetchProducts('AMZ', 'Laptop', 1, 10000, 10).then((data) => {
      // Assuming productId is included in the fetched data
      const selectedProduct = data.find((item) => item.id === productId);
      setProduct(selectedProduct);
    });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}</p>
      <p>Availability: {product.availability ? 'Available' : 'Out of stock'}</p>
    </div>
  );
}

export default ProductDetailsPage;
