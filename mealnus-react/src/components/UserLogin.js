import React, { useState } from 'react';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`http://localhost:8080/MealNUS-war/rest/User/userLogin?email=${email}&password=${password}`)
      .then(response => response.json())
      .then(data => {
        setLoggedIn(true);
        setUser(data);
      })
      .catch(error => {
        setError('Invalid email or password');
      });
  };

  if (loggedIn) {
    return (
      <div>
        <h1>Welcome, {user.firstName} {user.lastName}!</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default UserLogin;