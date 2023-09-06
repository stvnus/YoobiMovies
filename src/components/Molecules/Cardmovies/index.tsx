import React from "react";

interface Movie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface CardMovieProps {
  movie: Movie;
  onClick?: () => void;
}

const CardMovie: React.FC<CardMovieProps> = ({ movie, onClick }) => {
  return (
    <div
      className="group w-1/3 p-3 md:w-1/4 lg:w-1/5  transition-transform transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black bg-opacity-75 text-white rounded-b-lg">
          <div className="font-semibold lg:text-xl text-sm">{movie.title}</div>
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
