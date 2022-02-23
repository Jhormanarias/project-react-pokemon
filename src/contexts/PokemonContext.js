import React, { createContext,useState,useEffect } from 'react';

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

    return (
        <PokemonContext.Provider value={[{pokemos,searchPokemon},{setpokemos,setsearchPokemon}]}>
            {children}
        </PokemonContext.Provider>
    )
}