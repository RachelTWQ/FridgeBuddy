import React from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegister }) {
  return (
    <div className="main-box">
      <main className="form-style">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input name="name" type="text" placeholder="Name"/>
        <input name="email" type="email" placeholder="Email"/>
        <input name="password" type="password" placeholder="Password"/>
        <input name="passwordRepeat" type="password" placeholder="Repeat Password"/>
        <input name="phoneNumber" type="tel" placeholder="Phone Number"/>
        <input type="submit" value="Register" />
      </form>
      <p>If you are already with Fridge Buddy, <Link to="/login">Login</Link> here please!</p>
      </main>
    </div>
  )
}
