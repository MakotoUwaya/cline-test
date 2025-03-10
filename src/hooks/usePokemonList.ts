import { use } from "react";

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

const cache = new Map<number, Promise<PokemonListResponse>>();

const fetchPokemonList = (offset: number): Promise<PokemonListResponse> => {
  if (!cache.has(offset)) {
    cache.set(
      offset,
      fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=25`).then(
        async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }
      )
    );
  }

  const pokemonList = cache.get(offset);
  if (!pokemonList) {
    throw new Error("Pokemon list not found in cache");
  }
  return pokemonList;
};

export const usePokemonList = (offset: number): PokemonListResponse => {
  return use(fetchPokemonList(offset));
};
