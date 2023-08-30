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
        <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black bg-opacity-75 text-white rounded-b-lg">
          <div className="font-semibold">{movie.title}</div>
          <div>{movie.release_date}</div>
          <div>Rating: {movie.vote_average}</div>
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
