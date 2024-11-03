import React, { useEffect, useState } from "react";
import { getNewOrderForCurrentUser } from "../../services/orderServices";
import OrderItemList from "../../component/OrderItemList";
import Map from "../../component/Map";
import PaypalButtons from "../../component/PaypalButtons";
function PaymendPage() {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);
  if (!order) return;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 pb-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-700">Order Form</h3>
            <p>{order.name}</p>
            <p>{order.address}</p>

            <div className="border p-4 rounded-lg">
              <OrderItemList order={order} />
            </div>
          </div>

          {/* Right Side: Choose Your Location */}
          <div className="flex flex-col space-y-4">
            <Map readonly={true} location={order.addressLatLng} />
          </div>
        </div>

        {/* Bottom: Go To Payment */}
        <div className="mt-4 text-center">
          <PaypalButtons order={order} />
        </div>
      </div>
    </div>
  );
}

export default PaymendPage;
