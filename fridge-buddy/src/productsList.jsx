import React, { Component } from 'react';
import axios from 'axios';
import ProductItem from './productItem.jsx';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {products: []};
  }

  componentDidMount() {
    this.listAllProducts();
  }

  listAllProducts() {
    axios.get("https://localhost:5001/products")
    .then(res => {
      const products = res.data; // use debugger to check how the res looks like
      this.setState({ products });
    });
  }

  render() {
    return (
      <table className="class">
        <thead>
          <tr>
            <th className="col-sm-2 text-center table-data-head">Barcode</th>
            <th className="col-sm-3 text-center table-data-head">Product Name</th>
            <th className="col-sm-3 text-center table-data-head">Entry Date</th>
            <th className="col-sm-2 text-center table-data-head">Expiry Date</th>
            <th className="col-sm-2 text-center table-data-head">IsEaten</th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map(product => (
            <ProductItem 
              key={product.productId} 
              barcode={product.barcode}
              entry={product.entryDate}
              exp={product.expiryDate} 
              isEaten={product.isEaten}
              productName={product.productName}
              />
          ))}
        </tbody>
        </table>
    )
  }
}

export default ProductsList;