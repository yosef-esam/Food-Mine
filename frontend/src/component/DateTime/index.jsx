import React from "react";

function DateTime({ order }) {
  return (
    <div>
      {" "}
      {new Date(order.createdAt).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })}
    </div>
  );
}

export default DateTime;
