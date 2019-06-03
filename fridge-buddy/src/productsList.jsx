import React, { Component } from 'react';
import axios from 'axios';
import ProductItem from './productItem.jsx';

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.listAllProducts = this.listAllProducts.bind(this);
  }

  componentWillMount() {
    this.listAllProducts();
  }

  listAllProducts() {
    let userId = JSON.parse(window.localStorage.getItem('user')).userId;
    axios.get(`http://localhost:5000/${userId}/products`)
      .then(res => {
        const products = res.data; // use debugger to check how the res looks like
        this.setState({ products });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="main-box">
        <main className="container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th scope="col">Barcode</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map(product => (
            <ProductItem 
              key={product.productId} 
              barcode={product.barcode}
              category={product.category}
              productId={product.productId}
              productName={product.productName}
              listAllProducts={this.listAllProducts}
              />
          ))}
        </tbody>
        </table>
        </main>
      </div>
    )
  }
}

export default ProductsList;