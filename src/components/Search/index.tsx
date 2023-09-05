import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="border-b border-blue-500 outline-none text-white" // Mengatur warna teks menjadi putih
        style={{
          borderBottomWidth: "2px",
          backgroundColor: "transparent" // Mengatur latar belakang menjadi transparan
        }}
      />
      <button
        onClick={handleSearch}
        className="bg-transparent border-none text-blue-500 hover:text-blue-600 p-2 rounded cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-8"
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
    </div>
  );
};

export default SearchBar;
