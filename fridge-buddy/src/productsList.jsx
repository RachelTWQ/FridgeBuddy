import React, { Component } from 'react';
import axios from 'axios';
import ProductItem from './productItem.jsx';

class ProductsList extends Component {
  
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
          {this.props.products.map(product => (
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