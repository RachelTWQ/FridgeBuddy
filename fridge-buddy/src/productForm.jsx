import React, { Component } from 'react';
import axios from 'axios';

class ProductForm extends Component {


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
      <form>
        <input type="text"/>
        <input type="text"/>
        <input type="text"/>
        <input type="submit" value="Submit" onClick={this.handleSubmit}></input>
      </form>
    )
  }
}

export default ProductForm;