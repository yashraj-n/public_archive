import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../products';
import './HomePage.css';

function HomePage() {
  return (
    <div className="product-gallery">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default HomePage;
