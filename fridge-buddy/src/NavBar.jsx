import React from 'react';
import { Link } from "react-router-dom";
import logo from './LogoMakr_3WFbaL.png';

function Logout({ handleLogout }) {
  return (
    <button className='logoutButton' onClick={handleLogout}>Logout</button>
  );
}

const linkStyle = { 
  textDecoration: 'none', 
  color: 'white',  
  background: '#ED5752',
  borderRadius: '5px',
  border: 'none',
  boxShadow: '1px 1px 0px 2px rgba (0,0,0,0.3)',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.3rem',
};

export default class NavBar extends React.Component {
  
  renderPublic() {
    return (
      <>
        <div className='nav_icon'><Link style={ linkStyle } to="/">Home</Link></div>
        <div className='nav_icon'><Link style={ linkStyle } to="/register">Register</Link></div>
        <div className='nav_icon'><Link style={ linkStyle } to="/login">Login</Link></div>
      </>
    )
  }

  renderPrivate() {
    const { handleLogout } = this.props
    return (
      <>
        <div className='nav_icon'><Link style={ linkStyle } to="/dashboard">Dashboard</Link></div>
        <div className='nav_icon'><Link style={ linkStyle } to="/product">Product</Link></div>
        <div className='nav_icon_logout'><Logout handleLogout={handleLogout} /></div>
      </>
    )
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className='navbar'>
        <img src={ logo } alt="logo"/>
        <div className='navbar-in'>
        {this.renderPublic()}
        {isLoggedIn ? this.renderPrivate() : null}
        </div>
      </div>
    )
  }
}