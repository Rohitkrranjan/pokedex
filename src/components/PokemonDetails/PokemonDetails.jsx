import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import"./PokemonDetails.css"

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function downloadpokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      id: response.data.id,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.nama),
    });
  }

  useEffect(() => {
    downloadpokemon();
  }, []);

  return (
    <div className="pokemon-details-wrapper">
      <img className="pokemon-details-image" src={pokemon.image} />
      <div className="pokeomn-details-name"><span>{pokemon.name}</span></div>
      <div className="pokeomn-details-name">Id: {pokemon.id}</div>

      <div className="pokeomn-details-name"> height : {pokemon.height} </div>
      <div className="pokeomn-details-name"> weight : {pokemon.weight}</div>
    </div>
  );
}

export default PokemonDetails;
