import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  pokemon: {
    pokemons: [],
    status: "Noloaded",
    searchtext: "",
    offsett: 0,
    limit: 6,
    paginador: 0,
    count: 0,
    clickPage: 0
  }
};

export const PokemonContext = createContext([]);

export const PokemonContextProvider = ({ children }) => {

  const [pokemos, setpokemos] = useState(initialState.pokemon);
  const [searchPokemon, setsearchPokemon] = useState("");

  useEffect(async () => {

    //Solo se va a ejecutar la peticion cuando el estado pokemon aún no haya cargado
    if (pokemos.status == "Noloaded") {
      let count = await getCount();

      //peticion
      let data = await getPokemons();

      //Asignamos el estado pokemon, 1 los pokemons que trajo de la petición
      //2 cambiar el status a cargado, para que NO ejecute la petición infinitamente
      setpokemos({
        ...pokemos,
        pokemons: data,
        status: "loaded",
        count
      });
    }


  }, [pokemos]); //Aquí pongo a escuchar al useEffect con el estado pokemon

  //Para searchtext------------------------------------------------------------------------
  useEffect(() => {
    if (pokemos.searchtext.length > 2) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemos.searchtext}`)
        .then(({ data }) => {
          let array = [data.species];
          console.log(data);
          setpokemos({
            ...pokemos,
            pokemons: array
          })
        })
        .catch(e => console.log(e))
    }
    if (pokemos.searchtext.length === 0) {
      setpokemos({ ...pokemos, status: "Noloaded" })
    }

  }, [pokemos.searchtext])
  //Para searchtext------------------------------------------------------------------------

  //Para count---------------------------------------------------------------
  //Count
  const getCount = () => {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    return axios.get(url)
      .then(({ data }) => {
        return data.count;
      })
      .catch(e => {
        console.log(e);
        return e;
      })

  }

  //Para Obtener pokemons--------------------------------------------------------------
  //Count
  const getPokemons = () => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemos.limit}&offset=${pokemos.offsett}`)

      .then(({ data }) => {
        return data.results;
      })
      .catch(e => {
        alert("Algo salio mal");

      })
  }


  //Para cuando se elimina un pokemon-------------------------------------------------
  const functionPokemon = (pokemonName) => {
    let pokemonsWithout = pokemos.pokemons.filter(p => p.name != pokemonName);
    console.log(pokemonsWithout);
    setpokemos({
      ...pokemos,
      pokemons: pokemonsWithout
    })
  };
  //Para cuando se elimina un pokemon-------------------------------------------------

  //Para cuando se hace click en el botón regresar-------------------------------------
  const onClickRegresar = () => {
    changePage(pokemos.offsett - pokemos.limit, parseInt(pokemos.paginador) - 1);
  };
  //FIN Para cuando se hace click en el botón regresar-------------------------------------


  //Para boton avanzar----------------------------------------------------------------
  const onClickAvanzar = () => {
    changePage(pokemos.offsett + pokemos.limit, parseInt(pokemos.paginador) + 1);
  };
  //FIn Para boton avanzar-----------------------------------------------------------

  //Para cuando se hace click en algún boton de paginación------------------------------------
  const onClickCurrentPage = (pagina, e) => {
    //Aquí comparo el estado paginador y el click del boton para no ejecutar petición
    if(pokemos.paginador != e.target.value){
      changePage(pagina * pokemos.limit, parseInt(pagina) + 1);
    } 
  }
  //FIn Para cuando se hace click en algún boton de paginación-----------------------------------

  //Cambiar de pagina-----------------------------------------------------------------------
  const changePage = (offset, paginador) => {

    setpokemos({
      ...pokemos,
      status: "Noloaded",
      offsett: offset,
      paginador: paginador,
      searchtext: ""
    });
  }

  //Cambiar de pagina-----------------------------------------------------------------------

  //Para refescar la pagina----------------------------------------------------------------
  const onClickRefresh = () => {
    setpokemos({
      ...pokemos,
      status: "Noloaded"
    });
  }
  //Fin Para refescar la pagina----------------------------------------------------------------

  //FiltroNPokemon---------------------------------------------------------------------
  const handleChangeFilter = (e) => {
    let selectValue = e.value;
    setpokemos({
      ...pokemos,
      limit: selectValue,
      status: "Noloaded",
    })
  }
  //FiltroNPokemon---------------------------------------------------------------------

  return (
    <PokemonContext.Provider
      value={[{ pokemos, searchPokemon, },
      {
        setpokemos, setsearchPokemon,
        functionPokemon, onClickRegresar, handleChangeFilter,
        onClickCurrentPage, onClickRefresh, onClickAvanzar
      }]}>

      {children}
    </PokemonContext.Provider>
  )
}