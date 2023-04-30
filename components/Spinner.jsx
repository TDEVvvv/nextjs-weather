import React from "react";
import spinner from "../public/jeongeui-roh-jeongeui.gif";
import Image from "next/image";
const Spinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Image
        className="w-[400px] m-auto block mt-40"
        src={spinner}
        alt="loading.."
      />
    </div>
  );
};

export default Spinner;
