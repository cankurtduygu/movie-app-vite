import React, { useContext } from 'react'
import MovieCard from '../components/MovieCard'
import { MovieContext } from '../context/MovieProvider'
import SearchBar from '../components/SearchBar';

const Home = () => {


  const { movies } = useContext(MovieContext); 

  // console.log(movies.length)


  return (
    <div>
    <SearchBar />
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
      {movies.map((movie)=><MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Home