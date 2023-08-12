import { useEffect, useState } from 'react';

import IconSearch from './search.svg'
import './App.css'
import MovieTemplate from './MovieTemplate';

// API key : bb88aa90

const ApiUrl = 'http://www.omdbapi.com?apikey=bb88aa90';
//const ApiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=bb88aa90'

const App = () => {

  const [movies, setMovies] = useState([]);

  const [searchMovie, setsearchMovie] = useState('');

  const searchedMovie = async (searchTitle) => {
    const response = await fetch(`${ApiUrl}&s=${searchTitle}`);
    
    const data = await response.json();
  
    setMovies(data.Search);
  }

  useEffect(() => {
    searchedMovie('Superman');
  }, []);

  return (
    <div className = "App">
      
      <h1>CineVerse</h1>

      <div className = 'Search'>
        
        <input
          placeholder = 'Type in the name of the movie you want to search for'
          
          value = {searchMovie}

          onChange = {(event) => setsearchMovie(event.target.value)}
        />

        <img 
          src = {IconSearch}
          
          alt = 'Search for'
          
          onClick = {() => searchedMovie(searchMovie)}
        />

      </div>

      {
        movies.length > 0 
        ? (
          <div className = 'Container'>
            
            {movies.map((movie) => (
              <MovieTemplate movie={movie} key={movie.imdbID} />
            ))}
            
          </div>
        ) : (
          <div className = 'Empty'>

            <h2>No Movies Found</h2>
          
          </div>
        )
      }

    </div>
  );
}

export default App;
