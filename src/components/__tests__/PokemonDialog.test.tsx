import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonDialog } from "../PokemonDialog";
import type { Pokemon } from "@/types/pokemon";

describe("PokemonDialog", () => {
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
      },
      {
        ability: { name: "chlorophyll", url: "https://pokeapi.co/api/v2/ability/34/" },
        is_hidden: true,
        slot: 3
      }
    ]
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
    Object.defineProperty(HTMLDialogElement.prototype, 'open', {
      configurable: true,
      get: () => true
    });
  });

  test("ダイアログが正しく表示されること", () => {
    render(<PokemonDialog pokemon={mockPokemon} onClose={() => { }} />);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  test("ポケモンの基本情報が正しく表示されること", () => {
    render(<PokemonDialog pokemon={mockPokemon} onClose={() => { }} />);

    // 名前
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();

    // 画像
    const image = screen.getByAltText("bulbasaur") as HTMLImageElement;
    expect(image.src).toBe("https://example.com/bulbasaur.png");

    // 高さと重さ
    expect(screen.getByText("Height: 0.7m")).toBeInTheDocument();
    expect(screen.getByText("Weight: 6.9kg")).toBeInTheDocument();
  });

  test("タイプが正しく表示されること", () => {
    render(<PokemonDialog pokemon={mockPokemon} onClose={() => { }} />);
    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("poison")).toBeInTheDocument();
  });

  test("特性が正しく表示されること", () => {
    render(<PokemonDialog pokemon={mockPokemon} onClose={() => { }} />);
    expect(screen.getByText("overgrow")).toBeInTheDocument();
    expect(screen.getByText("chlorophyll (Hidden)")).toBeInTheDocument();
  });

  test("フォールバック画像が正しく表示されること", () => {
    const pokemonWithoutSprite = {
      ...mockPokemon,
      sprites: {
        front_default: null,
      },
    };
    render(<PokemonDialog pokemon={pokemonWithoutSprite} onClose={() => { }} />);
    const image = screen.getByAltText("bulbasaur") as HTMLImageElement;
    expect(image.src).not.toBe("");
    expect(image.src).not.toBe(mockPokemon.sprites.front_default);
  });

  test("閉じるボタンがクリックされたとき、onCloseが呼ばれること", () => {
    const onClose = vi.fn();
    render(<PokemonDialog pokemon={mockPokemon} onClose={onClose} />);

    fireEvent.click(screen.getByLabelText("Close dialog"));
    expect(onClose).toHaveBeenCalled();
  });

  test("ダイアログの外側をクリックしたとき、onCloseが呼ばれること", () => {
    const onClose = vi.fn();
    render(<PokemonDialog pokemon={mockPokemon} onClose={onClose} />);

    const dialog = screen.getByRole("dialog", { hidden: true });
    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalled();
  });

  test("クリーンアップ時にonCloseが呼ばれること", () => {
    const onClose = vi.fn();
    const { unmount } = render(<PokemonDialog pokemon={mockPokemon} onClose={onClose} />);

    const dialog: HTMLDialogElement = screen.getByRole("dialog", { hidden: true });
    dialog.open = true;
    unmount();
    expect(onClose).toHaveBeenCalled();
  });
});
