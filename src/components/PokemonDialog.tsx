import { useRef, useEffect } from "react";
import type { Pokemon } from "@/types/pokemon";

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
      if (dialog && dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="border-none rounded-lg p-0 max-w-md w-[90%] bg-white dark:bg-gray-800 backdrop:bg-black/50 fixed inset-0 m-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="p-6">
        <img
          src={pokemon.sprites.front_default}
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
        <button
          onClick={onClose}
          className="block mx-auto mt-6 px-8 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded text-gray-700 dark:text-gray-300 cursor-pointer transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </dialog>
  );
};
