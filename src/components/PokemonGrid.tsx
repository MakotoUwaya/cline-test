import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { usePokemonList } from "@/hooks/usePokemonList";
import { PokemonContainer } from "./PokemonContainer";

export const PokemonGrid = () => {
  const { pokemons, loading, error, hasMore, loadMore } = usePokemonList(true);
  const lastElementRef = useInfiniteScroll(() => {
    if (hasMore && !loading) {
      loadMore();
    }
  });

  if (error) {
    return (
      <div className="text-red-600 p-8 text-center">
        ポケモンの一覧を取得できませんでした: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,120px)] gap-4 p-8 justify-center max-w-7xl mx-auto">
      {pokemons.map((pokemon, index) => {
        const id = pokemon.url.split("/").filter(Boolean).pop();
        const isLastElement = index === pokemons.length - 1;

        return (
          <div
            key={pokemon.name}
            ref={isLastElement ? lastElementRef : null}
          >
            <PokemonContainer identifier={id ?? pokemon.name} />
          </div>
        );
      })}
      {loading && pokemons.length === 0 ? (
        <div className="col-span-full p-8 text-center text-gray-700 dark:text-gray-300">
          読み込み中...
        </div>
      ) : loading && (
        <div className="col-span-full py-4 text-center text-gray-700 dark:text-gray-300">
          さらに読み込み中...
        </div>
      )}
    </div>
  );
};
