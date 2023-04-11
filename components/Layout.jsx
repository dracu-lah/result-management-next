import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <div>
        <Navbar />
      </div>
      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
