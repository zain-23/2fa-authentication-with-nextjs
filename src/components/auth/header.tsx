import React from "react";

interface HeaderProps {
  lable: string;
}

const Header = ({ lable }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-y-4 justify-center">
      <h1 className="text-3xl font-semibold">🔐 Auth</h1>
      <p className="text-muted-foreground text-sm">{lable}</p>
    </div>
  );
};

export default Header;
