import React, { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext(null);
const CART_KEY = "cart";
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};
function CartProvider({ children }) {
  const getItemsFromLoacalStorage = () => {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  };
  const initCart = getItemsFromLoacalStorage();
  const [cartItem, setCartitem] = useState(initCart.items);
  const [TotalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [TotalCount, setTotlaCount] = useState(initCart.totalCount);

  const RemoveItem = (removedItem) => {
    const filteredItems = cartItem.filter(
      (item) => item.food._id !== removedItem
    );
    setCartitem(filteredItems);
  };

  const ChangedCartItem = (Item, newQuentity) => {
    const updatedCartItem = {
      ...Item,
      quentity: newQuentity,
      price: Item.price * newQuentity,
    };
    setCartitem(
      cartItem.map((item) =>
        item.food._id === Item.food._id ? updatedCartItem : item
      )
    );
  };
  useEffect(() => {
    setTotalPrice(sum(cartItem.map((item) => item.price)));
    setTotlaCount(sum(cartItem.map((item) => item.quentity)));
    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItem,
        totalPrice: TotalPrice,
        totalCount: TotalCount,
      })
    );
  }, [cartItem]);

  const sum = (item) => {
    return item.reduce((prevItem, currItem) => prevItem + currItem, 0);
  };

  const AddItem = (food) => {
    const item = cartItem.find((item) => item.food._id === food._id);
    if (item) {
      ChangedCartItem(item, item.quentity + 1);
    } else {
      setCartitem([...cartItem, { food, quentity: 1, price: food.price }]);
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    const { items, totalPrice, totalCount } = EMPTY_CART;
    setCartitem(items);
    setTotalPrice(totalPrice);
    setTotlaCount(totalCount);
  };

  return (
    <cartContext.Provider
      value={{
        cart: { items: cartItem, TotalPrice, TotalCount },
        RemoveItem,
        ChangedCartItem,
        AddItem,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
export const useCart = () => useContext(cartContext);
