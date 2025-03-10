import { Suspense } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { PokemonInfo } from "./components/PokemonInfo";
import { usePokemon } from "./hooks/usePokemon";
import { ErrorBoundary } from "./components/ErrorBoundary";

const PokemonData = () => {
  const pokemon = usePokemon("pikachu");
  return <PokemonInfo pokemon={pokemon} />;
};

const PokemonErrorFallback = (error: Error) => (
  <div style={{ color: "red" }}>エラーが発生しました: {error.message}</div>
);

const App = () => {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <ErrorBoundary fallback={PokemonErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <PokemonData />
        </Suspense>
      </ErrorBoundary>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
