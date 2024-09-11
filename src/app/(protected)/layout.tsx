import React from "react";
import Navbar from "./_components/navbar";

const PritectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full gap-y-10 items-center justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-400 to-red-800">
      <Navbar />
      {children}
    </div>
  );
};

export default PritectLayout;
