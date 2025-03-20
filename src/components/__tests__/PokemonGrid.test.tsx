import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PokemonGrid } from "../PokemonGrid";
import * as usePokemonListModule from "../../hooks/usePokemonList";
import * as useInfiniteScrollModule from "../../hooks/useInfiniteScroll";

// モックの設定
vi.mock("../../hooks/usePokemonList");
vi.mock("../../hooks/useInfiniteScroll");
vi.mock("../PokemonContainer", () => ({
  PokemonContainer: vi.fn().mockImplementation(({ identifier }) => (
    <div data-testid={`pokemon-${identifier}`}>Pokemon {identifier}</div>
  )),
}));

describe("PokemonGrid", () => {
  const mockPokemons = [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  ];

  beforeEach(() => {
    vi.mocked(useInfiniteScrollModule.useInfiniteScroll).mockReturnValue(vi.fn());
  });

  test("ポケモンリストが正しく表示されること", () => {
    vi.mocked(usePokemonListModule.usePokemonList).mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
      error: null,
      hasMore: true,
      loadMore: vi.fn(),
    });

    render(<PokemonGrid />);

    expect(screen.getByTestId("pokemon-1")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-2")).toBeInTheDocument();
  });

  test("エラー状態が正しく表示されること", () => {
    const errorMessage = "API error";
    vi.mocked(usePokemonListModule.usePokemonList).mockReturnValue({
      pokemons: [],
      loading: false,
      error: new Error(errorMessage),
      hasMore: false,
      loadMore: vi.fn(),
    });

    render(<PokemonGrid />);

    expect(screen.getByText(`ポケモンの一覧を取得できませんでした: ${errorMessage}`)).toBeInTheDocument();
  });

  test("初期ローディング状態が正しく表示されること", () => {
    vi.mocked(usePokemonListModule.usePokemonList).mockReturnValue({
      pokemons: [],
      loading: true,
      error: null,
      hasMore: true,
      loadMore: vi.fn(),
    });

    render(<PokemonGrid />);

    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  test("追加ローディング状態が正しく表示されること", () => {
    vi.mocked(usePokemonListModule.usePokemonList).mockReturnValue({
      pokemons: mockPokemons,
      loading: true,
      error: null,
      hasMore: true,
      loadMore: vi.fn(),
    });

    render(<PokemonGrid />);

    expect(screen.getByText("さらに読み込み中...")).toBeInTheDocument();
  });

  test("無限スクロールが正しく設定されること", () => {
    const loadMore = vi.fn();
    vi.mocked(usePokemonListModule.usePokemonList).mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
      error: null,
      hasMore: true,
      loadMore,
    });

    const mockIntersectionObserver = vi.fn();
    vi.mocked(useInfiniteScrollModule.useInfiniteScroll).mockImplementation((callback) => {
      mockIntersectionObserver(callback);
      return vi.fn();
    });

    render(<PokemonGrid />);

    // useInfiniteScrollのコールバックをテスト
    const [callback] = mockIntersectionObserver.mock.calls[0];
    callback();
    expect(loadMore).toHaveBeenCalled();
  });
});
