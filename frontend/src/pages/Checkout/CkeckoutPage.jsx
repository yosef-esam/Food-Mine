import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderCheckout } from "../../services/orderServices";
import OrderItemList from "../../component/OrderItemList";
import Map from "../../component/Map";

function CheckoutPage() {
  const { user } = useAuth();
  const { cart } = useCart();
  const [order, setOrder] = useState({ ...cart });
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!order.addressLatLng) {
      toast.error("Please select your address");
      return;
    }
    await OrderCheckout({ ...order, name: name, address: address });
    navigate("/payment");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-2 gap-4 border-b border-gray-300 pb-4">
            {/* Left Side: Order Form */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-700">
                Order Form
              </h3>

              <input
                defaultValue={name}
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                defaultValue={address}
                type="text"
                placeholder="Address"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setAddress(e.target.value)}
              />

              <div className="border p-4 rounded-lg">
                <OrderItemList order={order} />
              </div>
            </div>

            {/* Right Side: Choose Your Location */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-semibold text-gray-700">
                Choose Your Location
              </h3>
              {/* Add your map or location selection component here */}

              {/* Placeholder for map */}
              <Map
                location={order.addressLatLng}
                onChange={(latlng) => {
                  setOrder({ ...order, addressLatLng: latlng });
                }}
              />
            </div>
          </div>

          {/* Bottom: Go To Payment */}
          <div className="mt-4 text-center">
            {" "}
            <button
              type="submit"
              className="w-full py-3 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition duration-300"
            >
              Go To Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CheckoutPage;
