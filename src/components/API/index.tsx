import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_TMDB_APIKEY;
const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASEURL;

export const getMoviesList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    return response.data.results; 
  } catch (error) {
    console.error("Error fetching movie list:", error);
    return []; 
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const getTrendingMoviesWeek = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/trending/movie/week?api_key=${apiKey}`
    );
    return response.data.results.slice(0, 5); // Ambil 5 film pertama
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};