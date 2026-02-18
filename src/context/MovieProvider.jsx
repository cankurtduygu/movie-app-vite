import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { AuthContext } from './AuthProvider';
import { db } from '../auth/firebase';

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState([]);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        return;
      }

      try {
        const favRef = collection(db, 'users', user.uid, 'favorites');
        const snap = await getDocs(favRef);
        const favList = snap.docs.map((doc) => doc.data());
        setFavorites(favList);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [user]);

  const addFavorite = async (movie) => {
    if (!user) {
      toast.info('Please login to add favorites');
      return;
    }

    const favRef = doc(db, 'users', user.uid, 'favorites', movie.id.toString());

    const isFavorite = favorites.some((item) => item.id === movie.id);

    try {
      if (isFavorite) {
        await deleteDoc(favRef);
        setFavorites((prev) => prev.filter((item) => item.id !== movie.id));
      } else {
        await setDoc(favRef, {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        });

        setFavorites((prev) => [
          ...prev,
          {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
          },
        ]);
      }
    } catch (err) {
      console.error('Favorite error:', err);
    }
  };

  // console.log(favorites);



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

  return (
    <div>
      <MovieContext.Provider
        value={{
          movies,
          setMovies,
          searchMovies,
          addFavorite,
          favorites,
          loading,
        }}
      >
        {children}
      </MovieContext.Provider>
    </div>
  );
};

export default MovieProvider;
