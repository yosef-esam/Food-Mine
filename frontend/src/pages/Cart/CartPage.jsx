import React from "react";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import NotFound from "../../component/NotFound";

function CartPage() {
  const { cart, RemoveItem, ChangedCartItem } = useCart();

  return (
    <div className="flex justify-center p-4">
      {cart.items.length == 0 ? (
        <NotFound message={"The Cart is Empty Now !"} />
      ) : (
        <div className="w-full max-w-4xl border rounded-lg p-4">
          <ul className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <li
                key={item.food.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`/Food/${item.food.imageUrl}`}
                    alt={item.food.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <Link
                    to={`/food/${item.food.id}`}
                    className="text-lg font-semibold text-purple-700"
                  >
                    {item.food.name}
                  </Link>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={item.quentity}
                    className="border rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) =>
                      ChangedCartItem(item, Number(e.target.value))
                    }
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                  <div className="text-lg font-semibold">${item.price}</div>
                </div>

                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => RemoveItem(item.food.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-between items-center border-t pt-4">
            <div className="text-lg font-semibold">
              <div>Count: {cart.TotalCount}</div>
              <div>Price: ${cart.TotalPrice}</div>
            </div>

            <Link
              to="/checkout"
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
