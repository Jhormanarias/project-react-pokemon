import React from 'react';
import { PokemonContext } from '../../contexts/PokemonContext';
import Busqueda from './components/Search';
import { useContext } from 'react';


export const Pokemon = () => {
    const [{pokemos},{setpokemos}] = useContext(PokemonContext);
    return (
        <div>
            <div>
            <h1> Esta es la pagina Pokemon</h1>
            <img src="./logoPokemon.png" width="500"/>
            </div>
            <br />
            <div>
                <Busqueda />
                {pokemos.pokemons.map(pokemon=>{
              return(
                    <div className="col-md-4 mb-5">
                      <div id={"pokeCard_"+pokemon.name} pokemonsFilter={pokemon.name} >
                        {/* Aquí traemos el nombre del pokemon */}
                        <h2>{pokemon.name}</h2>
                        {/* Imprimimos en consola lo que trae pokemon */}
                        {console.log(pokemon)}
                        {/* Aquí para la src de la imagen lo traemos de la we pokemondb y para saber que pokemon es le asignamos el nombre que anteriormente traimos */}
                        <img className="pokeImg" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}></img>
                        {/* <Button pokemonName={pokemon.name} /> */}
                      </div>
                    </div>
              ) // END RETURN
            })} 
            </div>
            
        </div>
    )
}
