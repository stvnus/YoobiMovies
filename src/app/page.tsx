"use client"
import React, { useEffect, useState } from "react";
import { getMoviesList } from "@/components/API/index";
import CardMovie from "@/components/cardmovies";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMoviesList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold my-4">Yoobi Movies</h1>
      <div className="flex flex-wrap">
        {popularMovies.map((movie, i) => (
          <CardMovie key={i} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
