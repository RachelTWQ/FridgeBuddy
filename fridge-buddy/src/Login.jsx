import React from "react";
import { Link } from "react-router-dom";

export default function Login({handleLogin}) {
return(
  <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <p>Email: </p><input name="email" type="text"/>
      <p>Password: </p><input name="password" type="password"/>
      <button>Login</button>
    </form>

    <span>If you are new to Fridge Buddy, <Link to="/register">Register</Link> here please!</span>
  </>
)}