import PokemonList from "../PokemonList/PokemonList";
import Search from "../search/Search";
import './Pokedex.css'


function Pokedex() {
  return (
    <div className="pokededx-wrapper">
      {/* <h1 id="pokedex-heading">Pokedex</h1> */}
      <Search/>
      <PokemonList/>
    </div>
  );
}

export default Pokedex;
