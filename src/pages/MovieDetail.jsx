import React from 'react'
import { useLocation } from 'react-router-dom'

const MovieDetail = () => {


    const { state: { movie }} = useLocation();
    console.log(movie)


  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'>
      {/* Hero Background */}
      <div className='relative h-56 md:h-80 overflow-hidden'>
        <div 
          className='absolute inset-0 bg-cover bg-center blur-md opacity-30'
          style={{
            backgroundImage: `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : 'https://via.placeholder.com/1920x1080?text=Movie'})`
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent' />
      </div>

      {/* Content Section */}
      <section className='relative container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 mb-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
          
          {/* Poster Image */}
          <div className='col-span-1 flex justify-center md:justify-start'>
            <div className='rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 w-full max-w-sm md:max-w-none'>
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} 
                alt={movie.title}
                className='w-full h-auto object-cover'
              />
            </div>
          </div>

          {/* Movie Details */}
          <div className='col-span-1 md:col-span-2 lg:col-span-3 text-white'>
            {/* Title and Rating */}
            <div className='mb-6'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-white drop-shadow-lg'>
                {movie.title}
              </h1>
              <div className='flex flex-wrap items-center gap-4 mb-4'>
                <div className='flex items-center gap-2 bg-amber-500/20 backdrop-blur px-4 py-2 rounded-full border border-amber-400/30'>
                  <span className='text-2xl'>⭐</span>
                  <span className='text-lg font-semibold text-amber-300'>{movie.vote_average?.toFixed(1)}/10</span>
                </div>
                <div className='text-gray-400'>
                  <span className='text-sm'>📅 {new Date(movie.release_date).getFullYear()}</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className='mb-8 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6'>
              <h2 className='text-2xl md:text-3xl font-bold text-red-500 mb-4 flex items-center gap-2'>
                <span className='text-3xl'>📝</span>
                Overview
              </h2>
              <p className='text-gray-200 text-base md:text-lg leading-relaxed line-clamp-6'>
                {movie.overview || 'No overview available'}
              </p>
            </div>

            {/* Additional Info Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              <div className='bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4 hover:border-red-500/50 transition-colors'>
                <p className='text-gray-400 text-sm mb-2'>🎬 Original Title</p>
                <p className='text-white font-semibold text-sm md:text-base line-clamp-2'>{movie.original_title}</p>
              </div>
              
              <div className='bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4 hover:border-red-500/50 transition-colors'>
                <p className='text-gray-400 text-sm mb-2'>🗳️ Votes</p>
                <p className='text-white font-semibold text-sm md:text-base'>{movie.vote_count?.toLocaleString()}</p>
              </div>
              
              <div className='bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4 hover:border-red-500/50 transition-colors'>
                <p className='text-gray-400 text-sm mb-2'>💰 Popularity</p>
                <p className='text-white font-semibold text-sm md:text-base'>{movie.popularity?.toFixed(0)}</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default MovieDetail