import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../assests/logo.png";
import cart_icon from "../assests/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import dropdown_icon from "../assests/nav_dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <Link to="/" style={{ textDecoration: "none", color: "#626262" }}>
          <p>SHOPPER</p>
        </Link>
      </div>
      <img
        onClick={dropdown_toggle}
        className="nav-dropdown"
        src={dropdown_icon}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none", color: "#626262" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr></hr> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link to="/mens" style={{ textDecoration: "none", color: "#626262" }}>
            Men{" "}
          </Link>{" "}
          {menu === "mens" ? <hr></hr> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link
            to="/womens"
            style={{ textDecoration: "none", color: "#626262" }}
          >
            Women
          </Link>
          {menu === "womens" ? <hr></hr> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link to="/kids" style={{ textDecoration: "none", color: "#626262" }}>
            Kids
          </Link>
          {menu === "kids" ? <hr></hr> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#626262" }}
          >
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
