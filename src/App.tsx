import reactLogo from "./assets/react.svg";
import "./App.css";
import { PokemonInfo } from "./components/PokemonInfo";
import { usePokemon } from "./hooks/usePokemon";

function App() {
  const { pokemon, isLoading, error } = usePokemon("pikachu");

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <PokemonInfo pokemon={pokemon} isLoading={isLoading} error={error} />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
