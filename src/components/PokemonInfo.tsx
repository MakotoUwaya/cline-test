import type { Pokemon } from "../types/pokemon";

interface PokemonInfoProps {
  pokemon: Pokemon | null;
  isLoading: boolean;
  error: Error | null;
}

export const PokemonInfo = ({
  pokemon,
  isLoading,
  error,
}: PokemonInfoProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div>
      <h1>{pokemon.name} Information</h1>
      <div className="card">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Name: {pokemon.name}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
      </div>
    </div>
  );
};
