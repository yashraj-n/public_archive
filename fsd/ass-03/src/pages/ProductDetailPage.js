import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../products';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <img src={`${process.env.PUBLIC_URL}/images/${product.image}`} alt={product.name} className="product-detail-image" />
      <div className="product-detail-info">
        <h1 className="product-detail-name">{product.name}</h1>
        <p className="product-detail-price">₹ {product.price.toFixed(2)}</p>
        <p className="product-detail-description">{product.description}</p>
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
