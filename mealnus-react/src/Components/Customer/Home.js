import React from "react";
import { Navigate } from "react-router-dom";
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage from "../../Assets/home-banner-image.png";
import NavBar from "../Navigation/NavBar.js";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.js";
import { useContext } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleOrderNowClick = () => {
    navigate("/mealboxes");
  };

  if (!currentUser) {
    return <div>Error: User not found.</div>;
  }

  return (
    <div className="home-container">
      <NavBar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section" style={{ paddingLeft: "25px" }}>
          <h1 className="primary-heading">
            Your Favourite Food Delivered Hot & Fresh
          </h1>
          <p className="primary-text">
            Healthy switcher chefs do all the prep work, like peeding, chopping
            & marinating, so you can cook a fresh food.
          </p>
          <button className="secondary-button" onClick={handleOrderNowClick}>
            Order Now <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;