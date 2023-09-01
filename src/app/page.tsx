"use client"
import React, { useEffect, useState } from "react";
import CardMovie from "@/components/Cardmovies";
import SearchBar from "@/components/Search";
import UpcomingMoviesCarousel from "@/components/UpcomingCarousel"
import { getMoviesList, searchMovies} from "@/components/API"; 


const Home = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="text-center">
<nav
        className={`fixed top-0 w-full p-4 z-10 ${
          scrolled ? "bg-gradient-to-b from-gray-400 " : ""
        } flex justify-between transition-all duration-300`}
      >
        <h1 className="text-white text-2xl font-semibold">YooMovies</h1>
        <SearchBar onSearch={handleSearch} />
      </nav>
      <div className={`pt-${scrolled ? "16" : "0"}`}>
        <UpcomingMoviesCarousel />
        <div className="flex flex-wrap">
          {filteredMovies.map((movie, i) => (
            <CardMovie key={i} movie={movie} />
          ))}
        </div>
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