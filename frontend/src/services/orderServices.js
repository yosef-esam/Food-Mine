import axios from "axios";
export const OrderCheckout = async (order) => {
  try {
    const { data } = await axios.post("/api/orders/create", order);

    return data;
  } catch (err) {
    console.log(err);
  }
};
