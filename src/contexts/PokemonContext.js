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

    useEffect( async () => {

      //Count
      // getCount();

      //Solo se va a ejecutar la peticion cuando el estado pokemon aún no haya cargado
      if(pokemos.status=="Noloaded"){
        let count = await getCount();
        count = 400;
        console.log(count);
        
        //peticion
        let data = await getPokemons();
        console.log(data);
        
        //Asignamos el estado pokemon, 1 los pokemons que trajo de la petición
        //2 cambiar el status a cargado, para que NO ejecute la petición infinitamente
        setpokemos({...pokemos,
          pokemons:data,
          status: "loaded",
          count});
      }
  
    }, [pokemos]); //Aquí pongo a escuchar al useEffect con el estado pokemon

    //Para searchtext------------------------------------------------------------------------
    useEffect(() => {
      if(pokemos.searchtext.length>2){
        axios.get(`https://pokeapi.co/api/v2/p okemon/${pokemos.searchtext}`)
        .then(({data})=>{
          let array = [data.species];
          console.log(data);
          setpokemos({...pokemos,
          pokemons: array})
        }).catch(e => console.log(e))
      }
      if(pokemos.searchtext.length===0){
        setpokemos({...pokemos,status:"Noloaded"})
      }
      
    }, [pokemos.searchtext])
    //Para searchtext------------------------------------------------------------------------

    //Para count---------------------------------------------------------------
    //Count
    const getCount = ()=>{
      const url = 'https://pokeapi.co/api/v2/pokemon';
      return axios.get(url)
      .then(({data})=>{
        return data.count;
      })
      .catch(e => {
        console.log(e);
        return e;
      })

    }

    //Para Obtener pokemons--------------------------------------------------------------
    //Count
    const getPokemons= ()=>{
      return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemos.limit}&offset=${pokemos.offsett}`)
      
      .then(({data}) => {
        console.log(data);
        console.log(data.results);
        return data.results;
      })
      .catch(e => {
        console.log(e);
        return e;
      })
    }


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