import type { Pokemon } from "@/types/pokemon";

interface PokemonInfoProps {
  pokemon: Pokemon;
}

export const PokemonInfo = ({ pokemon }: PokemonInfoProps) => {
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
