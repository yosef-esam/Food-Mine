import React from "react";
import { Link } from "react-router-dom";

function OrderItemList({ order }) {
  return (
    <table className="w-full">
      <tbody>
        <tr className="border-b border-gray-200">
          <td colSpan={5} className="py-2">
            <h3 className="text-lg font-semibold">Order Items:</h3>
          </td>
        </tr>
        {order.items.map((item) => (
          <tr key={item.food.id} className="border-b border-gray-200">
            <td className="py-2">
              <Link to={`/food/${item.food._id}`}>
                <img
                  src={item.food.imageUrl}
                  alt=""
                  className="w-10 h-10 object-cover rounded"
                />
              </Link>
            </td>
            <td className="py-2">{item.food.name}</td>
            <td className="py-2">{item.food.price}$</td>
            <td className="py-2">{item.quentity}</td>
          </tr>
        ))}
        <tr className="border-b border-gray-200">
          <td colSpan={3} className="py-2">
            <td className="py-2 font-semibold">Total:</td>
            <td className="py-2">{order.TotalPrice}</td>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default OrderItemList;
