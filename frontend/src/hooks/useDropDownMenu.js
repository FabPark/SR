import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "./useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "flowbite/dist/flowbite.css";

function DropdownMenu() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  console.log("DropdownMenu rendered");
  const handleClick = () => {
    logout();
  };

  return (
    <div
      id="userDropdown"
      className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
    >
      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div>{user.username}</div>
      </div>
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="avatarButton"
      >
        <li>
          <Link
            to="/add-restaurant"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            + ADD NEW RESTAURANT
          </Link>
        </li>
      </ul>
      <div className="py-1">
        <button
          onClick={handleClick}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
}

export default DropdownMenu;
