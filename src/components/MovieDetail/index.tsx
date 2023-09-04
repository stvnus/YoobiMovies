// src/components/DetailMovie.tsx

import React from "react";

interface DetailMovieProps {
  movie: Movie; 
  onClose: () => void; 
  isOpen: boolean;
}

const DetailMovie: React.FC<DetailMovieProps> = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-75">
      <div className="bg-white w-3/4 p-4 rounded-lg h-[40rem] relative">
   
        <button
          className="absolute top-4 right-4 bg-transparent border-none text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Tampilkan informasi detail movie di sini */}
        <h2 className="text-2xl font-semibold">{movie.title}</h2>
        <img
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg max-h-96"
        />


      </div>
    </div>
  );
};

export default DetailMovie;
