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
import AddAllergen from "./Components/Inventory/AddAllergents";
import AddMealBox from "./Components/Inventory/AddMealBox";
import UpdateQuantity from "./Components/Inventory/updateQuantity";
import UpdateMealBox from "./Components/Inventory/UpdateMealBox";
import UpdateIngred from "./Components/Inventory/UpdateIngred";
import UpdateOrder from "./Components/Inventory/UpdateOrder";
import ViewAllAllergen from "./Components/Inventory/ViewAllAllergen";
import UpdateAllergen from "./Components/Inventory/UpdateAllergen";

//Admin
import AdminDashboard from "./Components/Admin/Dashboard/AdminDashboard";
import AdminMembers from "./Components/Admin/Member";
import AdminPromotions from "./Components/Admin/Promotion";
import AdminOrders from "./Components/Admin/Order";
import AdminOrderManagement from "./Components/Admin/AdminOrderManagement";
import AdminPromotion from "./Components/Admin/AdminPromotion";
import AddPromotion from "./Components/Admin/Promotion/AddPromotion";
import AdminAllergens from "./Components/Admin/Allergen";
import AdminUpdateAllergen from "./Components/Admin/Allergen/UpdateAllergen";
import AdminAddAllergen from "./Components/Admin/Allergen/AddAllergen";
import AdminIngredients from "./Components/Admin/Ingredient";
import AdminUpdateIngredient from "./Components/Admin/Ingredient/UpdateIngredient";
import AdminAddIngredient from "./Components/Admin/Ingredient/AddIngredient";
import AdminCharts from "./Components/Admin/Charts";

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
          {/* <Route path="/AddAllergen" element={<AddAllergen />} /> */}
          <Route path="/AddMealBox" element={<AddMealBox />} />
          <Route path="/UpdateQuantity/:mealBoxId" element={<UpdateQuantity />} />
          <Route path="/UpdateMealBox/:mealBoxId" element={<UpdateMealBox />} />
          <Route path="/UpdateOrder/:orderId" element={<UpdateOrder />} />
          <Route path="/UpdateIngred/:ingredientId" element={<UpdateIngred />} />
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
          <Route path="/adminallergens" element={<AdminAllergens />} />
          <Route path="/updateallergen/:allergenId" element={<AdminUpdateAllergen />} />
          <Route path="/addallergen" element={<AdminAddAllergen />} />
          <Route path="/adminingredients" element={<AdminIngredients />} />
          <Route path="/updateingredient/:ingredientId" element={<AdminUpdateIngredient />} />
          <Route path="/addingredient" element={<AdminAddIngredient />} />
          <Route path="/admincharts" element={<AdminCharts />} />
          <Route path="/ViewAllAllergen" element={<ViewAllAllergen />} />
          <Route path="/UpdateAllergen/:allergenId" element={<UpdateAllergen />} />

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
