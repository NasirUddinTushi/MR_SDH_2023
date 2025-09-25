import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logoMain.png";
import { IoMenu } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const linksRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleClick = (e) => {
    if (linksRef.current && !linksRef.current.contains(e.target)) {
      setOpen(false);
    }
    if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
      setUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const Links = (
    <div className="nav-nav-link flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-6 xl:gap-4  2xl:gap-[52px]  text-lg md:text-sm xl:text-lg text-[rgba(61,_64,_64,_0.60)] font-[Inter] text-[16px] not-italic font-medium leading-[24px] ">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about-us">About Us</NavLink>
      <NavLink to="/services">Services</NavLink>
      <NavLink to="/contact-us">Contact Us</NavLink>
    </div>
  );

  return (
    <nav className="bg-[#FBFDFE] w-full text-sm md:text-base sticky top-0 z-50 [box-shadow:0px_4px_8px_0px_rgba(196,_196,_196,_0.15)]">
      <div className="w-11/12 mx-auto flex items-center justify-between gap-2 py-3 sm:py-4 md:py-6 lg:py-7">
        {/* logo */}
        <div>
          <img
            className="w-20 h-8 lg:w-24 lg:h-10 xl:w-32"
            src={logo}
            alt="logo"
          ></img>
        </div>

        {/* menu */}
        <div className=" py-1 px-1 rounded-[36px] xl:rounded-[48px] lg:rounded-[100px] hidden md:block">
          {Links}
        </div>

        <div className="flex items-center gap-2 ">
          {/* auth area */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((p) => !p)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-[#3D4040] text-white flex items-center justify-center uppercase">
                  {user?.name?.[0] || user?.username?.[0] || user?.email?.[0] || "U"}
                </div>
                <span className="hidden sm:block text-[#3D4040] font-medium">
                  {user?.name || user?.username || user?.email}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border shadow-md rounded-md py-1 z-50">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 hover:bg-gray-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="sign-in"
              className="flex items-center justify-center gap-1 md:gap-2 py-2 px-3 md:py-3 lg:px-7 xl:px-[45px] rounded-[100px] text-[#F1F3F5] font-[Inter] text-[15px] sm:text-4 md:text-[17px] lg:text-[18px] not-italic font-medium leading-[24px] bg-[#3D4040] sm:min-w-[105px] md:min-w-[145px] hover:bg-inherit hover:border-[#3D4040] hover:text-[#3D4040] transition duration-300 border border-transparent "
            >
              Log in
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.0013 7L18.0013 12M18.0013 12L13.0013 17M18.0013 12H2.66797"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
          )}

          <Sheet className="w-2/3" open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <IoMenu className="text-3xl cursor-pointer text-black block md:hidden" />
            </SheetTrigger>
            <SheetContent
              className="py-5 md:hidden content-baseline"
              onClick={handleClick}
            >
              <SheetHeader className="md:hidden">
                <div
                  ref={linksRef}
                  className="w-full  flex items-center justify-center"
                >
                  {Links}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
