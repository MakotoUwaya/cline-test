import { PokemonGrid } from "@/components/PokemonGrid";
import "@/styles/pokemon.css";

const App = () => {
  return (
    <main style={{ minHeight: "100vh", background: "#f0f0f0" }}>
      <PokemonGrid offset={0} />
    </main>
  );
};

export default App;
