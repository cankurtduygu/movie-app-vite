import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthProvider';

const MovieCard = ({ movie }) => {
  const { addFavorite, favorites } = useContext(MovieContext);

  const { user } = useContext(AuthContext); 

  const isFavorite = favorites.some((item) => item.id === movie.id);

  const navigation = useNavigate();

  return (
    <div
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:scale-100 cursor-pointer"
      onClick={
        user
          ? () => navigation(`/movie/${movie.id}`, { state: { movie } })
          : () => toast.error('Please log in to see details')
      }
    >
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation(); // kartın onClick’ine gitmesin
            addFavorite(movie);
          }}
          className="absolute top-3 right-3 w-10 h-10 z-20 rounded-full bg-white/250 backdrop-blur-md shadow-lg flex items-center justify-center"
          aria-label="Add to favorites"
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.515a4 4 0 010-5.656z" />
          </svg>
        </button>

        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-100 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </div>
      <div className="p-3">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
