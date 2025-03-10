import { Suspense } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { PokemonInfo } from "./components/PokemonInfo";
import { usePokemon } from "./hooks/usePokemon";

const PokemonData = () => {
  const pokemon = usePokemon("pikachu");
  return <PokemonInfo pokemon={pokemon} />;
};

const App = () => {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonData />
      </Suspense>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
