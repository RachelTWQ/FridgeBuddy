import React from "react";

export default function Register({handleRegister}) {
    return (
    <form onSubmit={handleRegister}>
        <input name="name" type="text" />
        <input name="email" type="text" />
        <input name="password" type="password" />
        <input name="passwordRepeat" type="password" />
        <input name="phoneNumber" type="text" />
        <button>Register</button>
    </form>)
}
