import React from "react";
import { Link } from "react-router-dom";
function NotFound({ message }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-[#f7f7f7] w-full py-8 px-2">
      <div className="bg-white rounded-xl shadow-lg border border-[#f4f0f0] p-8 text-center max-w-xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-[#181111] mb-8">{message}</h1>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#181111] text-white rounded-lg font-bold text-base shadow hover:bg-[#2d2323] transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
