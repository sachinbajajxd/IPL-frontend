import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">IPL Stats</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/extras-conceded"
            className="text-white hover:text-gray-300"
          >
            Extras Conceded
          </Link>
          <Link to="/economical-bowler" className="text-white hover:text-gray-300">
            Economical Bowler
          </Link>
          <Link to="/win-record" className="text-white hover:text-gray-300">
            Win Record
          </Link>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button className="text-white hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
