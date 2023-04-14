"use client";
import React, { useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
const Switcher = () => {
  const [theme, setTheme] = useState("night");
  const toggleTheme = () => {
    setTheme(theme === "cupcake" ? "night" : "cupcake");
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <label className="swap swap-rotate  rounded-md p-2">
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on ">
        <MdOutlineDarkMode />
      </div>
      <div className="swap-off  ">
        <FiSun className="" />
      </div>
    </label>
  );
};

export default Switcher;
