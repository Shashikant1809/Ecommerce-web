import React from "react";
import "./Breadcrumbs.css";
import arrow_icon from "../assests/breadcrum_arrow.png";
const BreadCrumbs = (props) => {
  const { product } = props;

  return (
    <div className="breadcrumbs">
      HOME
      <img src={arrow_icon} alt="" />
      SHOP
      <img src={arrow_icon} alt="" />
      {product.category}
      <img src={arrow_icon} alt="" /> SHOP
      {product.name}
    </div>
  );
};

export default BreadCrumbs;
