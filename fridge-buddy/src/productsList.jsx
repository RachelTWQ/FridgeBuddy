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
      <table className="class">
        <thead>
          <tr>
            <th className="col-sm-2 text-center table-data-head">Barcode</th>
            <th className="col-sm-3 text-center table-data-head">Product Name</th>
            <th className="col-sm-3 text-center table-data-head">Category</th>
            <th className="col-sm-3 text-center table-data-head">Edit</th>
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
    )
  }
}

export default ProductsList;