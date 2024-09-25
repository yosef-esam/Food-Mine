import React from "react";
import { Link } from "react-router-dom";

function Tags({ tags, forFoodPage }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {!tags ? (
        <span className=" justify-center items-center text-2xl ">
          No tags available.
        </span>
      ) : (
        tags.map((tag) => (
          <Link
            key={tag.name}
            to={`/tags/${tag.name}`}
            className={`px-2 py-1 rounded-md text-sm ${
              !forFoodPage
                ? "bg-gray-100 text-blue-500"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tag.name}
            {!forFoodPage && `(${tag.count})`}
          </Link>
        ))
      )}
    </div>
  );
}

export default Tags;
