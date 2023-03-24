// Dashboard.js
import React from 'react';
import HeaderNavbar from './HeaderNavBar.js';
import About from './About.js';
import NavBar from './NavBar.js';
import Work from './Work.js';
import Testimonial from './Testimonial.js';
import Contact from './Contact.js';
import Footer from './Footer.js';

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