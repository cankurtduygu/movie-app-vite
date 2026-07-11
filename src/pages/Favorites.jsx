import { useContext } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { MovieKontext } from '../context/MovieContext';

const Favorites = () => {
  const { favorites } = useContext(MovieKontext);

  return (
    <div className="pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="py-8 sm:py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            My Favorites
          </h1>
          <p className="text-gray-600 mt-2">
            Movies you have saved to your list
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center gap-4">
            <p className="text-lg text-gray-600">No favorites yet.</p>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl font-semibold text-white bg-linear-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 transition"
            >
              Browse movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
