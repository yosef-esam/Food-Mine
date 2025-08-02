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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-gray-600">View and track your orders</p>
        </div>

        {/* Filter Tabs */}
        {allStatus && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to={"/orders"}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  !filter
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                All Orders
              </Link>
              {allStatus.map((status) => (
                <Link
                  key={status}
                  to={`/orders/${status}`}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    filter === status
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  {status}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Orders Grid */}
        {orders?.length === 0 && <NotFound message={"No orders found!"} />}
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders &&
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-white/80 mb-1">Order ID</h3>
                      <p className="text-lg font-semibold break-all">
                        {order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm">
                      {order.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white/80 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <DateTime order={order} />
                  </div>
                </div>

                {/* Items Section */}
                <div className="p-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Order Items</h4>
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {order.items.map((item) => (
                      <Link 
                        key={item.food._id} 
                        to={`/food/${item.food._id}`}
                        className="flex-shrink-0 group"
                      >
                        <div className="relative">
                          <img
                            src={item.food.imageUrl}
                            alt={item.food.name}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200 group-hover:border-orange-300 transition-colors duration-200"
                          />
                          <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                            {item.quantity}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/track/${order._id}`}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Track Order
                    </Link>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-green-600">
                        ${order.TotalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
