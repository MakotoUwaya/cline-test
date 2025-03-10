import reactLogo from "@/assets/react.svg";
import "@/App.css";
import { PokemonContainer } from "@/components/PokemonContainer";

const App = () => {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <PokemonContainer />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
