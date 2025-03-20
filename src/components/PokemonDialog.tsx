import { useRef, useEffect } from "react";
import type { Pokemon } from "@/types/pokemon";
import fallbackPokemon from "@/assets/pokemon-svgrepo-com.svg";

interface PokemonDialogProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export const PokemonDialog = ({ pokemon, onClose }: PokemonDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      if (dialog?.open) {
        dialog.close();
        onClose();
      }
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      className="border-none rounded-lg p-0 max-w-md w-[90%] bg-white dark:bg-gray-800 backdrop:bg-black/50 fixed inset-0 m-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          aria-label="Close dialog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={pokemon.sprites.front_default ?? fallbackPokemon}
          alt={pokemon.name}
          className="block w-[120px] h-[120px] mx-auto"
        />
        <h2 className="mt-2 mb-2 text-center capitalize text-gray-800 dark:text-white">
          {pokemon.name}
        </h2>
        <div className="mt-4">
          <p className="text-gray-700 dark:text-gray-300 my-2">Height: {pokemon.height / 10}m</p>
          <p className="text-gray-700 dark:text-gray-300 my-2">Weight: {pokemon.weight / 10}kg</p>
          <div>
            <h3 className="mt-4 mb-2 text-gray-600 dark:text-gray-400">Types:</h3>
            <ul>
              {pokemon.types.map((type) => (
                <li
                  key={type.type.name}
                  className="inline-block m-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mt-4 mb-2 text-gray-600 dark:text-gray-400">Abilities:</h3>
            <ul>
              {pokemon.abilities.map((ability) => (
                <li
                  key={ability.ability.name}
                  className="inline-block m-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                >
                  {ability.ability.name}
                  {ability.is_hidden && " (Hidden)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </dialog>
  );
};
