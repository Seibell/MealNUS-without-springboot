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
import ViewProfile from "./Components/ViewProfile";
import EditProfile from "./Components/EditProfile";

//OldNavBar
import OldNavBar from "./Components/OldNavBar";

//MealBoxes
import MealBoxes from "./Components/MealBoxes";

//Forum
import Forum from "./Components/Forum";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import React from "react";

//inventory
import InventoryHome from "./Components/Inventory/InventoryHome";
import AddIngred from "./Components/Inventory/AddIngred";
import ViewAllIngred from "./Components/Inventory/ViewAllIngred";
import Orders from "./Components/Inventory/Orders";
import AddAllergents from "./Components/Inventory/AddAllergents";
import AddMealBox from "./Components/Inventory/AddMealBox";
import UpdateQuantity from "./Components/Inventory/updateQuantity";
import UpdateMealBox from "./Components/Inventory/UpdateMealBox";
import UpdateIngred from "./Components/Inventory/UpdateIngred";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/viewprofile" element={<ViewProfile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/inventoryhome" element={<InventoryHome />} />
        <Route path="/AddIngred" element={<AddIngred />} />
        <Route path="/ViewAllIngred" element={<ViewAllIngred />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/AddAllergens" element={<AddAllergents />} />
        <Route path="/AddMealBox" element={<AddMealBox />} />
        <Route path="/UpdateQuantity" element={<UpdateQuantity />} />
        <Route path="/UpdateMealBox" element={<UpdateMealBox />} />
        <Route path="/UpdateIngred" element={<UpdateIngred />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mealboxes" element={<MealBoxes />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </Router>
  );
}

export default App;
