import "./App.css";
import PokemonList from "./components/PokemonList/PokemonList";
import Pokedex from "./components/pokedex/Pokedex";

function App() {
  return (
    <div className="App">
      <Pokedex />
      <PokemonList/>
    </div>
  );
}

export default App;
