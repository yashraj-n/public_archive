import React from 'react';
import ProductCard from './ProductCard';
import products from '../products';
import './ProductGallery.css';

function ProductGallery() {
  return (
    <div className="product-gallery">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGallery;
