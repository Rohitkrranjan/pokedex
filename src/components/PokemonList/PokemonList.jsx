import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonlist, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downloadPokemon() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemonResults = response.data.results;
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultsPromise);
    const pokemonListResults = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        type: pokemon.types,
      };
    });
    console.log(pokemonListResults);
    setPokemonList(pokemonListResults);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemon-list-wrapper">
      <div>Pokemon List</div>
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading..."
          : pokemonlist.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
      </div>
      <div className="controls">
        <button>Prev</button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;
