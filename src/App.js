import React, {useEffect, useState} from 'react'
import './App.css'
import MovieCard from './MovieCard'
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=78c28bb3'

const movie = {
  Poster : "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
  Title : "Avengers: Infinity War",
  Type : "movie",
  Year : "2018",
  imdbID : "tt4154756"
}

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('Avengers')
  },[])

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input
          type='text'
          placeholder='Search for a movie...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>


      {
        movies?.length > 0 
        ? (
        <div className='container'> 
        {
          movies?.map((movie) => (
            <MovieCard  movie={movie} />
          ))
          }
      </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )
    }
    </div>
  )
}

export default App