import React from "react";
import CardMovie from "@/components/Cardmovies";

interface SearchResultProps {
  query: string;
  movies: Movie[];
}

const SearchResult: React.FC<SearchResultProps> = ({ query, movies }) => {
  return (
    <div className="text-center">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold text-white mt-20 ml-10">Search Results for "{query}"</h1>
      </div>
      <div className="flex flex-wrap">
        {movies.map((movie, i) => (
          <CardMovie key={i} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
