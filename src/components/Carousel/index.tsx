import React, { useState, useRef } from "react";
import { getTrendingMoviesWeek } from "@/components/API";

interface CarouselProps {
  onSelect: (movie: Movie) => void;
}

const Carousel: React.FC<CarouselProps> = ({ onSelect }) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    getTrendingMoviesWeek().then((result) => {
      setTrendingMovies(result);
    });
  }, []);

  const handleSelect = (movie: Movie) => {
    onSelect(movie);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? trendingMovies.length - 1 : prevIndex - 1
    );
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === trendingMovies.length - 1 ? 0 : prevIndex + 1
    );
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden mb-4">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {trendingMovies.map((movie, i) => (
          <div
            key={i}
            className="w-full bg-gray-300 rounded-lg overflow-hidden flex flex-col items-center cursor-pointer"
            onClick={() => handleSelect(movie)}
          >
            <img
              src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
              className="object-cover w-full h-44"
            />
            <p className="mt-2 text-center text-sm font-semibold">{movie.title}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-black bg-opacity-50 text-white rounded-full"
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-black bg-opacity-50 text-white rounded-full"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;

interface Movie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}