import React from "react";

export default function Register({handleRegister}) {
    return (
    <form onSubmit={handleRegister}>
        <p>Name: </p><input name="name" type="text" />
        <p>Email: </p><input name="email" type="text" />
        <p>Password: </p><input name="password" type="password" />
        <p>Repeat Password: </p><input name="passwordRepeat" type="password" />
        <p>Phone: </p><input name="phoneNumber" type="text" />
        <button>Register</button>
    </form>)
}
