import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonlist, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokedexUrl, setPokdexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextUrl , setNextUrl] = useState('');
  const [prevUrl , setPrevUrl] = useState('');

  async function downloadPokemon() {
    setIsLoading(true)
    const response = await axios.get(pokedexUrl);
    const pokemonResults = response.data.results;

    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

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
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div>Pokemon List</div>
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading..."
          : pokemonlist.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button disabled={prevUrl==null} onClick={()=>setPokdexUrl(prevUrl)} >Prev</button>
        <button disabled={nextUrl == null} onClick={()=>setPokdexUrl(nextUrl)}>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;
