import React from "react";

export default function Login({handleLogin}) {
return(
  <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <p>Email: </p><input name="email" type="text"/>
      <p>Password: </p><input name="password" type="password"/>
      <button>Login</button>
    </form>
  </>
)}