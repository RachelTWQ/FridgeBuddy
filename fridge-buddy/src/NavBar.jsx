import React from 'react';
import { Link } from "react-router-dom";

function Logout({handleLogout}) {
    return (
      <button onClick={handleLogout}>Logout</button>      
    );
  }

export default class NavBar extends React.Component {
    renderPublic() {
      return (
        <div>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      )
    }
  
    renderPrivate() {
      const { handleLogout } = this.props  
      return (
        <div>
          <Logout handleLogout={handleLogout}/>
        </div>
      )
    }

    render()
    {
        const { isLoggedIn } = this.props; 
        return (
            <div> 
                {this.renderPublic()}
                {isLoggedIn? this.renderPrivate() : null}
            </div>
        )
    } 
}