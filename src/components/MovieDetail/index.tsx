import React, { useEffect, useState } from "react";
import { getMovieDetails } from "@/components/API";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_TMDB_APIKEY;
const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASEURL;

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

interface DetailMovieProps {
  movie: Movie;
  onClose: () => void;
  isOpen: boolean;
}

const DetailMovie: React.FC<DetailMovieProps> = ({ movie, onClose, isOpen }) => {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [cast, setCast] = useState<Actor[]>([]);
  
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movie.id.toString());
  
        if (data) {
          setMovieDetails(data);
          fetchMovieTrailer();
          fetchMovieCast();
       
          setCategory(data.genres.map((genre) => genre.name).join(", ")); // Ambil category dari data film
        } else {
          console.error("Failed to fetch movie details");
        }
      } catch (error) {
        console.error("An error occurred while fetching movie details:", error);
      }
    };
  
    if (isOpen) {
      fetchMovieDetails();
    }
  }, [isOpen, movie.id]);
  

  const fetchMovieTrailer = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
      );

      if (response.data.results.length > 0) {
        const trailerKey = response.data.results[0].key;
        const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
        setTrailerUrl(trailerUrl);
        setIsTrailerPlaying(true);
      }
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };

  const fetchMovieCast = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/movie/${movie.id}/credits?api_key=${apiKey}`
      );

      if (response.data.cast.length > 0) {
        const castList = response.data.cast.slice(0, 5);
        setCast(castList);
      }
    } catch (error) {
      console.error("Error fetching movie cast:", error);
    }
  };

  return (
    <div className={`fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-75 ${isOpen ? "" : "hidden"}`}>
      <div className="bg-white w-full lg:w-3/5 p-4 rounded-lg relative flex flex-col">
        <button
          className="absolute top-4 right-4 bg-transparent border-none text-gray-500 hover:text-gray-700"
          onClick={() => {
            setIsTrailerPlaying(false);
            onClose();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-center mb-2">{movieDetails?.title} ({new Date().getFullYear()})</h2>

        {movieDetails && (
          <div className="flex">
            <img
              src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="rounded-lg max-h-96 w-1/5"
            />
            <div className="ml-4 w-full lg:w-3/4"> 
              <div className="flex justify-between">
              <div>
              <p className="text-base mt-2">
    {category && (
      <span>
        <strong>Category:</strong> {category}
      </span>
    )}
  </p>
</div>
<div>
<strong>
  <p className="text-base mt-2 flex items-center">
   
    <span className="flex items-center ml-2">
    <svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-5 w-5 text-yellow-400"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <polygon
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    points="12 2 15.09 8.26 22 9.27 17 14.45 18.18 21.02 12 17.77 5.82 21.02 7 14.45 2 9.27 8.91 8.26 12 2"
  />
</svg>

    </span>
    <span className="ml-1">{movieDetails?.vote_average.toFixed(1)}/10</span>
  </p>
  </strong> 
</div>

               
              </div>
              <div>
                
              </div>
          
              <p className="text-base mt-4 text-left overflow-hidden" style={{ maxHeight: '9.8rem', lineHeight: '1.4em' }}>
  {movieDetails?.overview}
</p>
              {cast.length > 0 && (
 <div className="mt-4">
 <h3 className="text-md font-semibold mb-1 text-left">Cast:</h3>
 <div className="flex flex-wrap gap-3 justify-center">
   {cast.map((actor) => (
     <div key={actor.id} className="flex flex-col items-center">
       <img
         src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${actor.profile_path}`}
         alt={actor.name}
         className="w-12 h-12 rounded-full object-cover"
       />
       <p className="text-center mt-1 text-sm">{actor.name}</p>
     </div>
   ))}
 </div>
</div>
              )}
            </div>
          </div>
        )}
        {isTrailerPlaying && (
          <div className="mt-1 aspect-w-16 aspect-h-12 lg:aspect-w-16 lg:aspect-h-12 ">
            <iframe
              width="100%"
              height="100%"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
              className="h-[15rem]"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailMovie;
