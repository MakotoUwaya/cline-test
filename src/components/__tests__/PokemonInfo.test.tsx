import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PokemonInfo } from "../PokemonInfo";
import type { Pokemon } from "@/types/pokemon";

describe("PokemonInfo", () => {
  const mockPokemon: Pokemon = {
    name: "bulbasaur",
    height: 7,
    weight: 69,
    sprites: {
      front_default: "https://example.com/bulbasaur.png",
    },
    types: [
      { slot: 1, type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" } },
      { slot: 2, type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" } }
    ],
    abilities: [
      {
        ability: { name: "overgrow", url: "https://pokeapi.co/api/v2/ability/65/" },
        is_hidden: false,
        slot: 1
      }
    ]
  };

  test("ポケモンの名前が正しく表示されること", () => {
    render(<PokemonInfo pokemon={mockPokemon} />);
    const nameElement = screen.getByText("bulbasaur");
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.title).toBe("bulbasaur");
  });

  test("スプライト画像が正しく表示されること", () => {
    render(<PokemonInfo pokemon={mockPokemon} />);
    const image = screen.getByAltText("bulbasaur") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe("https://example.com/bulbasaur.png");
  });

  test("スプライト画像がnullの場合、フォールバック画像が表示されること", () => {
    const pokemonWithoutSprite = {
      ...mockPokemon,
      sprites: {
        front_default: null,
      },
    };
    render(<PokemonInfo pokemon={pokemonWithoutSprite} />);
    const image = screen.getByAltText("bulbasaur") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    // URLではなくsrcに含まれるデータを確認
    expect(image.src).not.toBe("");
    expect(image.src).not.toBe(mockPokemon.sprites.front_default);
  });
});
