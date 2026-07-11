import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { AuthKontext } from './AuthContext';
import { auth, db } from '../auth/firebase';
import { toastError, toastSuccess, toastWarn } from '../helpers/ToastNotify';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';

export const MovieKontext = createContext();

const MovieContext = ({ children }) => {
  const { currentUser } = useContext(AuthKontext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const getMovies = (URL) => {
    setLoading(true);
    axios
      .get(URL)
      .then((res) => setMovies(res.data.results))
      .catch((error) => console.error('Error fetching movies:', error))
      .finally(() => setLoading(false));
  };

  const loadPopularMovies = () => {
    getMovies(
      `${TMDB_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`
    );
  };

  const filterByGenre = (genreId) => {
    if (!genreId) {
      loadPopularMovies();
      return;
    }

    getMovies(
      `${TMDB_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&sort_by=popularity.desc`
    );
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!currentUser?.uid) {
        setFavorites([]);
        return;
      }

      try {
        const favRef = collection(db, 'users', currentUser.uid, 'favorites');
        const snap = await getDocs(favRef);
        setFavorites(snap.docs.map((doc) => doc.data()));
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [currentUser]);

  const searchMovies = async (query) => {
    if (!query.trim()) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `${TMDB_BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
      );
      setMovies(res.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (movie) => {
    const uid = auth.currentUser?.uid || currentUser?.uid;

    if (!uid) {
      toastWarn('Please login to add favorites');
      return;
    }

    if (!movie?.id) {
      toastError('Invalid movie data');
      return;
    }

    const favRef = doc(db, 'users', uid, 'favorites', String(movie.id));
    const isFavorite = favorites.some(
      (item) => Number(item.id) === Number(movie.id)
    );

    try {
      if (isFavorite) {
        await deleteDoc(favRef);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(movie.id))
        );
        toastSuccess('Removed from favorites');
      } else {
        const favoriteData = {
          id: movie.id,
          title: movie.title ?? '',
          poster_path: movie.poster_path ?? null,
          overview: movie.overview ?? '',
        };
        await setDoc(favRef, favoriteData);
        setFavorites((prev) => [...prev, favoriteData]);
        toastSuccess('Added to favorites');
      }
    } catch (err) {
      console.error('Favorite error:', err);

      if (err.code === 'permission-denied') {
        toastError(
          'Firestore izni yok. Firebase Console > Firestore > Rules bölümünden kuralları yayınlayın.'
        );
        return;
      }

      toastError(err.message || 'Failed to update favorites');
    }
  };

  return (
    <MovieKontext.Provider
      value={{
        movies,
        loading,
        favorites,
        searchMovies,
        filterByGenre,
        loadPopularMovies,
        addFavorite,
      }}
    >
      {children}
    </MovieKontext.Provider>
  );
};

export default MovieContext;
