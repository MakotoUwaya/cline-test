import type { Pokemon } from "@/types/pokemon";
import fallbackPokemon from "@/assets/pokemon-svgrepo-com.svg";

interface PokemonInfoProps {
  pokemon: Pokemon;
}

export const PokemonInfo = ({ pokemon }: PokemonInfoProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img
        src={pokemon.sprites.front_default ?? fallbackPokemon}
        alt={pokemon.name}
        className="w-20 h-20 object-contain"
      />
      <p
        className="m-0 text-sm capitalize text-center w-full max-w-[100px] truncate text-gray-800 dark:text-gray-200"
        title={pokemon.name}
      >
        {pokemon.name}
      </p>
    </div>
  );
};
