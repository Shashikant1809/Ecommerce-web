import React, { useContext } from "react";
import "./ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/assests/dropdown_icon.png";
import Item from "../Components/Items/Item";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img
        className="shopcategory-banner"
        src={props.banner}
        alt="men banner imge"
      />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span>out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
        {all_product.map((item, index) => {
          if (props.category === item.category) {
            return (
              <Item
                className="item"
                key={index}
                name={item.name}
                id={item.id}
                image={item.image}
                old_price={item.old_price}
                new_price={item.new_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>

      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
