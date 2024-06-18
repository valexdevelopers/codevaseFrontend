import React from "react";
import SideBar from "./partials/SideBar";
import HomeContent from "./partials/HomeContent";
import "../assets/styles/homepage.styles.css";
import "../assets/styles/custom.css";

function Home() {
  return (
    <div className="home">
      <SideBar />
      <HomeContent />
    </div>
  );
}

export default Home;
