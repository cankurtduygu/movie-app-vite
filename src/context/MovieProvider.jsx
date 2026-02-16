import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth/cordova';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth } from '../auth/firebase';
import { toast } from "react-toastify";


export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const searchMovies = async (query) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setMovies(res.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const addFavorite = (movie) => {
  if (!user) {
    toast.info("Please login to add favorites");
    return;
  }

  const isExist = favorites.find((item) => item.id === movie.id);

  if (isExist) {
    // çıkar
    setFavorites(favorites.filter((item) => item.id !== movie.id));
  } else {
    // ekle
    setFavorites([...favorites, movie]);
  }
};


  return (
    <div>
      <MovieContext.Provider value={{ movies, setMovies, searchMovies, user, addFavorite, favorites  }}>
        {children}
      </MovieContext.Provider>
    </div>
  );
};

export default MovieProvider;
