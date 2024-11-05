import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

function Thumbnails({ food }) {
  return (
    <ul className="flex flex-wrap text-[#e72929] justify-center items-center ">
      {!food ? (
        <span className=" justify-center items-center text-2xl ">
          No food found.
        </span>
      ) : (
        <div> yousef </div>
      )}
    </ul>
  );
}

export default Thumbnails;
