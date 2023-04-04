// Dashboard.js
import React from "react";
import About from "./About.js";
import NavBar from "../Navigation/NavBar.js";
import Work from "./Work.js";
import Testimonial from "./Testimonial.js";
import Contact from "./Contact.js";
import Footer from "./Footer.js";
import Home from "../Customer/Home.js";

import "../../App.css";

function Dashboard() {
  return (
    <div>
      <NavBar />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default Dashboard;
