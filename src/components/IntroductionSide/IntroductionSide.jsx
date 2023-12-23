import React from "react";
import ArselaLogo from "../../assets/arsela-technologies-white@2x.png";
import "./IntroductionSide.css";

const LeftSide = () => {
  return (
    <div className="side_introduction_elem">
      <img
        className="arsela_logo"
        src={ArselaLogo}
        alt="arsela-technologies-logo"
      />
      <div className="side_introduction_box">
        <p className="tech_test">TECHNICAL TEST FOR FRONTEND DEVELOPER</p>

        <div>
          <div className="services_box">
            <p className="services services_left">All your services,</p>
            <p className="services services_right">No-code.</p>
          </div>
          <p className="paragrah_services">
            Build your business apps and automate your tasks without coding.
          </p>
          <button className="btn_edit">Edit a PDF</button>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
