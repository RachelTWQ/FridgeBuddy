import React from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegister }) {
  return (
    <div className="main_box">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <p>Name: </p><input name="name" type="text" />
        <p>Email: </p><input name="email" type="text" />
        <p>Password: </p><input name="password" type="password" />
        <p>Repeat Password: </p><input name="passwordRepeat" type="password" />
        <p>Phone: </p><input name="phoneNumber" type="text" />
        <button>Register</button>
      </form>
      <span>If you are already with Fridge Buddy, <Link to="/login">Login</Link> here please!</span>
    </div>
  )
}
