"use client";
import React, { useEffect, useState } from "react";
import CardMovie from "@/components/Cardmovies";
import SearchBar from "@/components/Search";
import UpcomingMoviesCarousel from "@/components/UpcomingCarousel";
import { getMoviesList, searchMovies } from "@/components/API";
import SearchResult from "@/components/SearchResult";
import MovieDetailModal from "@/components/MovieDetail";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getMoviesList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const handleSearch = async (query: string) => {
    if (query === "") {
      setFilteredMovies([]);
      setSearchQuery(""); // Reset query pencarian
    } else {
      const searchedMovies = await searchMovies(query);
      setFilteredMovies(searchedMovies);
      setSearchQuery(query); 
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

  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedMovie(null);
    setShowDetailModal(false);
  };

  return (
    <div className="text-center">
      <nav
        className={`fixed top-0 w-full p-4 z-10 ${
          scrolled ? "bg-gradient-to-b from-gray-400 " : ""
        } flex justify-between transition-all duration-300`}
      >
        <h1
          className="text-white text-2xl font-semibold cursor-pointer"
          onClick={() => {
            setFilteredMovies([]); 
            setSearchQuery(""); 
          }}
        >
          YooMovies
        </h1>
        <SearchBar onSearch={handleSearch} />
      </nav>
      <div className={`pt-${scrolled ? "16" : "0"}`}>
        {searchQuery && <SearchResult query={searchQuery} movies={filteredMovies} />}
        {!searchQuery && (
          <>
            <UpcomingMoviesCarousel />
            <div className="flex flex-wrap">
              {popularMovies.map((movie, i) => (
                <CardMovie
                  key={i}
                  movie={movie}
                  onClick={() => handleCardClick(movie)} 
                />
              ))}
            </div>
          </>
        )}
      </div>
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={handleCloseDetailModal}
          isOpen={showDetailModal}
        />
      )}
    </div>
  );
};

export default Home;

interface Movie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  id: number;
}
