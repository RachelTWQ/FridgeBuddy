import React, { Component } from 'react';
import Popup from './popup.jsx';

class ProductItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {

    return (
      <>
        <tr>
          <th scope="row">
            {this.props.barcode}
          </th>
          <td data-title="Product Name">
            {this.props.productName}
          </td>
          <td data-title="Category">
            {this.props.category}
          </td>
          <td data-title="Edit">
            <button className="button" onClick={this.togglePopup}>Select</button>
          </td>
        </tr>
        <tr></tr>
        <tr>
          {this.state.showPopup ?
            <Popup
              productId={this.props.productId}
              listAllProducts={this.props.listAllProducts}
              closePopup={this.togglePopup}
            />
            : null
          }
        </tr>
      </>
    )
  }
}

export default ProductItem;