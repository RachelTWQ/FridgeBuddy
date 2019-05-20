import React from 'react';
import './App.css';
import ProductsList from './productsList.jsx';
import ProductForm from './productForm.jsx';

function App() {
  return (
    <main>
      <h1>New Product Entry</h1>
      <ProductForm/>
      <h1>Inventory Dashboard</h1>
      <ProductsList/>
    </main>
  );
}

export default App;
