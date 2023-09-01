import React, { useEffect, useState } from "react";
import { getUpcomingMovies } from "@/components/API"; 
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";



const UpcomingMoviesCarousel: React.FC = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getUpcomingMovies().then((result) => {
      setUpcomingMovies(result);
    });
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-lg font-semibold mb-1">Upcoming Movies</h2>
      <Carousel showStatus={false} showThumbs={false} className=" mx-auto ">
    {upcomingMovies.map((movie, i) => (
      <div key={i} className="flex items-center justify-center">
        
        <img
          src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
          alt={movie.title}
          className="h-[60rem] rounded-lg"
        />
      </div>
    ))}
  </Carousel>
    </div>
  );
};

export default UpcomingMoviesCarousel;

interface Movie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}
