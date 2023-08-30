import axios from "axios";

const apiKey = "b56bb07d6fcadcd0853ff38279104e93";
const baseUrl = "https://api.themoviedb.org/3";

export const getMoviesList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    return response.data.results; // Menggunakan "results" bukan "result"
  } catch (error) {
    console.error("Error fetching movie list:", error);
    return []; 
  }
};
