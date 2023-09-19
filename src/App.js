import { Link } from "react-router-dom";
import "./App.css";
import PokemonList from "./components/PokemonList/PokemonList";
import Pokedex from "./components/pokedex/Pokedex";
import CustomRoustes from "./routes/CoustomRoutes";

function App() {
  return (
    <div className="outer-pokedex">
      {/* <Pokedex /> */}
      <h1 id="pokedex-heading">
       <Link to="/"> Pokedex </Link>
        </h1>
      <CustomRoustes/>
    </div>
  );
}

export default App;
