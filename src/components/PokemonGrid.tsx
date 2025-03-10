import { Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { usePokemonList } from "@/hooks/usePokemonList";
import { PokemonContainer } from "./PokemonContainer";

interface PokemonGridProps {
  offset: number;
}

const PokemonList = ({ offset }: PokemonGridProps) => {
  const { results } = usePokemonList(offset);

  return (
    <div className="pokemon-grid">
      {results.map((pokemon) => {
        const id = pokemon.url.split("/").filter(Boolean).pop();
        return (
          <PokemonContainer
            key={pokemon.name}
            identifier={id ?? pokemon.name}
          />
        );
      })}
    </div>
  );
};

const GridErrorFallback = (error: Error) => (
  <div style={{ color: "red", padding: "2rem", textAlign: "center" }}>
    ポケモンの一覧を取得できませんでした: {error.message}
  </div>
);

export const PokemonGrid = ({ offset }: PokemonGridProps) => {
  return (
    <ErrorBoundary fallback={GridErrorFallback}>
      <Suspense
        fallback={
          <div style={{ padding: "2rem", textAlign: "center" }}>
            ポケモン一覧を読み込み中...
          </div>
        }
      >
        <PokemonList offset={offset} />
      </Suspense>
    </ErrorBoundary>
  );
};
