import React, { useContext } from 'react';
import MovieCard from '../components/MovieCard';
import { MovieKontext } from '../context/MovieContext';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const { movies, loading } = useContext(MovieKontext);

  return (
    <div className="pb-10">
      <SearchBar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div
              className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full"
              role="status"
              aria-label="Loading movies"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
