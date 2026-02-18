import React, { useContext } from 'react'
import MovieCard from '../components/MovieCard'
import { MovieContext } from '../context/MovieProvider'
import SearchBar from '../components/SearchBar';

const Home = () => {


  const { movies, loading } = useContext(MovieContext); 

  // console.log(movies.length)


  return (
    <div>
    <SearchBar />
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
      {loading ? (
       <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className='visually-hidden'>Yükleniyor...</span>
          </div>
      ) : (
        movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
      )}
    </div>
  </div>
)
}

export default Home