//Home Page Components
import Home from "./Components/Customer/Home";
import About from "./Components/HomePage/About";
import Work from "./Components/HomePage/Work";
import Testimonial from "./Components/HomePage/Testimonial";
import Contact from "./Components/HomePage/Contact";
import Footer from "./Components/HomePage/Footer";

//Login/Functional Components
import UserLogin from "./Components/Login/UserLogin";
import StaffLogin from "./Components/Login/StaffLogin";
import RetrieveAllUsers from "./Components/Login/RetrieveAllUsers";
import ViewProfile from "./Components/Profile/ViewProfile";
import EditProfile from "./Components/Profile/EditProfile";
import MyOrders from "./Components/Profile/MyOrders";
import PaymentMethodsPage from "./Components/Profile/PaymentMethodsPage";

//OldNavBar
import OldNavBar from "./Components/HomePage/OldNavBar";

//MealBoxes
import MealBoxes from "./Components/Customer/MealBoxes";

//Cart & CartProvider
import Cart from "./Components/Customer/Cart";
import { CartProvider } from "./Context/CartContext";

//Checkout
import Checkout from "./Components/Customer/Checkout";
//Forum
import Forum from "./Components/Customer/Forum";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/HomePage/Dashboard";
import SignUp from "./Components/Login/SignUp";
import ForgotPassword from "./Components/Login/ForgotPassword";
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
import UpdateOrder from "./Components/Inventory/UpdateOrder";

//Admin
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminMembers from "./Components/Admin/Member";
import AdminPromotions from "./Components/Admin/Promotion";
import AdminOrders from "./Components/Admin/Order";
import AdminOrderManagement from "./Components/Admin/AdminOrderManagement";
import AdminPromotion from "./Components/Admin/AdminPromotion";
import AddPromotion from "./Components/Admin/Promotion/AddPromotion";

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
          <Route path="/UpdateQuantity/:mealBoxId" element={<UpdateQuantity />} />
          <Route path="/UpdateMealBox/:mealBoxId" element={<UpdateMealBox />} />
          <Route path="/UpdateOrder/:orderId" element={<UpdateOrder />} />
          <Route path="/UpdateIngred" element={<UpdateIngred />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mealboxes" element={<MealBoxes />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/stafflogin" element={<StaffLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/adminmembers" element={<AdminMembers />} />
          <Route path="/adminpromotions" element={<AdminPromotions />} />
          <Route path="/addpromotion" element={<AddPromotion />} />
          <Route path="/adminorders" element={<AdminOrders />} />

          {/* Soon to be removed */}
          <Route path="/adminordermanagement" element={<AdminOrderManagement />} />
          <Route path="/adminpromotion" element={<AdminPromotion />} />

          <Route path="/paymentmethodspage" element={<PaymentMethodsPage />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
