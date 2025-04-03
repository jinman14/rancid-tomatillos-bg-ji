import './App.css';
import searchIcon from '../icons/search.png';
import upvoteIcon from '../icons/upvote.png';
import downvoteIcon from '../icons/downvote.png';

// Example imports (for later):
import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

function App() {

  const [posters, setPosters] = useState(moviePosters)

  function upvote(){
    // code that says increase vote count
  };

  function downvote(){
    //decrease vote count by one
  };



  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
      </header>
        <MoviesContainer posters={posters} upvote={upvote} downvote={downvote} upvoteIcon={upvoteIcon} downvoteIcon={downvoteIcon}/>
    </main>
  );
}

export default App;
