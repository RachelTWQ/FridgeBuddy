import React, { Component } from 'react';
import axios from 'axios';

export default class Popup extends Component {
  // add css to see if it will change the format
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      category: '',
    };
  }
  submitNewProduct = (newProduct) => {

    let userId = JSON.parse(window.localStorage.getItem('user')).userId;
    // save new entry to notification. the server will take care of comparing the product name and category
    axios.put(`http://localhost:5000/${userId}/product/${this.props.productId}`, newProduct)
      .then(res => {
        this.props.listAllProducts();
      })
      .catch(err => console.log(err))
  }

  handleNewProductSubmit = () => {
    const { productName, category } = this.state
    const newProduct = {
      productId: this.props.productId,
      productName: productName,
      category: category,
    }
    this.submitNewProduct(newProduct);
    this.setState({
      productName: '',
      category: '',
    });
  }
  render() {
    return (
      <td className='popup'>
        <div className='popup_inner'>
          <p>Product Name: <input name="productName" value={this.state.productName || ''} type="text" onChange={(e) => this.setState({ productName: e.target.value })} /></p>
          <p>Category: <input name="category" value={this.state.category || ''} type="text" onChange={(e) => this.setState({ category: e.target.value })} /></p>
          <button onClick={this.handleNewProductSubmit}>save</button>
          <button onClick={this.props.closePopup}>Done</button>
        </div>
      </td>
    );
  }
}