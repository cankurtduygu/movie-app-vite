import { useContext, useState } from 'react';
import { MovieKontext } from '../context/MovieContext';

const GENRES = [
  { id: '', label: 'All categories' },
  { id: '28', label: 'Action' },
  { id: '35', label: 'Comedy' },
  { id: '18', label: 'Drama' },
  { id: '27', label: 'Horror' },
  { id: '10749', label: 'Romance' },
  { id: '878', label: 'Sci-Fi' },
];

const SearchBar = () => {
  const { searchMovies, filterByGenre } = useContext(MovieKontext);

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setGenre(genreId);
    setQuery('');
    filterByGenre(genreId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    searchMovies(query.trim());
    setGenre('');
  };

  return (
    <div className="flex justify-center py-6 sm:py-8 px-4 sm:px-6">
      <form
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full max-w-4xl backdrop-blur-sm bg-white/10 p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/20"
        onSubmit={handleSubmit}
      >
        {/* Search Input */}
        <div className="relative flex-1 min-w-0 w-full">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
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
            className="w-full min-w-0 pl-12 pr-4 py-3 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Category Select */}
        <div className="relative w-full sm:w-48 shrink-0">
          <select
            name="genre"
            id="genre"
            value={genre}
            onChange={handleGenreChange}
            className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 text-gray-700 shadow-lg appearance-none cursor-pointer"
          >
            {GENRES.map(({ id, label }) => (
              <option key={id || 'all'} value={id}>
                {label}
              </option>
            ))}
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
          className="w-full sm:w-auto shrink-0 px-8 py-3 bg-linear-to-r from-green-700 to-green-500 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl sm:hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
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
