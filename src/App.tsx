import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  interface Pokemon {
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
    };
  }

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then(response => setPokemon(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Pikachu Information</h1>
      <div className="card">
        <img src={pokemon?.sprites?.front_default} alt="Pikachu" />
        <p>Name: {pokemon?.name}</p>
        <p>Height: {pokemon?.height}</p>
        <p>Weight: {pokemon?.weight}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
