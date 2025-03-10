import type { Pokemon } from "@/types/pokemon";

interface PokemonInfoProps {
  pokemon: Pokemon;
}

export const PokemonInfo = ({ pokemon }: PokemonInfoProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-20 h-20 object-contain"
      />
      <p className="m-0 text-sm capitalize text-center w-full truncate">
        {pokemon.name}
      </p>
    </div>
  );
};
