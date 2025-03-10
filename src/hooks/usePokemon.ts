import { useState, useEffect } from "react";
import type { Pokemon } from "../types/pokemon";

export const usePokemon = (pokemonName: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch pokemon")
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPokemon();
  }, [pokemonName]);

  return { pokemon, isLoading, error };
};
