import { Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { PokemonInfo } from "./PokemonInfo";
import { usePokemon } from "../hooks/usePokemon";

const PokemonData = () => {
  const pokemon = usePokemon("pikachu");
  return <PokemonInfo pokemon={pokemon} />;
};

const PokemonErrorFallback = (error: Error) => (
  <div style={{ color: "red" }}>エラーが発生しました: {error.message}</div>
);

export const PokemonContainer = () => {
  return (
    <ErrorBoundary fallback={PokemonErrorFallback}>
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonData />
      </Suspense>
    </ErrorBoundary>
  );
};
