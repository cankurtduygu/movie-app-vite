import React, { useContext } from 'react'
import MovieCard from '../components/MovieCard'
import { MovieContext } from '../context/MovieProvider'

const Home = () => {


  const { movies } = useContext(MovieContext); 

  // console.log(movies.length)


  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {movies.map((movie)=><MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Home