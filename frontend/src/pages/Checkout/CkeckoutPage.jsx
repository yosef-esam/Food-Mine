import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderCheckout } from "../../services/orderServices";
import OrderItemList from "../../component/OrderItemList";
import Map from "../../component/Map";

function CheckoutPage() {
  const { user } = useAuth();
  const { cart } = useCart();
  const [order, setOrder] = useState({ ...cart });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!order.adressLatLng) {
      toast.error("Please select your address");
      return;
    }
    await OrderCheckout({ ...order, name: order.name, address: order.address });
    navigate("/payment");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 pb-4">
          {/* Left Side: Order Form */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-700">Order Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                defaultValue={user.name}
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                defaultValue={user.address}
                type="text"
                placeholder="Address"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />

              <div className="border p-4 rounded-lg">
                <OrderItemList order={order} />
              </div>
            </form>
          </div>

          {/* Right Side: Choose Your Location */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold text-gray-700">
              Choose Your Location
            </h3>
            {/* Add your map or location selection component here */}

            {/* Placeholder for map */}
            <Map
              location={order.adressLatLng}
              onChange={(latlng) => {
                setOrder({ ...order, adressLatLng: latlng });
                console.log(latlng);
              }}
            />
          </div>
        </div>

        {/* Bottom: Go To Payment */}
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition duration-300"
          >
            Go To Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
