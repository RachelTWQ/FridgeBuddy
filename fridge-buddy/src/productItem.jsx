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
          <td>
            {this.props.barcode}
          </td>
          <td>
            {this.props.productName}
          </td>
          <td>
            {this.props.category}
          </td>
          <td>
            <button onClick={this.togglePopup}>Select</button>
          </td>
        </tr>
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