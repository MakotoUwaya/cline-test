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
      dialog.showModal();
    }
    return () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="pokemon-dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="pokemon-dialog-content">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
        <h2>{pokemon.name}</h2>
        <div className="pokemon-details">
          <p>Height: {pokemon.height / 10}m</p>
          <p>Weight: {pokemon.weight / 10}kg</p>
          <div className="pokemon-types">
            <h3>Types:</h3>
            <ul>
              {pokemon.types.map((type) => (
                <li key={type.type.name}>{type.type.name}</li>
              ))}
            </ul>
          </div>
          <div className="pokemon-abilities">
            <h3>Abilities:</h3>
            <ul>
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>
                  {ability.ability.name}
                  {ability.is_hidden && " (Hidden)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </dialog>
  );
};
