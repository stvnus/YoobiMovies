"use client"
import React, { useEffect, useState } from "react";
import { getMoviesList, searchMovies } from "@/components/API/index";
import CardMovie from "@/components/Cardmovies";
import SearchBar from "@/components/Search";
import Carousel from "@/components/Carousel";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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

  const handleCarouselSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold my-4">Yoobi Movies</h1>
      <div className="flex justify-end">
        <SearchBar onSearch={handleSearch} />
      </div>
      <Carousel onSelect={handleCarouselSelect} />
      {selectedMovie && (
        <div className="my-4">
          <h2 className="text-xl font-semibold mb-2">Selected Movie</h2>
          <CardMovie movie={selectedMovie} />
        </div>
      )}
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