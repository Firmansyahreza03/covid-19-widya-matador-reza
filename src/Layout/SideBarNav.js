import React, { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { SideContext } from "../Context/SideCtx";
// Be sure to include styles at some point, probably during your bootstraping
import "./SideBarNav.css";

const SideNavigator = () => {
  const { toogleSideBar, setToogleSideBar } = useContext(SideContext);

  const toogeHandler = (event) => {
    event.preventDefault();
    if (toogleSideBar == true) {
      setToogleSideBar(false);
    } else setToogleSideBar(true);
  };

  return (
    <nav className={toogleSideBar ? "sidebar" : "sidebar close"}>
      <header>
        <div className="image-text">
          <div className="text logo-text">
            <span className="name">Logo</span>
          </div>
        </div>

        <FaBars className="toggle" onClick={toogeHandler}></FaBars>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <a href="#">
                <AiOutlineDashboard className="icon"></AiOutlineDashboard>
                <span className="text nav-text">Dashboard</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideNavigator;
