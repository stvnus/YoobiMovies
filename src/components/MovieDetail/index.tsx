import React, { useEffect, useState } from "react";
import { getMovieDetails } from "@/components/API"; // Import fungsi getMovieDetails
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_TMDB_APIKEY;
const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASEURL;

interface DetailMovieProps {
  movie: Movie;
  onClose: () => void;
  isOpen: boolean;
}

const DetailMovie: React.FC<DetailMovieProps> = ({ movie, onClose, isOpen }) => {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  useEffect(() => {
    // Buat fungsi untuk mengambil informasi detail film dari API TMDB berdasarkan ID film
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movie.id.toString());

        if (data) {
          setMovieDetails(data);
          fetchMovieTrailer(); // Panggil fungsi untuk mengambil trailer setelah mendapatkan detail film
        } else {
          // Handle error jika data kosong atau request gagal
          console.error("Failed to fetch movie details");
        }
      } catch (error) {
        console.error("An error occurred while fetching movie details:", error);
      }
    };

    if (isOpen) {
      // Panggil fungsi fetchMovieDetails saat modal dibuka
      fetchMovieDetails();
    }
  }, [isOpen, movie.id]);

  const fetchMovieTrailer = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
      );

      if (response.data.results.length > 0) {
        // Ambil URL trailer pertama (atau yang tersedia)
        const trailerKey = response.data.results[0].key;
        const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
        setTrailerUrl(trailerUrl);

        // Otomatis putar trailer saat URL trailer tersedia
        setIsTrailerPlaying(true);
      }
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };

  return (
<div className={`fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-75 ${isOpen ? "" : "hidden"}`}>
  <div className="bg-white w-full lg:w-4/5 p-4 rounded-lg relative flex flex-col">
    <button
      className="absolute top-4 right-4 bg-transparent border-none text-gray-500 hover:text-gray-700"
      onClick={() => {
        setIsTrailerPlaying(false); // Halt playback when closing the modal
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
    <h2 className="text-2xl font-semibold text-center mb-4">{movieDetails?.title}</h2>

    {movieDetails && (
      <div className="flex">
        <img
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="rounded-lg max-h-96 w-auto"
        />
        <div className="ml-4 w-full lg:w-3/4"> {/* Menggunakan w-full dan w-1/2 untuk ukuran trailer */}
          {isTrailerPlaying && (
           <div className="mt-1 aspect-w-16 aspect-h-12 lg:aspect-w-16 lg:aspect-h-12 "> {/* Menyesuaikan aspek rasio untuk trailer */}
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
    )}

    <p className="text-base mt-2">
      <strong>Release Date:</strong> {movieDetails?.release_date}
    </p>
    <p className="text-base mt-2">
      <strong>Rating:</strong> {movieDetails?.vote_average}
    </p>
    <p className="text-base mt-4">{movieDetails?.overview}</p>
  </div>
</div>
  );
};

export default DetailMovie;
