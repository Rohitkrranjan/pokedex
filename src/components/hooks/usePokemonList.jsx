import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url){

    const [pokemonListState, setPokemonListState] = useState({
        pokemonlist: [],
        isLoading: true,
        pokedexUrl: url,
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

      return {pokemonListState , setPokemonListState}


}

export default usePokemonList;