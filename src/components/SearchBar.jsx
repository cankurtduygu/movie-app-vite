import React, { useContext, useState } from 'react';
import { MovieContext } from '../context/MovieProvider';

const SearchBar = () => {
  const { searchMovies } = useContext(MovieContext);

  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    searchMovies(query.trim());
    setQuery('');
  };

  return (
    <div className="flex md:items-center py-8 md:justify-center px-4">
      <form
        action=""
        className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-4xl backdrop-blur-sm bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20"
        onSubmit={handleSubmit}
      >
        {/* Search Input */}
        <div className="relative flex-1 w-full sm:w-auto">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Category Select */}
        <div className="relative w-full sm:w-auto">
          <select
            name=""
            id=""
            className="w-full sm:w-48 px-4 py-3 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 text-gray-700 shadow-lg appearance-none cursor-pointer"
          >
            <option value="Seafood">Action</option>
            <option value="chicken">Comedy</option>
            <option value="Beef">Drama</option>
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-green-700 to-green-500 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
