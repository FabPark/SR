import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "flowbite/dist/flowbite.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { getUserInitials } from "../hooks/getInitials";
import DropdownMenu from "../hooks/useDropDownMenu";
import SideMenu from "../hooks/menuBar";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isAvatarMenuVisible, setIsAvatarMenuVisible] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const avatarButtonRef = useRef(null);


  const handleMobileMenuClick = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  const handleAvatarButtonClick = () => {
    setIsAvatarMenuVisible(!isAvatarMenuVisible);
  };
  
  const handleLogout = () => {
    logout();
  };

  const handleClickOutside = (event) => {
    console.log("Clicked outside");
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      avatarButtonRef.current &&
      !avatarButtonRef.current.contains(event.target)
    ) {
      setIsMobileMenuVisible(false);
      setIsAvatarMenuVisible(false);
    }
  };


  useEffect(() => {
    setIsMobileMenuVisible(false);
    setIsAvatarMenuVisible(false);

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [location.pathname]);

  return (
    <nav className="navbar fixed top-0 bg-gray-400 text-black  relative z-50">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative z-10">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="headlogo self-center text-2xl font-semibold whitespace-nowrap">
            SUWON RESTAURANTS
          </span>
        </Link>
  
                    <div className="relative">
        <button
          type="button"
          className="dropdown overflow-hidden right-0 mt-2 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded={isMobileMenuVisible ? "true" : "false"}
          onClick={handleMobileMenuClick}
          ref={mobileMenuRef}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
              {isMobileMenuVisible && (
                <SideMenu user={user} handleClick={handleLogout} />
              )}  </div>
              <div
                className={`hidden w-full md:flex md:w-auto ${
                  isMobileMenuVisible ? "md:flex" : ""
                }`}
              >
            <ul className="font-medium flex md:space-x-4 rtl:space-x-reverse">
              <li>
                <Link
                  to="/"
                  className="headlogo block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="headlogo block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  ABOUT
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <div className="relative">
                      <button
                        id="avatarButton"
                        type="button"
                        className="dropdown w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                        onClick={handleAvatarButtonClick}
                        ref={avatarButtonRef}
                      >
                        <span className="headlogo font-medium text-gray-600 dark:text-gray-300">
                          {getUserInitials(user.username)}
                        </span>
                      </button>
                      {isAvatarMenuVisible && (
                        <DropdownMenu user={user} handleClick={handleLogout} />
                      )}
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="headlogo block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      LOG OUT
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="headlogo block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      SIGN IN
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="headlogo block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      SIGN UP
                    </Link>
                  </li>
                </>
              )}
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
