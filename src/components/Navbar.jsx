import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full h-14 bg-[#181818] text-white shadow-sm flex items-center justify-center ">
      <div id="nav-links" className="space-x-5 font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to={"/pastes"}
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
