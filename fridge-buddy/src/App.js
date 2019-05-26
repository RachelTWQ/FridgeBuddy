import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import './App.css';
import Login from './Login.jsx';
import Register from './Register.jsx';
import PrivateRoute from './PrivateRoute.jsx';
// import ProductsList from './productsList.jsx';
// import ProductForm from './productForm.jsx';
import axios from 'axios';

function Home({user}) {
  return (
    <div>
      <h2>Home</h2>
      <p>{user.name}</p>
    </div>
  );
}

function Logout({handleLogout}) {
  return (
    <button onClick={handleLogout}>Logout</button>
    
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.loggedIn() ? JSON.parse(window.localStorage.getItem('user')) : {},
      // newProduct: {},
      // products: [] 
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  // componentDidMount() {
  //   this.listAllProducts();
  // }

  // loginInfo is an obj {email: , password: }
  handleLogin = (event) => {
    event.preventDefault();
    const loginInfo = {
      Email: event.target.email.value,
      Password: event.target.password.value
    }
    console.log("loginInfo", loginInfo);

    axios.put("https://localhost:5001/login", loginInfo)
    .then(res => {
      const user = res.data;
      console.log("user", user);
      window.localStorage.setItem('user', JSON.stringify(user));
      this.setState({ user })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //{Name: "izumi",Email: "izumi@izumi.com",Password: "password",PasswordRepeat: "password",PhoneNumber :"1234"}
  handleRegister = (event) => {
    event.preventDefault();
    const registerInfo = {
      Name: event.target.name.value,
      Email: event.target.email.value,
      Password: event.target.password.value,
      PasswordRepeat: event.target.passwordRepeat.value,
      PhoneNumber: event.target.phoneNumber.value
    }
    console.log("registerInfo", registerInfo);

    axios.post("https://localhost:5001/register", registerInfo)
    .then(res => {
      const user = res.data;
      window.localStorage.setItem('user', JSON.stringify(user));
      this.setState({ user })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleLogout() {
    window.localStorage.removeItem("user");
    this.setState({user: {}});
    console.log("done")
  }

  // listAllProducts() {
  //   let userId = this.state.user.userId;
  //   axios.get(`https://localhost:5001/${userId}/products`)
  //     .then(res => {
  //       const products = res.data; // use debugger to check how the res looks like
  //       this.setState({ products });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // listAllNotification() {
  //   let userId = this.state.user.userId;
  //   axios.get(`https://localhost:5001/${userId}/notifications`)
  //     .then(res => {

  //     })
  // }

  renderPublic()
  {
    return (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    )
  }

  renderPrivate()
  {
    return (
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    )
  }

  // just make it shorter lol
  loggedIn() {
    return window.localStorage.getItem('user')
  }

  render() {
    return (
      <Router>
        <div>
          
          <ul>
            {this.renderPublic()}
            {this.loggedIn() ? this.renderPrivate() : null}
          </ul>

          <hr />

          <Switch>
            <Route exact path="/" component={() => <Home user={this.state.user}/>} />
            <Route path="/register" component={() => this.loggedIn() ? <Redirect to='/' /> : <Register handleRegister={this.handleRegister}/>} />
            <Route path="/login" component={() => this.loggedIn() ? <Redirect to='/' /> : <Login handleLogin={this.handleLogin} />} />
            <PrivateRoute path="/logout" component={() => <Logout handleLogout={this.handleLogout}/>} />
          </Switch>
        
        </div>

      </Router>
    );
  }
}
export default App;

