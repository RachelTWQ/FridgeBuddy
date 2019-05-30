import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Dashboard from './Dashboard.jsx';
import ProductList from './productsList.jsx';
import axios from 'axios';

function Home({user}) {
  return (
    <div>
      <h2>Home</h2>
      <p>{user.name}</p>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.loggedIn() ? JSON.parse(window.localStorage.getItem('user')) : {},
       
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  

  // loginInfo is an obj {email: , password: }
  handleLogin = (event) => {
    event.preventDefault();
    const loginInfo = {
      Email: event.target.email.value,
      Password: event.target.password.value
    }
    console.log("loginInfo", loginInfo);

    axios.put("http://localhost:5000/login", loginInfo)
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

    axios.post("http://localhost:5000/register", registerInfo)
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


  // just make it shorter lol
  loggedIn() {
    return window.localStorage.getItem('user')
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar handleLogout={this.handleLogout} isLoggedIn = {this.loggedIn()} />
          <hr />

          <Switch>
            <Route exact path="/" component={() => <Home user={this.state.user}/>} />
            <Route path="/register" component={() => this.loggedIn() ? <Redirect to='/' /> : <Register handleRegister={this.handleRegister}/>} />
            <Route path="/login" component={() => this.loggedIn() ? <Redirect to='/' /> : <Login handleLogin={this.handleLogin} />} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/product" component={ProductList} />
          </Switch>
        
        </div>

      </Router>
    );
  }
}
export default App;
