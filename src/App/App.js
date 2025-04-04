import './App.css';
import searchIcon from '../icons/search.png';

// Example imports (for later):
import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

function App() {

  const [posters, setPosters] = useState(moviePosters)

  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
      </header>
        <MoviesContainer posters={posters}/>
    </main>
  );
}

export default App;
