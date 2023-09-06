"use client"
import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/components/Service/API";
import CardMovie from "@/components/Molecules/Cardmovies";
import Navbar from "@/components/Molecules/Navbar";
import MovieDetailModal from "@/components/Organism/MovieDetail";
import Footer from "@/components/Atoms/Footer";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genres: { name: string }[];
    overview: string; 
  }
const TopRatedPage: React.FC = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]); 
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
    useEffect(() => {
      const fetchTopRatedMovies = async () => {
        try {
          const movies = await getTopRatedMovies();
          setTopRatedMovies(movies);
        } catch (error) {
          console.error("Error fetching top-rated movies:", error);
        }
      };
  
      fetchTopRatedMovies();
    }, []);
  
    const handleCardClick = (movie: Movie) => {
      setSelectedMovie(movie);
      setShowDetailModal(true);
    };
  

  return (
    <div>
      <Navbar
        scrolled={false} 
        onLogoClick={() => {}}
        onSearch={() => {}}
      />
      <h1 className=" mt-20 text-white text-1xl lg:text-2xl font-bold text-center">15 top rated movies of the year based on the TMDB movie platform</h1>
      <div className="flex-wrap flex">
        {topRatedMovies.map((movie) => (
          <CardMovie
            key={movie.id}
            movie={movie}
            onClick={() => handleCardClick(movie)}
          />
        ))}
      </div>
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => {
            setSelectedMovie(null);
            setShowDetailModal(false);
          }}
          isOpen={showDetailModal}
        />
      )}
      <Footer />
    </div>
  );
};

export default TopRatedPage;
