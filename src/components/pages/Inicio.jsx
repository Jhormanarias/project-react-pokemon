//Importamos Librerias
import React, { useState, useEffect } from "react";
import axios from "axios";

//Iniciamos un estado con variable contador(No se usa) 
//y variable/objeto pokemon donde tiene:
//pokemons(donde trae todos los pokemon), 
//status(para saber si ya cargo o no cargo y así ejecutar el useEffect solo con una condición),
//pokeimg(variable pa probar(pero tampoco se usa))
const initialState = {
  count : 0,
  pokemon : {
    pokemons : [],
    status : "Noloaded",
    searchtext : ""
  }
};
//Para exportar el inicio
export const Inicio = () => {
  //Aquí asignamos el estado inicial para el useEffect
  const [pokemos, setpokemos] = useState(initialState.pokemon); 
  //No se usa
  const [contador, setContador] = useState(initialState.count);
  const [esconderPokemon, setesconderPokemon] = useState(true);
  const [searchPokemon, setsearchPokemon] = useState("");
  useEffect(() => {
    //Solo se va a ejecutar la peticion cuando el estado pokemon aún no haya cargado
    if(pokemos.status=="Noloaded"){
      //peticion
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=30`)
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
  



  //Esto es de una prueba anterior
  const cambiarpokemon = () => {
    let pokemosApi = ["4", "5"];
    setpokemos(pokemosApi);
  };

//Input para busqueda-----------------------------------------------------------------------
//        {pokemonsFilter}
const Busqueda = ({pokemonsFilter}) => {
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
      {/* <button className="btn btn-primary">
      🔍
      </button> */}
      {/* <input 
      className='search form-control'
      type='text'
      placeholder="Search Pokemon 2"
      onChange={(e)=>BuscaPokemonPrueba(e.target.value)}
      value={searchPokemon}
      /> */}
      {searchPokemon}
    </div>
      
  );
};
//Fin input busqueda-----------------------------------------------------------------------

// returnamos boton eliminar---------------------------------------------------------------
const Button = ({ pokemonName }) => {
  const functionPokemon = ()=>{
    let pokemonsWithout = pokemos.pokemons.filter(p=>p.name!=pokemonName);
    console.log(pokemonsWithout);
    setpokemos({...pokemos,
    pokemons: pokemonsWithout})
  }
  
  
  // const handleChange = e =>{
    
  //   console.log("botón eliminar presionado");

  // }
 return (
   <button className="btn btn-danger"
   onClick={()=>functionPokemon()}>
     X
     <icon setpokemos={setpokemos}></icon>
   </button>
 );
};
//Fin botón eliminar-------------------------------------------------------------------

//Inicio del return del inicio(página inicio, componente)------------------------------------
  return (
    <div>
      <h1>
        {/* Titulo en imagen */}
        <img
          style={{ cursor: "pointer" }}
          onClick={() => cambiarpokemon()}
          src="./logoPokemon.png"
          width="500"
        />
        <br />
        {/* Llamo al componente busqueda */}
        {/*  */}
        <Busqueda />
        {/* Aquí recorremos cada uno de los pokemon que trajo con la funcion map(que sirve para recorrer un objeto)*/}
        {pokemos.pokemons.map(pokemon=>{
          return(
            <div>
                <div id={"pokeCard_"+pokemon.name} pokemonsFilter={pokemon.name} >
                  {/* Aquí traemos el nombre del pokemon */}
                  {pokemon.name}
                  {/* Imprimimos en consola lo que trae pokemon */}
                  {console.log(pokemon)}
                  {/* Aquí para la src de la imagen lo traemos de la we pokemondb y para saber que pokemon es le asignamos el nombre que anteriormente traimos */}
                  <img className="pokeImg" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}></img>
                  <Button pokemonName={pokemon.name} />
                </div>
            </div>
          )
        })}
      </h1>
      
    </div>
  );
  
};
//Fin return del inicio(página inicio, componente)------------------------------------------





