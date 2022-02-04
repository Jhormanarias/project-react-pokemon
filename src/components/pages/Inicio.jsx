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
    pokeimg : ""
  }
};
//Para exportar el inicio
export const Inicio = () => {
  //Aquí asignamos el estado inicial para el useEffect
  const [pokemos, setpokemos] = useState(initialState.pokemon); 
  //No se usa
  const [contador, setContador] = useState(initialState.count);
  useEffect(() => {
    //Solo se va a ejecutar la peticion cuando el estado pokemon aún no haya cargado
    if(pokemos.status=="Noloaded"){
      //peticion
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
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

  //Esto es de una prueba anterior
  const cambiarpokemon = () => {
    let pokemosApi = ["4", "5"];
    setpokemos(pokemosApi);
  };

  //Aquí ibamos a usar una función para obtener el link  de la imagen del pokemon

  // const getsrc = (pokemon) =>{
  //   axios.get(pokemon)
  //   .then(({data}) => {
  //     console.log(data.sprites.front_default);
  //     const imgSrc = data.sprites.front_default;
  //   })
  // };

  //El retorno para lo visual de la página
  return (
    <div>
      <h1>
        {" "}
        {/* Titulo */}
        Pokemon
        <br />
        {/* Llamo al componente busqueda */}
        <Busqueda setpokemos={setpokemos} />
        {/* Aquí recorremos cada uno de los pokemon que trajo con la funcion map(que sirve para recorrer un objeto)*/}
        {pokemos.pokemons.map(pokemon=>{
          return(
            <div>
              <div>
                {/* Aquí traemos el nombre del pokemon */}
                {pokemon.name}
                {/* Imprimimos en consola lo que trae pokemon */}
                {console.log(pokemon)}
                {/* Aquí para la src de la imagen lo traemos de la we pokemondb y para saber que pokemon es le asignamos el nombre que anteriormente traimos */}
                <img className="pokeImg" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}></img>
                <Button setpokemos={setpokemos} />
              </div>
            </div>
          )
        })}
      </h1>

      <input type="search" name="search" id="" />
      

      {/* Llamo varias veces el componente boton hola*/}
      <Button setpokemos={setpokemos} />
      <Button setpokemos={setpokemos} />
      <Button setpokemos={setpokemos} />

      {/* En la última imagen del logo hago que cambie el cursor
      al hacer clic llama la funcion cambiar pokemon(que modifica unos 
      valores de una prueba anterior con unos diferentes (valor en texto plano)) */}
      <img
        style={{ cursor: "pointer" }}
        onClick={() => cambiarpokemon()}
        src="./logoPokemon.png"
        width="500"
      />
    </div>
  );
};

// returnamos boton hola
const Button = ({ setpokemos }) => {
  function ss(params) {}
  return (
    <button>
      -
      <icon setpokemos={setpokemos}></icon>
    </button>
  );
};


//Input para busqueda
const Busqueda = ({ setpokemos }) => {
  return(
    <div>
      <input type="search" name="" id="" placeholder="Busca aquí el pokemon" />
      <button>
        O-
        <icon setpokemos={setpokemos}></icon>
      </button>
    </div>
      
  );
};
