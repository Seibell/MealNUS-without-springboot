import "./App.css";

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
import React from "react";


// function App() {
//   return (
//     <div className="App">
//       <Home />
//       <About />
//       <Work />
//       <Testimonial />
//       <Contact />
//       <Footer />

//       {/* <div className="inline-block-child"><UserLogin/></div>
//       <div className="inline-block-child"><StaffLogin/></div>
//       <div><RetrieveAllUsers/></div> */}
//     </div>
//   );
// }

// function App() {
//   let component
//   switch (window.location.pathname) {
//     case "/userLogin":
//       component = <UserLogin />
//       break
//     case "/staffLogin":
//       component = <StaffLogin />
//       break
//     case "/retrieveAllUsers":
//       component = <RetrieveAllUsers />
//       break
//   }
//   return (
//     <div className="App">
//       <OldNavBar />
//       {component}
//     </div>
//   )
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;