import React, { Component } from 'react';
import mealnus from './assets/mealnus-logo.png';
import RetrieveAllUsers from './components/RetrieveAllUsers'
import UserLogin from './components/UserLogin';
import StaffLogin from './components/StaffLogin';
import NavBar from './components/NavBar';

function App() {
  let component
  switch (window.location.pathname) {
    case "/userLogin":
      component = <UserLogin />
      break
    case "/staffLogin":
      component = <StaffLogin />
      break
    case "/retrieveAllUsers":
      component = <RetrieveAllUsers />
      break
  }
  return (
    <div className="App">
      <NavBar />
      {component}
    </div>
  )
}
export default App;