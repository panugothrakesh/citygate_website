import React from "react";
// import blue from "../assets/blue.png";
// import { Link } from "react-router-dom";
// import { FaYoutube, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center py-12 px-6 ">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Left section with logo and brand name */}
        <div className="flex items-center gap-4 px-8 md:px-0 mb-8 md:mb-0">
          {/* <img src={blue} alt="blue" className="w-32 md:w-48" /> */}
          <div className="text-4xl md:text-6xl bluet">
            <h1 className="uppercase font-bold">CITY GATE</h1>
            {/* <h1 className="uppercase font-bold">FARM</h1> */}
            <h1 className="uppercase font-bold">ADVENTURE</h1>
            <p className="text-lg py-3 text-gray-500">
              Make your living experience even more memorable.
            </p>
          </div>
        </div>

        {/* Right section with links */}
        <div className="flex flex-col md:px-0 px-4 lg:flex-row gap-6 text-gray-600">
          <div className="flex flex-col md:flex-col text-lg md:text-2xl uppercase font-semibold">
            <div className="flex justify-start md:justify-end items- gap-4 mb-6">
              <a
                href="https://www.youtube.com/@chrme21456"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-3xl transition-all"
              >
                {/* <FaYoutube /> */}
              </a>
              <a
                href="https://www.linkedin.com/company/earth-farers-exim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl transition-all"
              >
                {/* <FaLinkedin /> */}
              </a>
              <a
                href="https://www.instagram.com/earthfarers_exim?igsh=MWg4a204M2VsenZvMQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-3xl transition-all"
              >
                {/* <FaInstagram /> */}
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-3xl transition-all"
              >
                {/* <FaFacebook /> */}
              </a>
            </div>
            <Link
              href="/"
              className="px-4 py-1.5 flex items-center justify-start md:justify-end cursor-pointer rounded-full before:w-0 before:transition-all before:ease-in-out before:duration-200 before:hover:w-[70%] before:bg-[#1D4634] before:h-[1px] before:rounded-full before:absolute before:bottom-0 relative"
            >
              About Us
            </Link>
            <Link
              href="/book"
              className="px-4 py-1.5 flex items-center justify-start md:justify-end cursor-pointer rounded-full before:w-0 before:transition-all before:ease-in-out before:duration-200 before:hover:w-[70%] before:bg-[#1D4634] before:h-[1px] before:rounded-full before:absolute before:bottom-0 relative"
            >
              Book now
            </Link>
          </div>
        </div>
      </div>

      <hr className="my-6 w-10/12 border-gray-300" />

      <div className="max-w-6xl text-center flex flex-col md:flex-row items-center justify-between w-full text-sm text-gray-600">
        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} CityGate Adventure.
        </p>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
