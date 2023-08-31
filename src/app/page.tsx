"use client"
import React, { useEffect, useState } from "react";
import { getMoviesList, searchMovies } from "@/components/API/index";
import CardMovie from "@/components/cardmovies";
import SearchBar from "@/components/Search";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMoviesList().then((result) => {
      setPopularMovies(result);
      setFilteredMovies(result);
    });
  }, []);

  const handleSearch = async (query: string) => {
    if (query === "") {
      setFilteredMovies(popularMovies);
    } else {
      const searchedMovies = await searchMovies(query);
      setFilteredMovies(searchedMovies);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold my-4">Yoobi Movies</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap">
        {filteredMovies.map((movie, i) => (
          <CardMovie key={i} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;

interface Movie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}