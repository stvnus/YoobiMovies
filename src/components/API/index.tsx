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
