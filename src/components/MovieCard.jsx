import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieProvider';

const MovieCard = ({ movie }) => {
  // console.log(movie);

  return (
    
      <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:scale-105">
        <div className="relative">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
            alt=""
            className="w-full h-full object-cover group-hover:scale-100 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
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
