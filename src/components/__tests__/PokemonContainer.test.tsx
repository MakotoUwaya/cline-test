import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonContainer } from "../PokemonContainer";
import * as usePokemonModule from "../../hooks/usePokemon";
import type { Pokemon } from "@/types/pokemon";

// モックの設定
vi.mock("../../hooks/usePokemon");
vi.mock("../PokemonDialog", () => ({
  PokemonDialog: ({ pokemon, onClose }: { pokemon: Pokemon; onClose: () => void }) => (
    <div data-testid="mock-dialog" onClick={onClose}>
      Dialog for {pokemon.name}
    </div>
  ),
}));

describe("PokemonContainer", () => {
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

  beforeEach(() => {
    vi.mocked(usePokemonModule.usePokemon).mockReturnValue(mockPokemon);
  });

  test("ポケモンの情報が正しく表示されること", () => {
    render(<PokemonContainer identifier="1" />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  test("ローディング状態が表示されること", () => {
    vi.mocked(usePokemonModule.usePokemon).mockImplementation(() => {
      throw new Promise(() => { }); // Suspense用の未解決のPromise
    });

    render(<PokemonContainer identifier="1" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("エラー状態が表示されること", () => {
    const errorMessage = "データの取得に失敗しました";
    vi.mocked(usePokemonModule.usePokemon).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    render(<PokemonContainer identifier="1" />);
    expect(screen.getByText(`エラーが発生しました: ${errorMessage}`)).toBeInTheDocument();
  });

  test("クリックしてダイアログが開くこと", () => {
    render(<PokemonContainer identifier="1" />);

    // PokemonInfoをクリック
    const container = screen.getByText("bulbasaur").parentElement;
    if (!container) throw new Error("Container not found");
    fireEvent.click(container);

    // ダイアログが表示されることを確認
    expect(screen.getByTestId("mock-dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog for bulbasaur")).toBeInTheDocument();
  });

  test("ダイアログを閉じることができること", () => {
    render(<PokemonContainer identifier="1" />);

    // ダイアログを開く
    const container = screen.getByText("bulbasaur").parentElement;
    if (!container) throw new Error("Container not found");
    fireEvent.click(container);

    // ダイアログを閉じる
    const dialog = screen.getByTestId("mock-dialog");
    fireEvent.click(dialog);

    // ダイアログが非表示になることを確認
    expect(screen.queryByTestId("mock-dialog")).not.toBeInTheDocument();
  });
});
