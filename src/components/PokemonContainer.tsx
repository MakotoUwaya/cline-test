import { Suspense, useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { PokemonInfo } from "@/components/PokemonInfo";
import { PokemonDialog } from "@/components/PokemonDialog";
import { usePokemon } from "@/hooks/usePokemon";

interface PokemonContainerProps {
  identifier: string | number;
}

const PokemonData = ({ identifier }: PokemonContainerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pokemon = usePokemon(identifier.toString());

  return (
    <>
      <div onClick={() => setIsDialogOpen(true)}>
        <PokemonInfo pokemon={pokemon} />
      </div>
      {isDialogOpen && (
        <PokemonDialog
          pokemon={pokemon}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

const PokemonErrorFallback = (error: Error) => (
  <div className="text-red-600 p-4">エラーが発生しました: {error.message}</div>
);

export const PokemonContainer = ({ identifier }: PokemonContainerProps) => {
  return (
    <div className="w-[120px] h-[120px] bg-white rounded-lg shadow-sm p-2 flex flex-col items-center justify-between transition-transform hover:translate-y-[-2px] cursor-pointer">
      <ErrorBoundary fallback={PokemonErrorFallback}>
        <Suspense
          fallback={
            <div className="p-4 text-center bg-gray-50 rounded-lg text-gray-700">
              Loading...
            </div>
          }
        >
          <PokemonData identifier={identifier} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
