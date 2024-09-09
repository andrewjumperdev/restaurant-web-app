"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const UserDropdown = () => {
  const { user, login, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        {user ? (
          <button
            className="flex items-center space-x-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              className="w-8 h-8 rounded-full"
              src="./images/avatar.png"
              alt="User Avatar"
            />
            <span>{user.name}</span>
          </button>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mx-2"
            >
              Login
            </button>
            <button
              onClick={handleSignUp}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mx-2"
            >
              Signup
            </button>
          </>
        )}
      </div>

      {isDropdownOpen && user && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
          <div className="py-2">
            <a
              href="#profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </a>
            <a
              href="#settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
