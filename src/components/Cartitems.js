import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import "./Cartitem.css";

function Cartitems() {
  const state = useContext(context);
  const { data, dispatch } = state;
  const { itemsList, cartItems, totalItems } = data;

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const caleculateCartItemsTotalPrice = () => {
      const res =
        cartItems &&
        cartItems.reduce((acc, item) => {
          return acc + item.price;
        }, 0);
      return res;
    };
    const sum = caleculateCartItemsTotalPrice();
    setTotalPrice(sum > 0 ? sum.toFixed(2) : 0);
  }, [cartItems]);

  return (
    <div className="container">
      <h1 className="mainTitle">ShoppingCart</h1>
      <p className="TotalItems">{`Total Items : ${totalItems}`}</p>
      <p className="TotalPrice">{`Total Price : $ ${totalPrice}`}</p>

      <ul className="ulList">
        {itemsList &&
          itemsList.map((item) => (
            <li className="liList" key={item.id}>
              <div className="item-image-container">
                <img
                  src={item.images[0]}
                  alt="item-image"
                  className="item_image"
                />
              </div>
              <div className="item-description-container">
                <h2 className="image_title">{item.title}</h2>
                <p className="image_decription">{item.description}</p>
                <p className="image_price">$ {item.price}</p>
                <button
                  type="button"
                  className="add_button"
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", payload: item.id })
                  }
                >
                  AddCart
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Cartitems;
