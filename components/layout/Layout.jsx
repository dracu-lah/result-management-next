import React from "react";
import Navbar from "./navbar/Navbar";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Head>
        <title>Result Management</title>
      </Head>
      <div>
        <Navbar />
      </div>
      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
