import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal/Modal';
import './ProductCard.css';

function ProductCard({ product }) {
  const [isShowing, setIsShowing] = useState(false);

  function toggleModal() {
    setIsShowing(!isShowing);
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={`${process.env.PUBLIC_URL}/images/${product.image}`} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹ {product.price.toFixed(2)}</p>
      </Link>
      <p className="product-description">{product.description}</p>
      <button className="add-to-cart-button" onClick={toggleModal}>Add to Cart</button>
      <Modal isShowing={isShowing} hide={toggleModal}>
        <h2>{product.name} added to cart!</h2>
      </Modal>
    </div>
  );
}

export default ProductCard;
