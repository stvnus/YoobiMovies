
import React, { useState } from "react";
import CardMovie from "@/components/Molecules/Cardmovies";
import DetailMovie from "@/components/Organism/MovieDetail";

interface SearchResultProps {
  query: string;
  movies: Movie[];
}

interface Movie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  id: number;
  genres: { name: string }[];
  overview: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ query, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const openDetailModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedMovie(null);
    setShowDetailModal(false);
  };

  return (
    <div className="text-center">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold text-white mt-20 ml-10">
          Search Results for {query}
        </h1>
      </div>
      <div className="flex flex-wrap">
        {movies.map((movie, i) => (
          <CardMovie key={i} movie={movie} onClick={() => openDetailModal(movie)} />
        ))}
      </div>

      {selectedMovie && (
        <DetailMovie
          movie={selectedMovie}
          onClose={closeDetailModal}
          isOpen={showDetailModal}
        />
      )}
    </div>
  );
};

export default SearchResult;
