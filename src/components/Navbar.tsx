"use client";

import { useState } from "react";
import { Button } from "./Button";
import { motion } from "framer-motion";
import Link from "next/link";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="z-[999] bg-[#efeae0] flex justify-between items-center fixed top-0 left-0 py-3 md:py-5 lg:py-3 px-8 lg:px-12 w-screen text-[#1D4634]">
      {/* <div className="flex items-center justify-between w-full"> */}
      {/* <h1 className="font-semibold text-lg">City Gate Advenchar</h1> */}

      {/* </div> */}
      <motion.nav
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 md:hidden"
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-4 mt-8 text-sm font-medium">
          <Link href="/" className="px-4 py-1.5 cursor-pointer">Home</Link>
          <Link href="/" className="px-4 py-1.5 cursor-pointer">About Us</Link>
          <Link href="#contact" className="px-4 py-1.5 cursor-pointer">Contact Us</Link>
          <li className="px-4 py-1.5 cursor-pointer">
            <Button size="md" to="book">
              Book Now
            </Button>
          </li>
        </ul>
      </motion.nav>
      <div className="hidden md:flex lg:w-1/3 items-center lg:justify-start">
        <ul className="flex items-center justify-start space-x-0.5 text-sm font-medium">
          <Link href="/" className="px-4 py-1.5 flex items-center justify-center cursor-pointer rounded-full before:w-0 before:transition-all before:ease-in-out before:duration-200 before:hover:w-[70%] before:bg-[#1D4634] before:h-[1px] before:rounded-full before:absolute before:bottom-0 relative">
            About Us
          </Link>
          <Link href="#contact" className="px-4 py-1.5 flex items-center justify-center cursor-pointer rounded-full before:w-0 before:transition-all before:ease-in-out before:duration-200 before:hover:w-[70%] before:bg-[#1D4634] before:h-[1px] before:rounded-full before:absolute before:bottom-0 relative">
            Contact Us
          </Link>
        </ul>
      </div>
      <Link href="/" className="">
        <h1 className=" text-center font-semibold text-lg">
          City Gate Adventure
        </h1>
      </Link>
      <div className="hidden md:flex lg:w-1/3 items-center justify-end">
        <Button size="md" to="/book">
          Book Now
        </Button>
      </div>
      <div className="md:hidden ">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};
