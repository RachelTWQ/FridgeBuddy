import React from "react";
import { Link } from "react-router-dom";

export default function Login({handleLogin}) {
return(
  <div className="main-box">
    <main className="form-style">
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <input name="email" type="email" placeholder="Email"/>
      <input name="password" type="password" placeholder="Password"/>
      <input type="submit" value="Login" />
    </form>

    <p>If you are new to Fridge Buddy, <Link to="/register">Register</Link> here please!</p>
    </main>
  </div>
)}