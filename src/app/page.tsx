"use client"
import React, { useEffect, useState } from "react";
import CardMovie from "@/components/Molecules/Cardmovies";
import UpcomingMoviesCarousel from "@/components/Organism/UpcomingCarousel";
import { getMoviesList, searchMovies } from "@/components/Service/API";
import SearchResult from "@/components/Organism/SearchResult";
import MovieDetailModal from "@/components/Organism/MovieDetail";
import Navbar from "@/components/Molecules/Navbar";

interface Movie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  id: number;
  genres: { name: string }[];
  overview: string;
}

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
      setSearchQuery("");
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
      <Navbar
        scrolled={scrolled}
        onLogoClick={() => {
          setFilteredMovies([]);
          setSearchQuery("");
        }}
        onSearch={handleSearch}
      />
   
      <div className={`pt-${scrolled ? "16" : "0"}`}>
        
        {searchQuery && <SearchResult query={searchQuery} movies={filteredMovies} />}
        {!searchQuery && (
          <>
          
            <UpcomingMoviesCarousel />
            <h1 className="text-white text-xl lg:text-4xl font-bold">Popular Now</h1>

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
