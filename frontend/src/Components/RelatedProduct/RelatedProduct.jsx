import React from "react";
import "./RelatedProduct.css";
import data_product from "../assests/data";
import Item from "../Items/Item";
const RelatedProduct = () => {
  return (
    <div className="relatedproducts">
      <h1>Related Product</h1>
      <hr />
      <div className="relatedProduct-items">
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

export default RelatedProduct;
