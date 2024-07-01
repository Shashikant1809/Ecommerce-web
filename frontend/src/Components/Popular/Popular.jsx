import React, { useEffect, useState } from "react";
import "./Popular.css";
// import data_product from "../assests/data";
import Item from "../Items/Item";
const url = "https://ecommerce-web-backend-7o09.onrender.com";
const Popular = () => {
  const [data_product, setData_product] = useState([]);
  useEffect(() => {
    fetch(`${url}/popularinwomen`)
      .then((res) => res.json())
      .then((data) => {
        setData_product(data);
      });
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, index) => {
          return (
            <Item
              key={index}
              name={item.name}
              id={item.id}
              image={item.image}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
