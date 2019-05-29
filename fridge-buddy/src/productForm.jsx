import React, { Component } from 'react';
import axios from 'axios';

class ProductForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ProductId: null,
      ProductName: '',
      Barcode: '',
      Category: '',
      ReservedDays: '',
      Note: '',
    };
  }

  barcodeSearch = (event) => {
    const barcode = event.target.value;
    this.getProductFromBarcode(barcode);
  }

  getProductFromBarcode(barcode) {
    let userId = JSON.parse(window.localStorage.getItem('user')).userId;
    // get product information from barcode. expecting productId, product Name and category
    axios.get(`http://localhost:5000/${userId}/product/${barcode}`)
    .then(res => {
      const newProduct = res.data;

      if(newProduct) {
        this.setState({ ...this.state, ProductId: newProduct.productId, ProductName: newProduct.productName, Category: newProduct.category, Barcode: newProduct.barcode });
      } 
      else {
        axios.get(`http://localhost:5000/product/${barcode}`)
        .then(res => {
          console.log("res", res)
          this.setState({ ...this.state, ProductName: res.data.items[0].title });
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  submitNewNotification = (newNotification) => {

    let userId = JSON.parse(window.localStorage.getItem('user')).userId;
    // save new entry to notification. the server will take care of comparing the product name and category
    axios.post(`http://localhost:5000/${userId}/notification`, newNotification)
    .then(res => {
      this.props.listAllNotifications();
    })
    .catch(err => console.log(err))
  }

  handleSubmit = () => {
    const { ProductId, ProductName,Barcode,Category,ReservedDays,Note} = this.state
    const newNotification = {
      ProductId: ProductId,
      ProductName: ProductName,
      Barcode: Barcode,
      Category: Category,
      ReservedDays: ReservedDays,
      Note: Note,
      newProduct: ProductId === null
    }
    this.submitNewNotification(newNotification);
    this.setState({
      ProductId: null,
      ProductName: '',
      Barcode: '',
      Category: '',
      ReservedDays: '',
      Note: '',
    });
  }

  render() {
    return (
      <>
          <p>Barcode: <input name="barcode" value={this.state.Barcode || ''} type="text" onBlur={this.barcodeSearch} onChange={(e) => this.setState({Barcode: e.target.value})} /></p>
          <p>Product Name: <input name="productName" value={this.state.ProductName|| ''} type="text" onChange={(e) => this.setState({ProductName: e.target.value})} /></p>
          <p>Category: <input name="category" value={this.state.Category || ''} type="text" onChange={(e) => this.setState({Category: e.target.value})} /></p>
          <p>Reserved Days: <input name="reservedDays" value={this.state.ReservedDays || ''} type="number" min="0" onChange={(e) => this.setState({ReservedDays: e.target.value})}/></p>
          <p>Note: <input name="note" value={this.state.Note || ''} type="text" onChange={(e) => this.setState({Note: e.target.value})}/></p>
          <button onClick={this.handleSubmit}>Submit</button>
      </>
    )
  }
}

export default ProductForm;