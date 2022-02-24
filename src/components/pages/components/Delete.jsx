import React, { useContext } from 'react';
import { PokemonContext } from '../../../contexts/PokemonContext';




// Botón eliminar---------------------------------------------------------------
const Delete = ({pokemonName}) => {

    const [{pokemos},{setpokemos}] = useContext(PokemonContext);


    const functionPokemon = ()=>{
      let pokemonsWithout = pokemos.pokemons.filter(p=>p.name!=pokemonName);
      console.log(pokemonsWithout);
      setpokemos({...pokemos,
      pokemons: pokemonsWithout})
    }
   return (
    // <div class="d-grid gap-2 mt-3">
        <button className="btn btn-danger"
            onClick={() => functionPokemon()}>
            X
            <icon setpokemos={setpokemos}></icon>
        </button>
    // {/* </div> */}



     
   );
  };
  //Fin botón eliminar-------------------------------------------------------------------


  export default Delete;