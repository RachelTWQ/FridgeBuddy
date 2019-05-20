import React from 'react';
import './App.css';
import ProductsList from './productsList.jsx';
import ProductForm from './productForm.jsx';

class App extends Component() {
  constructor(props) {
    super(props);

    this.state = { 
      newProduct: {},
      products: [] 
    };
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
      <main>
        <h1>New Product Entry</h1>
        <ProductForm />
        <h1>Inventory Dashboard</h1>
        <ProductsList products={this.state.products}/>
      </main>
    );
  }
}
export default App;
