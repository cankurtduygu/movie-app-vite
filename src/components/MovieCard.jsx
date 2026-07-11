import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieKontext } from '../context/MovieContext';
import { AuthKontext } from '../context/AuthContext';

const MovieCard = ({ movie }) => {
  const { addFavorite, favorites } = useContext(MovieKontext);
  const { currentUser } = useContext(AuthKontext);

  const isFavorite = currentUser
    ? favorites.some((item) => Number(item.id) === Number(movie.id))
    : false;

  const navigation = useNavigate();

  return (
    <div
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:scale-100 cursor-pointer"
      onClick={
        currentUser
          ? () => navigation(`/movie/${movie.id}`)
          : () =>
              navigation('/login', {
                state: { from: `/movie/${movie.id}` },
              })
      }
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addFavorite(movie);
          }}
          className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 z-20 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.515a4 4 0 010-5.656z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>

        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </div>
      <div className="p-3">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
          {movie.overview || 'No overview available'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
