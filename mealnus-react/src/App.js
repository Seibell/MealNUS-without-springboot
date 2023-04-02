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

//Cart & CartProvider
import Cart from "./Components/Cart";
import { CartProvider } from "./Context/CartContext";

//Checkout
import Checkout from "./Components/Checkout";
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

//Admin
import AdminDashboard from "./Components/AdminDashboard";
import AdminDashboardOrderChart from "./Components/AdminDashboardOrderChart";
import AdminTitle from "./Components/AdminTitle";
import AdminOrderManagement from "./Components/AdminOrderManagement";
import AdminPromotion from "./Components/AdminPromotion";
import AddPromotion from "./Components/AddPromotion";
import AdminSideBar from "./Components/AdminSideBar";

function App() {
  return (
    <CartProvider>
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/stafflogin" element={<StaffLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/adminDashboardOrderChart" element={<AdminDashboardOrderChart />} />
          <Route path="/adminSideBar" element={<AdminSideBar />} />
          <Route path="/adminTitle" element={<AdminTitle />} />
          <Route path="/adminordermanagement" element={<AdminOrderManagement />} />
          <Route path="/adminpromotion" element={<AdminPromotion />} />
          <Route path="/addpromotion" element={<AddPromotion />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
