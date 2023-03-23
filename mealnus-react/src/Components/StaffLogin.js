import React, { useState } from 'react';

function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [staff, setStaff] = useState(null);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`http://localhost:8080/MealNUS-war/rest/Staff/staffLogin?email=${email}&password=${password}`)
      .then(response => response.json())
      .then(data => {
        setLoggedIn(true);
        setStaff(data);
      })
      .catch(error => {
        setError('Invalid email or password');
      });
  };

  if (loggedIn) {
    return (
      <div>
        <h1>Welcome, Staff: {staff.firstName} {staff.lastName}!</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Staff Login</h1>
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

export default StaffLogin;