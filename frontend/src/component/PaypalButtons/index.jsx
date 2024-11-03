import React, { useEffect } from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useLoading } from "../../hooks/useLoading";
import { Pay } from "../../services/orderServices";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function PaypalButtons({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AUyHslEhlNG9BemRXPZ0BpWyhhQ5BpFKqqqCj7HEWEAC-29ErtIvX_jNBk-ES8cXHJcInbVIvrL0WlLu",
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

const Buttons = ({ order }) => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    isPending ? showLoading() : hideLoading();
  });
  const createOrder = (data, action) => {
    return action.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: String(order.TotalPrice),
          },
        },
      ],
    });
  };
  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await Pay(payment.id);
      clearCart();
      toast.success("payment saved successfully", { type: "success" });
      navigate("/track/" + orderId);
    } catch (error) {
      toast.error("payment save faild", { type: "error" });
    }
  };
  const onError = (err) => {
    console.error("Create order error:", err); // Log the error details
    toast.error(err.message, { type: "error" });
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
};

export default PaypalButtons;
