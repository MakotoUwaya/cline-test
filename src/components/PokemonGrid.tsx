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
    <div className="grid grid-cols-[repeat(auto-fill,120px)] gap-4 p-8 justify-center max-w-7xl mx-auto">
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
  <div className="text-red-600 p-8 text-center">
    ポケモンの一覧を取得できませんでした: {error.message}
  </div>
);

export const PokemonGrid = ({ offset }: PokemonGridProps) => {
  return (
    <ErrorBoundary fallback={GridErrorFallback}>
      <Suspense
        fallback={
          <div className="p-8 text-center text-gray-700">
            ポケモン一覧を読み込み中...
          </div>
        }
      >
        <PokemonList offset={offset} />
      </Suspense>
    </ErrorBoundary>
  );
};
