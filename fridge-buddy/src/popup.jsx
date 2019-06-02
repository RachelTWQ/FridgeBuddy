import React, { Component } from 'react';
import axios from 'axios';
import './style/popup.css';

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
    this.props.closePopup()
  }
  render() {
    return (
      <td className='popup'>
        <div className='popup_inner'>
          <button onClick={this.props.closePopup}>X</button>
          <h1>Edit Product</h1>
          <input placeholder="Product Name" name="productName" value={this.state.productName || ''} type="text" onChange={(e) => this.setState({ productName: e.target.value })} />
          <input placeholder="Category" name="category" value={this.state.category || ''} type="text" onChange={(e) => this.setState({ category: e.target.value })} />
          <input type="button" value="Save" onClick={this.handleNewProductSubmit} />
        </div>
      </td>
    );
  }
}
