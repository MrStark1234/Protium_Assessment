import React, { useState } from "react";

const Background = () => {
  return (
    <div className="fixed z-[2] w-full h-screen">
      {/* <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] text-sky-950 text-[9vw] leading-none tracking-tighter font-semibold ">
        TASK-CHITS.
      </h1> */}
      <h1 className="absolute w-full py-10 text-zinc-600 flex justify-center text-xl font-semibold top-[5%]">
        Task Management App.
      </h1>
    </div>
  );
};

export default Background;
