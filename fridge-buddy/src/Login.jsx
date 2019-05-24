import React from "react";

export default function Login({handleLogin}) {
return(
  <form onSubmit={handleLogin}>
    <input name="email" type="text"/>
    <input name="password" type="password"/>
    <button>Login</button>
  </form>
)}