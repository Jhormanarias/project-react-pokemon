import React, { createContext,useState,useEffect } from 'react';
import axios from 'axios';

const initialState = {
    count : 0,
    pokemon : {
      pokemons : [],
      status : "Noloaded",
      searchtext : "",
      offsett : 0,
      limit: 6,
      paginador : 0
    }
  };


export const PokemonContext = createContext([]);

export const PokemonContextProvider = ({children}) =>{
    
    const [pokemos, setpokemos] = useState(initialState.pokemon); 
    const [searchPokemon, setsearchPokemon] = useState("");

    useEffect(() => {
      //Solo se va a ejecutar la peticion cuando el estado pokemon aún no haya cargado
      if(pokemos.status=="Noloaded"){
        //peticion
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemos.limit}&offset=${pokemos.offsett}`)
      .then(({data}) => {
        console.log(data);
      //let pokemosApi = data.results;
  
      //Asignamos el estado pokemon, 1 los pokemons que trajo de la petición
      //2 cambiar el status a cargado, para que no ejecute la petición infinitamente
      setpokemos({...pokemos,
        pokemons:data.results,
        status: "loaded"}
      );
  
    })
      }
  
    }, [pokemos]); //Aquí pongo a escuchar al useEffect con el estado pokemon


    return (
        <PokemonContext.Provider value={[{pokemos,searchPokemon},{setpokemos,setsearchPokemon}]}>
            {children}
        </PokemonContext.Provider>
    )
}