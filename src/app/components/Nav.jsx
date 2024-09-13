import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Toogle from "./Toogle";
import UserDropdown from "../components/UserDropDown";

const Nav = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="m-2 px-6">
        <Image src="/food.png" alt="Logo" width={50} height={50} />
      </Link>

      {/* Button to open sidebar on mobile */}
      <button
        className="block md:hidden px-8"
        onClick={toggleSidebar}
        aria-label="Open Menu"
      >
        <Image src="/menu-icon.png" alt="Menu Icon" width={30} height={30} />
      </button>

      {/* Menu links for larger screens */}
      <ul className="hidden md:flex space-x-4 mx-8">
        <li>
          <Link href="#" className="flex items-center">
            <Image
              className="mx-1"
              src="/restaurant.png"
              alt="Full-Menu"
              width={30}
              height={30}
            />
            Full-Menu
          </Link>
        </li>
        <li>
          <Link className="flex items-center" href="#">
            <Image
              className="mx-1"
              src="/heart.png"
              alt="Healthy"
              width={30}
              height={30}
            />
            Healthy
          </Link>
        </li>
        <li className="flex items-center">
          <Toogle />
          Veg Only
        </li>
        <li className="flex items-center">
          <UserDropdown />
        </li>
      </ul>

      {/* Sidebar for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40" onClick={toggleSidebar}>
          <div
            className="fixed top-0 left-0 w-3/4 h-full bg-white p-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="mb-4" onClick={toggleSidebar}>
              <Image
                src="/close-icon.png"
                alt="Close Sidebar"
                width={30}
                height={30}
              />
            </button>

            <ul className="space-y-4">
              <li>
                <Link href="#" className="flex items-center">
                  <Image
                    className="mx-1"
                    src="/restaurant.png"
                    alt="Full-Menu"
                    width={30}
                    height={30}
                  />
                  Full-Menu
                </Link>
              </li>
              <li>
                <Link className="flex items-center" href="#">
                  <Image
                    className="mx-1"
                    src="/heart.png"
                    alt="Healthy"
                    width={30}
                    height={30}
                  />
                  Healthy
                </Link>
              </li>
              <li className="flex items-center">
                <Toogle />
                Veg Only
              </li>
              <li className="flex items-center">
                <UserDropdown />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
