import React from 'react';
import { Link } from "react-router-dom";

function Logout({ handleLogout }) {
  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default class NavBar extends React.Component {
  renderPublic() {
    return (
      <>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </>
    )
  }

  renderPrivate() {
    const { handleLogout } = this.props
    return (
      <>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/product">Product</Link>
        <Logout handleLogout={handleLogout} />
      </>
    )
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {this.renderPublic()}
        {isLoggedIn ? this.renderPrivate() : null}
      </div>
    )
  }
}