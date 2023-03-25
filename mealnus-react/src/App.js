//Home Page Components
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

//Login/Functional Components
import UserLogin from "./Components/UserLogin";
import StaffLogin from "./Components/StaffLogin";
import RetrieveAllUsers from "./Components/RetrieveAllUsers";

//OldNavBar
import OldNavBar from "./Components/OldNavBar";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import SignUp from './Components/SignUp';
import ForgotPassword from "./Components/ForgotPassword";
import React from "react";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;