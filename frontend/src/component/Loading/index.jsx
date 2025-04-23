import React from "react";

import { useLoading } from "../../hooks/useLoading";
function Loading() {
  const { isLoading } = useLoading();
  if (!isLoading) {
    return;
  }
  return (
    <div>
      <div className=" fixed w-full h-full bg-[#ededee] z-50  top-0 left-0 ">
        <div className=" flex items-center justify-center flex-col  h-[80%] w-[80#]">
          <img
            src="https://usagif.com/wp-content/uploads/loading-81.gif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Loading;
