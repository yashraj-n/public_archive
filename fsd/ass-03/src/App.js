import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Yashraj's Product Gallery</h1>
      </header>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
