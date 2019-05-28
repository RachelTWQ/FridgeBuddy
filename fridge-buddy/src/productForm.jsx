import React, { Component } from 'react';

class ProductForm extends Component {

  barcodeSearch = (event) => {
    if (event.key === "Enter") {
      const barcode = event.target.value;
      this.props.getProductFromBarcode(barcode);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newNotification = {
      ProductId: this.props.productId,
      ProductName: event.target.productName.value,
      Barcode: event.target.barcode.value,
      Category: event.target.category.value,
      ReservedDays: event.target.reservedDays.value,
      Note: event.target.note.value,
      newProduct: this.props.productId !== undefined
    }
    this.props.submitNewNotification(newNotification);
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
          <button onClick={this.handleSubmit}>Submit</button>

        </form>
      </>
    )
  }
}

export default ProductForm;