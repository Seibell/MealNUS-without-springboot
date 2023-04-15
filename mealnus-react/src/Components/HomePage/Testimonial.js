import React from "react";
import ProfilePic from "../../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";
import Benefits from "../../Assets/our-benefits.jpg";

const Testimonial = () => {
    return (
        <div className="home-benefits-section" style={{display:"flex", alignItems:"center"}}>
            <img src={Benefits} alt="" />
        </div>
    );
};

export default Testimonial;