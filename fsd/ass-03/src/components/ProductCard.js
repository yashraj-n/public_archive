import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={process.env.PUBLIC_URL + '/images/' + product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹ {product.price.toFixed(2)}</p>
      <p className="product-description">{product.description}</p>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
