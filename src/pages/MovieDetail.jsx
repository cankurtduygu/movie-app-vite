import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(data);
      } catch (err) {
        setError('Movie not found or failed to load.');
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div
          className="animate-spin inline-block w-10 h-10 border-4 rounded-full border-emerald-500 border-t-transparent"
          role="status"
        />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center gap-4 text-white px-4">
        <p className="text-lg">{error || 'Movie not found.'}</p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl font-semibold text-white bg-linear-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '—';

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Background */}
      <div className="relative h-56 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-md opacity-30"
          style={{
            backgroundImage: `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : 'https://via.placeholder.com/1920x1080?text=Movie'})`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      {/* Content Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-32 md:-mt-40 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Poster Image */}
          <div className="col-span-1 flex justify-center md:justify-start">
            <div className="rounded-xl shadow-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-[280px] sm:max-w-xs md:max-w-none mx-auto md:mx-0">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image'
                }
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Movie Details */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-white">
            {/* Title and Rating */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-white drop-shadow-lg break-words">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 bg-amber-500/20 backdrop-blur px-4 py-2 rounded-full border border-amber-400/30">
                  <span className="text-2xl">⭐</span>
                  <span className="text-lg font-semibold text-amber-300">
                    {movie.vote_average?.toFixed(1)}/10
                  </span>
                </div>
                <div className="text-gray-400">
                  <span className="text-sm">📅 {releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4 flex items-center gap-2">
                <span className="text-3xl">📝</span>
                Overview
              </h2>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed line-clamp-6">
                {movie.overview || 'No overview available'}
              </p>
            </div>

            {/* Additional Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4 hover:border-red-500/50 transition-colors">
                <p className="text-gray-400 text-sm mb-2">🎬 Original Title</p>
                <p className="text-white font-semibold text-sm md:text-base line-clamp-2">
                  {movie.original_title}
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4 hover:border-red-500/50 transition-colors">
                <p className="text-gray-400 text-sm mb-2">🗳️ Votes</p>
                <p className="text-white font-semibold text-sm md:text-base">
                  {movie.vote_count?.toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4 hover:border-red-500/50 transition-colors">
                <p className="text-gray-400 text-sm mb-2">💰 Popularity</p>
                <p className="text-white font-semibold text-sm md:text-base">
                  {movie.popularity?.toFixed(0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;
