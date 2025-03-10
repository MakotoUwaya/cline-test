import { use } from "react";
import type { Pokemon } from "@/types/pokemon";

const cache = new Map<string, Promise<Pokemon>>();

const fetchPokemon = (pokemonName: string): Promise<Pokemon> => {
  if (!cache.has(pokemonName)) {
    cache.set(
      pokemonName,
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
        async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }
      )
    );
  }

  const pokemon = cache.get(pokemonName);
  if (!pokemon) {
    throw new Error("Pokemon not found in cache");
  }
  return pokemon;
};

export const usePokemon = (pokemonName: string): Pokemon => {
  return use(fetchPokemon(pokemonName));
};
