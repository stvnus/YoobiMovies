import React, { useState } from "react";
import SearchBar from "@/components/Molecules/Search";

interface NavbarProps {
  scrolled: boolean;
  onLogoClick: () => void;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, onLogoClick, onSearch }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <nav
      className={`fixed top-0 w-full p-4 z-10 ${
        scrolled ? "bg-black bg-opacity-75 " : ""
      } flex justify-between transition-all duration-300`}
    >
      <h1
        className={`text-white text-2xl font-semibold cursor-pointer ${
          showSearchInput ? "hidden sm:block" : ""
        }`}
        onClick={() => {
          onLogoClick();
        }}
      >
        YooMovies
      </h1>

      <div className="flex items-center space-x-2">
        {showSearchInput ? (
          <SearchBar onSearch={onSearch} />
        ) : (
          <button
            onClick={toggleSearchInput}
            className="bg-transparent border-none text-white hover:text-blue-500 p-2 rounded cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-5.2-5.2M15 10a5 5 0 11-10 0 5 5 0 0110 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
