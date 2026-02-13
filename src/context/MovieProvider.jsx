import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const MovieContext = createContext();

const MovieProvider = ( {children} ) => {

    const [movies, setMovies] = useState([]);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;


    useEffect(() => {

      const fetchMovies = async () => {
        try {
          const response = await
            axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
          setMovies(response.data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }

      };

      fetchMovies();

    }, [])
    


    


  return (
    <div>
        <MovieContext.Provider value={{movies, setMovies}}>{children}</MovieContext.Provider>
    </div>
  )
}

export default MovieProvider