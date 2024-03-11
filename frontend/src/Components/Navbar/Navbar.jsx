import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef();

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img
          src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533335/logo_kdof1y.png"
          alt=""
        />
        <Link to="/" style={{ textDecoration: "none" }}>
          <p onClick={()=>{setMenu('shop')}}>TRENDIFY</p>
        </Link>
      </div>
      <ul className="nav-menu" ref={menuRef}>
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          {" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            Shop
          </Link>
          {menu === "shop" ? <hr className="nav-hr" /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("men");
          }}
        >
          {" "}
          <Link to="/mens" style={{ textDecoration: "none" }}>
            Men
          </Link>
          {menu === "men" ? <hr className="nav-hr" /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("women");
          }}
        >
          {" "}
          <Link to="/womens" style={{ textDecoration: "none" }}>
            Women
          </Link>
          {menu === "women" ? <hr className="nav-hr" /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          {" "}
          <Link to="kids" style={{ textDecoration: "none" }}>
            Kids
          </Link>
          {menu === "kids" ? <hr className="nav-hr" /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>LogOut</button>
        :<Link to="/login" style={{ textDecoration: "none" }}>
          <button>Login</button>
        </Link>} 
        
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <img
            src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533334/cart_icon_zcjgxa.png"
            alt=""
          />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
