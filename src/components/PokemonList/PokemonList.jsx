import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  // const [pokemonlist, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [pokedexUrl, setPokdexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  // const [nextUrl , setNextUrl] = useState('');
  // const [prevUrl , setPrevUrl] = useState('');

  const [pokemonListState, setPokemonListState] = useState({
    pokemonlist: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemon() {
    // setIsLoading(true)
    setPokemonListState((state) =>({ ...state, isLoading: true }));
    const response = await axios.get(pokemonListState.pokedexUrl);
    const pokemonResults = response.data.results;

    setPokemonListState((state)=>({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));
    // setPrevUrl(response.data.previous);

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
    setPokemonListState((state)=>({
      ...state,
      pokemonlist: pokemonListResults,
      isLoading: false
    }));

    // setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div>Pokemon List</div>
      <div className="pokemon-wrapper">
        {(pokemonListState.isLoading)
          ? "Loading..."
          : pokemonListState.pokemonlist.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button disabled={pokemonListState.prevUrl == null} onClick={() =>
          { 
            const urlToSet = pokemonListState.prevUrl
            setPokemonListState({...pokemonListState ,pokedexUrl:urlToSet})}}> Prev </button>
        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() =>
            {
              const urlToSet = pokemonListState.nextUrl
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl:urlToSet
            })}
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
