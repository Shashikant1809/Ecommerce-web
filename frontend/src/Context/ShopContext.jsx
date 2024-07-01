import React, { createContext, useEffect, useState } from "react";
// import all_product from "../Components/assests/all_product";

const ShopContext = createContext(null);
const url = "http://localhost:4000";
const getDefaultCarts = () => {
  let cart = {};
  for (let index = 1; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
console.log(getDefaultCarts());
// console.log(all_product.length);

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  let [cartItems, setCartItems] = useState(getDefaultCarts());

  useEffect(() => {
    fetch(`${url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAll_product(data));

    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  // Add to cart

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const currentQuantity = prev[itemId] || 0;
      if (currentQuantity > 0) {
        return { ...prev, [itemId]: currentQuantity - 1 };
      } else {
        return prev;
      }
    });
    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      {
        if (cartItems[item] > 0) {
          let itemInfo = all_product.find(
            (product) => product.id === Number(item)
          );
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      {
        if (cartItems[item] > 0) {
          totalItem += cartItems[item];
        }
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export { ShopContext, ShopContextProvider };
