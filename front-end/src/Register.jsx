import React, { useState } from "react";

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className="auth-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input value={name} name="name" id="name" placeholder="Full Name" />
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@email.com" id="email" name="email" />
        <label htmlFor="password">password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*****" id="password" name="password" />
        <button type="submit">Log In</button>
      </form>
      <button className="link-button" onClick={() => props.onFormSwitch('login')}>Already signed up? Login Here</button>
    </div>
  )
}