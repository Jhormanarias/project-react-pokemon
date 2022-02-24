import React, { createContext,useState,useEffect } from 'react';
import axios from 'axios';

const initialState = {
    pokemon : {
      pokemons : [],
      status : "Noloaded",
      searchtext : "",
      offsett : 0,
      limit: 6,
      paginador : 0,
      count: 0
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
        count: data.count,
        status: "loaded"}
      );
  
    })
      }
  
    }, [pokemos]); //Aquí pongo a escuchar al useEffect con el estado pokemon

    //Para searchtext------------------------------------------------------------------------
    useEffect(() => {
      if(pokemos.searchtext.length>2){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemos.searchtext}`)
        .then(({data})=>{
          let array = [data.species];
          console.log(data);
          setpokemos({...pokemos,
          pokemons: array})
        })
      }
      if(pokemos.searchtext.length===0){
        setpokemos({...pokemos,status:"Noloaded"})
      }
      
    }, [pokemos.searchtext])
    //Para searchtext------------------------------------------------------------------------

    //Para cuando se elimina un pokemon-------------------------------------------------
    const functionPokemon = (pokemonName)=>{
      let pokemonsWithout = pokemos.pokemons.filter(p=>p.name!=pokemonName);
      console.log(pokemonsWithout);
      setpokemos({...pokemos,
      pokemons: pokemonsWithout})
    };
    //Para cuando se elimina un pokemon-------------------------------------------------

    //Para cuando se hace click en el botón regresar-------------------------------------
    const onClickRegresar = () => {
      setpokemos({
          ...pokemos,
          status: "Noloaded",
          offsett: pokemos.offsett - pokemos.limit,
          paginador: parseInt(pokemos.paginador) - 1,
          searchtext: ""
      });
    };
  //Para cuando se hace click en el botón regresar-------------------------------------

  //FiltroNPokemon---------------------------------------------------------------------
  const handleChangeFilter = (e) => {
    console.log(e.value);
    let selectValue = e.value;
    setpokemos({
      ...pokemos,
      limit: selectValue,
      status: "Noloaded",
    })
  }
  //FiltroNPokemon---------------------------------------------------------------------

    return (
        <PokemonContext.Provider value={[{pokemos,searchPokemon},{setpokemos,setsearchPokemon,functionPokemon,onClickRegresar,handleChangeFilter}]}>
            {children}
        </PokemonContext.Provider>
    )
}