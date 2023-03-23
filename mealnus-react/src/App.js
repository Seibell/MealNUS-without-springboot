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


function App() {
  return (
    <div className="App">
      {/* <Home />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer /> */}

      <div className="inline-block-child"><UserLogin/></div>
      <div className="inline-block-child"><StaffLogin/></div>
      <div><RetrieveAllUsers/></div>
    </div>
  );
}

export default App;