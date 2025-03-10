import { PokemonGrid } from "@/components/PokemonGrid";
import { TopBar } from "@/components/TopBar";

const App = () => {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <TopBar />
      <div className="pt-16">
        <PokemonGrid offset={0} />
      </div>
    </main>
  );
};

export default App;
