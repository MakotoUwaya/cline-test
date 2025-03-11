import { useState, useCallback, useEffect } from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

const LIMIT = 25;

export const usePokemonList = (initialFetch = true) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${LIMIT}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PokemonListResponse = await response.json();
      setPokemons((prev) => [...prev, ...data.results]);
      setHasMore(data.next !== null);
      setOffset((prev) => prev + LIMIT);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch Pokemon list")
      );
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore]);

  // 初期データの取得
  useEffect(() => {
    if (initialFetch && !pokemons.length) {
      initialFetch = false;
      loadMore();
    }
  }, [initialFetch, loadMore, pokemons.length]);

  return {
    pokemons,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
