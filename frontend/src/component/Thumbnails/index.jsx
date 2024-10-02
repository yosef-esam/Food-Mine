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
        food.map((item) => (
          <li key={item.id} className="w-1/4 p-2">
            <Link
              to={`/food/${item._id}`}
              className="h-[22.5rem] w-[20rem] border-solid border-white rounded-2xl m-[.5rem] flex flex-col overflow-hidden shadow-md "
            >
              <img
                src={`${item.imageUrl}`}
                alt={item.name}
                className=" object-cover  h-[14.5rem] rounded-lg"
              />

              <div className="p-2 relative ">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                {item.favorite ? (
                  <span className="text-red-500 absolute right-4  top-2  text-2xl ">
                    ♥︎
                  </span>
                ) : (
                  <span className="text-red-300 absolute right-4  top-2  text-2xl">
                    ♥︎
                  </span>
                )}
                <Rating
                  name="half-rating"
                  defaultValue={item.stars}
                  precision={0.5}
                  className="text-yellow-500  my-2"
                />

                <div className="text-sm bg-slate-300  text-gray-600 mr-1 px-2  rounded-lg text-center  w-[60px]">
                  {item.origins}
                </div>
                <div className="text-sm absolute right-4">
                  🕒{item.cookTime}
                </div>
                <div className="text-xl text-[#414141] m-1 ">
                  {" "}
                  {item.price}$
                </div>
              </div>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}

export default Thumbnails;
