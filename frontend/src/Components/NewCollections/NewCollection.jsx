import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Items/Item";
import new_collection from "../assests/new_collections";

const url = "https://ecommerce-web-backend-7o09.onrender.com/";
const NewCollection = () => {
  let [new_collection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch(`${url}/newcollection`)
      .then((res) => res.json())
      .then((data) => {
        setNewCollection(data);
      });
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, index) => {
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

export default NewCollection;
