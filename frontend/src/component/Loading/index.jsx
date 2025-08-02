import React from "react";
import { useLoading } from "../../hooks/useLoading";

function Loading() {
  const { isLoading } = useLoading();
  if (!isLoading) {
    return null;
  }
  return (
    <div className="fixed w-full h-full z-50 top-0 left-0 flex items-center justify-center" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif', background: '#fff' }}>
      <div className="flex flex-col items-center justify-center border-b border-solid border-b-[#f4f0f0] bg-white px-10 py-6 rounded-lg shadow-lg">
        <img
          src="/Food/Loading.svg"
          alt="Loading..."
          className="w-16 h-16 mb-4 animate-spin"
        />
        <span className="text-[#181111] text-lg font-bold leading-tight tracking-[-0.015em]">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
