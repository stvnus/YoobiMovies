import React, { useState } from "react";
import CardMovie from "@/components/Cardmovies";
import DetailMovie from "@/components/MovieDetail";

interface SearchResultProps {
  query: string;
  movies: Movie[];
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
    setShowDetailModal(false); // Sembunyikan modal MovieDetail
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
          <CardMovie
            key={i}
            movie={movie}
            onClick={() => openDetailModal(movie)} // Panggil fungsi saat kartu diklik
          />
        ))}
      </div>

      {selectedMovie && (
        <DetailMovie
          movie={selectedMovie}
          onClose={closeDetailModal}
          isOpen={showDetailModal} // Menggunakan showDetailModal sebagai kondisi
        />
      )}
    </div>
  );
};

export default SearchResult;
