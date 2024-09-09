import Image from "next/image";
import Link from "next/link";
import React from "react";
import Toogle from "./Toogle";
import UserDropdown from "./UserDropDown";

const Nav = () => {
  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="m-2">
        <Image src="/food.png" alt="Logo" width={50} height={50} />
      </Link>
      <ul className="flex space-x-4 mx-8">
        <li>
          <Link href="#" className="flex items-center">
            {" "}
            <Image
              className="mx-1"
              src="/restaurant.png"
              alt="Logo"
              width={30}
              height={30}
            />{" "}
            Full-Menu
          </Link>
        </li>
        <li>
          <Link className="flex items-center" href="#">
            {" "}
            <Image
              className="mx-1"
              src="/heart.png"
              alt="Logo"
              width={30}
              height={30}
            />{" "}
            Healthy
          </Link>
        </li>
        <li className="flex items-center ">
          <Toogle />
          Veg Only
        </li>
        <li className="flex items-center ">
          <UserDropdown />
        </li>
      </ul>
    </div>
  );
};

export default Nav;
