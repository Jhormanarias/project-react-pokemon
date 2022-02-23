import React, {useContext} from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import Inicio from "../Inicio";


//Input para busqueda-----------------------------------------------------------------------
const Busqueda = ({pokemonsFilter}) => {
    const [{pokemos,searchPokemon},{setpokemos,setsearchPokemon}] = useContext(PokemonContext)
    const handleChange = (e) =>{
      setpokemos({...pokemos,
        searchtext: e.target.value
      })
      // let pokemonsWithout = pokemos.pokemons.filter(p=>p.name!=pokemonName);
      let pokemonFilter = pokemos.pokemons.filter(p => p.name == pokemonsFilter);
      // console.log(pokemonFilter);
      console.log(e.target.value);
    };
  
    const BuscaPokemonPrueba = (searchValue) =>{
      setsearchPokemon(searchValue);
      console.log(searchPokemon);
    }
  
  
    return(
      <div className="input-group mb-3 campoSearch">
        {/* {pokemos.searchtext} */}
        <input 
          className='search form-control'
          type='search' 
          onChange={handleChange}
          value={pokemos.searchtext}
          placeholder="Search Pokemon"
      />
        {searchPokemon}
      </div>
        
    );
  };
  //Busqueda-----------------------------------------------------------------------
  

  export default Busqueda; 