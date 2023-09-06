import React, { useEffect, useState } from "react";
import { getUpcomingMovies, getMovieGenres } from "@/components/Service/API";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const UpcomingMoviesCarousel: React.FC = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
  
    getMovieGenres().then((genreResult) => {
      setGenres(genreResult);
    });

  
    getUpcomingMovies().then((result) => {
      setUpcomingMovies(result);
    });
  }, []);

  
  const getGenreNames = (genreIds: number[]) => {
    const genreNames: string[] = [];
    genreIds.forEach((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      if (genre) {
        genreNames.push(genre.name);
      }
    });
    return genreNames;
  };

  return (
    <div className="my-16">
      <Carousel
        showStatus={false}
        showThumbs={false}
        className="mx-auto"
        autoPlay={true}
        interval={2000}
        infiniteLoop={true}
      >
        {upcomingMovies.map((movie, i) => (
          <div key={i} className="flex flex-col items-center justify-center relative">
  <img
    src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
    alt={movie.title}
    className="h-[60rem] rounded-lg"
  />
  <h1
    className="text-3xl font-bold mt-2 text-center text-white absolute left-20 bg-black bg-opacity-50 rounded"
  >
    {movie.title}
  </h1>
  <div className="bg-blue-500 text-white text-center mt-20 absolute left-20 px-10 rounded-full">
    {getGenreNames(movie.genre_ids).map((genre, index) => (
      <span key={index} className="mr-2">
        {genre}
      </span>
    ))}
  </div>
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
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}
