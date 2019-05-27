import React, { Component } from 'react';
import axios from 'axios';

class ProductForm extends Component {

  barcodeSearch = (event) => {
    if (event.key === "Enter") {
      const barcode = event.target.value;
      this.props.getProductFromBarcode(barcode);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.put("https://localhost:5001/products", {
      // incoming product object here
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <form>
          <p>Barcode: <input name="barcode" type="text" onKeyDown={this.barcodeSearch} /></p>
          <p>Product Name: <input name="productName" type="text" defaultValue={this.props.productName} /></p>
          <p>Category: <input name="category" type="text" defaultValue={this.props.category} /></p>
          <p>Reserved Days: <input name="reservedDays" type="number" min="0" /></p>
          <p>Note: <input name="note" type="text" /></p>
          <input type="submit" value="Submit" onClick={this.handleSubmit}></input>
        </form>
      </>
    )
  }
}

export default ProductForm;