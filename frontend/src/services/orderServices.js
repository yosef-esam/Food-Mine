import axios from "axios";
export const OrderCheckout = async (order) => {
  try {
    const { data } = await axios.post("/api/orders/create", order);
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getNewOrderForCurrentUser = async () => {
  const { data } = await axios.get("/api/orders/newOrderForCurrentUser");
  return data;
};

export const Pay = async (paymentId) => {
  try {
    const { data } = await axios.put(`/api/orders/pay`, { paymentId });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const trackOrderId = async (orderId) => {
  const { data } = await axios.get(`/api/orders/track/` + orderId);
  return data;
};
export const getAll = async (state) => {
  const { data } = await axios.get(`/api/orders/${state ?? ``}`);
  return data;
};
export const getAllStatus = async () => {
  const { data } = await axios.get(`/api/orders/getAllStatus`);

  return data;
};
