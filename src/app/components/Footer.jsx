import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="flex items-center justify-around">
        <div className="flex items-center">
          <Image src="/food.png" alt="Logo" width={50} height={50} />
          <ul className="flex justify-between mx-2">
            <Link className="mx-2" href="#">
              <Image src="/facebook.png" alt="Logo" width={30} height={30} />
            </Link>
            <Link className="mx-2" href="#">
              <Image src="/instagram.png" alt="Logo" width={30} height={30} />
            </Link>
            <Link className="mx-2" href="#">
              <Image src="/pinterest.png" alt="Logo" width={30} height={30} />
            </Link>
          </ul>
        </div>
        <div>
          <ul className="flex items-center">
            <li className="mx-2">
              <Link href="#">Home</Link>
            </li>
            <li className="mx-2">
              <Link href="#">Menu</Link>
            </li>
            <li className="mx-2">
              <Link href="#">Bar</Link>
            </li>
            <li className="mx-2">
              <Link href="#">About</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <a href="https://www.flaticon.com/free-icons/plate" title="icons">
          Icons by - Flaticon
        </a>
      </div>
    </footer>
  );
};

export default Footer;
