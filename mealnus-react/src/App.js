//Home Page Components
import Home from "./Components/Customer/Home";

//Login/Functional Components
import StaffLogin from "./Components/Login/StaffLogin";
import UserLogin from "./Components/Login/UserLogin";
import EditProfile from "./Components/Profile/EditProfile";
import MyOrders from "./Components/Profile/MyOrders";
import PaymentMethodsPage from "./Components/Profile/PaymentMethodsPage";
import ViewProfile from "./Components/Profile/ViewProfile";

//OldNavBar

//MealBoxes
import MealBoxes from "./Components/Customer/MealBoxes";

//Cart & CartProvider
import Cart from "./Components/Customer/Cart";
import { CartProvider } from "./Context/CartContext";

//Checkout
import Checkout from "./Components/Customer/Checkout";
//Forum
import Forum from "./Components/Customer/Forum";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./Components/Login/ForgotPassword";
import SignUp from "./Components/Login/SignUp";

//Admin
import AdminAllergens from "./Components/Admin/Allergen";
import AdminAddAllergen from "./Components/Admin/Allergen/AddAllergen";
import AdminUpdateAllergen from "./Components/Admin/Allergen/UpdateAllergen";
import AdminDashboard from "./Components/Admin/Dashboard/AdminDashboard";
import AdminIngredients from "./Components/Admin/Ingredient";
import AdminAddIngredient from "./Components/Admin/Ingredient/AddIngredient";
import AdminUpdateIngredient from "./Components/Admin/Ingredient/UpdateIngredient";
import AdminMealBoxes from "./Components/Admin/MealBox";
import AdminAddMealBox from "./Components/Admin/MealBox/AddMealBox";
import AdminUpdateMealBox from "./Components/Admin/MealBox/UpdateMealBox";
import AdminMembers from "./Components/Admin/Member";
import AdminOrders from "./Components/Admin/Order";
import AdminUpdateOrder from "./Components/Admin/Order/UpdateOrder";
import AdminPromotions from "./Components/Admin/Promotion";
import AddPromotion from "./Components/Admin/Promotion/AddPromotion";
import UpdatePromotion from "./Components/Admin/Promotion/UpdatePromotion";

function App() {

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/viewprofile" element={<ViewProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
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
          <Route path="/updateorder/:orderId" element={<AdminUpdateOrder />} />
          <Route path="/adminallergens" element={<AdminAllergens />} />
          <Route path="/updateallergen/:allergenId" element={<AdminUpdateAllergen />} />
          <Route path="/addallergen" element={<AdminAddAllergen />} />
          <Route path="/adminingredients" element={<AdminIngredients />} />
          <Route path="/updateingredient/:ingredientId" element={<AdminUpdateIngredient />} />
          <Route path="/addingredient" element={<AdminAddIngredient />} />
          <Route path="/adminmealboxes" element={<AdminMealBoxes />} />
          <Route path="/updatemealbox/:mealBoxId" element={<AdminUpdateMealBox />} />
          <Route path="/addmealbox" element={<AdminAddMealBox />} />
          <Route path="/updatepromotion/:id" element={<UpdatePromotion />} />

          <Route path="/paymentmethodspage" element={<PaymentMethodsPage />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
