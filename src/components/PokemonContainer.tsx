import { Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { PokemonInfo } from "@/components/PokemonInfo";
import { usePokemon } from "@/hooks/usePokemon";

interface PokemonContainerProps {
  identifier: string | number;
}

const PokemonData = ({ identifier }: PokemonContainerProps) => {
  const pokemon = usePokemon(identifier.toString());
  return <PokemonInfo pokemon={pokemon} />;
};

const PokemonErrorFallback = (error: Error) => (
  <div style={{ color: "red", padding: "1rem" }}>
    エラーが発生しました: {error.message}
  </div>
);

export const PokemonContainer = ({ identifier }: PokemonContainerProps) => {
  return (
    <div className="pokemon-card">
      <ErrorBoundary fallback={PokemonErrorFallback}>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <PokemonData identifier={identifier} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
