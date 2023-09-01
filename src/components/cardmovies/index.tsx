import React from "react";

interface Movie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface CardMovieProps {
  movie: Movie;
}

const CardMovie: React.FC<CardMovieProps> = ({ movie }) => {
  return (
    <div className="group w-1/5 p-4 transition-transform transform hover:scale-105">
      <div className="relative">
        <img
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black bg-opacity-75 text-white rounded-b-lg">
          <div className="font-semibold">{movie.title}</div>
        </div>
      </div>
      <div className="bg-black bg-opacity-75 text-white rounded-b-lg p-2">
        <div className="text-sm">{movie.release_date}</div>
        <div className="text-sm">Rating: {movie.vote_average}</div>
      </div>
    </div>
  );
};

export default CardMovie;
