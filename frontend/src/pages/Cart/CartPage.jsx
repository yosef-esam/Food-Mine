import React from "react";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import NotFound from "../../component/NotFound";

function CartPage() {
  const { cart, RemoveItem, ChangedCartItem } = useCart();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review and manage your cart items</p>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <NotFound message={"The Cart is Empty 🛒"} />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Cart Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Your Cart Items</h2>
                  <p className="text-white/80 text-sm mt-1">{cart.items.length} items in cart</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/80">Total Items</p>
                  <p className="text-2xl font-bold">{cart.TotalCount}</p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="p-6">
              <ul className="space-y-4">
                {cart.items.map((item) => (
                  <li
                    key={item.food._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <img
                        src={item.food.imageUrl}
                        alt={item.food.name}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200"
                      />
                      <Link
                        to={`/food/${item.food._id}`}
                        className="text-base font-semibold text-gray-900 truncate hover:text-orange-600 transition-colors"
                      >
                        {item.food.name}
                      </Link>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <select
                        value={item.quentity}
                        onChange={(e) =>
                          ChangedCartItem(item, Number(e.target.value))
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                      
                      <div className="text-lg font-bold text-green-600 min-w-[60px] text-right">
                        ${item.price}
                      </div>
                      
                      <button
                        className="text-red-500 hover:text-red-700 font-medium px-3 py-2 rounded-lg transition-colors hover:bg-red-50"
                        onClick={() => RemoveItem(item.food._id)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cart Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-sm text-gray-600 mb-2">Order Summary</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-semibold text-gray-900">{cart.TotalCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Total:</span>
                      <span className="text-2xl font-bold text-green-600">${cart.TotalPrice}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-8 rounded-xl font-semibold text-base shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:-translate-y-1 min-w-[200px]"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
