import React, { useReducer, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAll, getAllStatus } from "../../services/orderServices";
import DateTime from "../../component/DateTime";
import NotFound from "../../component/NotFound";
const initialState = {};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ORDERS-FETCHED":
      return { ...state, orders: payload };
    case "ALL-STATUS-FETCHED":
      return { ...state, allStatus: payload };
    default:
      return state;
  }
};
function OrdersPage() {
  const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);
  const { filter } = useParams();
  useEffect(() => {
    getAllStatus().then((status) => {
      dispatch({ type: "ALL-STATUS-FETCHED", payload: status });
    });
    getAll(filter).then((orders) => {
      dispatch({ type: "ORDERS-FETCHED", payload: orders });
    });
  }, [filter]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>

      {allStatus && (
        <div className="text-center p-7  space-x-4  ">
          <Link
            to={"/orders"}
            className={
              !filter
                ? "px-5 py-2 bg-gray-900 text-white rounded-full font-semibold"
                : "px-5 py-2 text-gray-500 hover:bg-gray-900 hover:rounded-full"
            }
          >
            All
          </Link>
          {allStatus.map((status) => (
            <Link
              key={status}
              to={`/orders/${status}`}
              className={
                filter === status
                  ? "px-5 py-2 bg-gray-900 text-white rounded-full font-semibold"
                  : "px-5 py-2 text-gray-500 hover:bg-gray-900 hover:rounded-full"
              }
            >
              {status}
            </Link>
          ))}
        </div>
      )}
      {orders?.length === 0 && <NotFound message={"No thing found !"} />}
      {orders &&
        orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col justify-between p-6 mb-6 border rounded-lg shadow-md"
            style={{ minHeight: "200px" }} // Increases the height of each order card
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium break-all">{order._id}</h2>{" "}
              {/* Allows ID to wrap if it's too long */}
              <p className="text-gray-500">
                <DateTime order={order} />
              </p>
              <div
                className={`text-sm font-semibold ${
                  order.status === "NEW" ? "text-red-500" : "text-green-500"
                }`}
              >
                {order.status}
              </div>
            </div>

            {/* Items Section */}
            <div className="flex space-x-2 overflow-x-auto mb-4">
              {order.items.map((item) => (
                <Link key={item.food._id} to={`/food/${item.food._id}`}>
                  <img
                    src={item.food.imageUrl}
                    alt={item.food.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </Link>
              ))}
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <Link
                to={`/track/${order._id}`}
                className="text-purple-600 hover:underline"
              >
                Show Order
              </Link>
              <div className="text-green-500 font-semibold">
                ${order.TotalPrice}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default OrdersPage;
