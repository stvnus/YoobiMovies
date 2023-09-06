

import React from "react";
import SearchBar from "../Search"; // Ubah path sesuai dengan struktur folder Anda

interface NavbarProps {
  scrolled: boolean;
  onLogoClick: () => void;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, onLogoClick, onSearch }) => {
  return (
    <nav
      className={`fixed top-0 w-full p-4 z-10 ${
        scrolled ? "bg-black bg-opacity-75 " : ""
      } flex justify-between transition-all duration-300`}
    >
      <h1
        className="text-white text-2xl font-semibold cursor-pointer"
        onClick={() => {
          onLogoClick();
        }}
      >
        YooMovies
      </h1>
 
      <SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Navbar;
