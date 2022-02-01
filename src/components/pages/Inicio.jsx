import React, { useState, useEffect } from "react";
import axios from "axios";
const initialState = {
  count : 0,
  pokemon : {
    pokemons : [],
    status : "Noloaded",
    pokeimg : ""
  }
};

export const Inicio = () => {
  const [pokemos, setpokemos] = useState(initialState.pokemon);
  const [contador, setContador] = useState(initialState.count);
  useEffect(() => {
    
    if(pokemos.status=="Noloaded"){
      //peticion
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50`)
    .then(({data}) => {
      console.log(data);
    //let pokemosApi = data.results;

    setpokemos({...pokemos,
      pokemons:data.results,
      status: "loaded"}
    );

  })
    }

  }, [pokemos]);

  const cambiarpokemon = () => {
    let pokemosApi = ["4", "5"];
    setpokemos(pokemosApi);
  };

  const getsrc = (pokemon) =>{
    axios.get(pokemon)
    .then(({data}) => {
      console.log(data.sprites.front_default);
      const imgSrc = data.sprites.front_default;
    })
  };

  return (
    <div>
      <h1>
        {" "}
        Pokemon
        {pokemos.pokemons.map(pokemon=>{
          return(
            <div>
              <div>
                {pokemon.name}
                {console.log(pokemon)}
                <img src={getsrc(pokemon.url)}></img>
              </div>
            </div>
          )
        })}
      </h1>
      <Button setpokemos={setpokemos} />
      <Button setpokemos={setpokemos} />

      <Button setpokemos={setpokemos} />

      <img
        style={{ cursor: "pointer" }}
        onClick={() => cambiarpokemon()}
        src="./logoPokemon.png"
        width="500"
      />
    </div>
  );
};
const Button = ({ setpokemos }) => {
  function ss(params) {}
  return (
    <button>
      hola
      <icon setpokemos={setpokemos}></icon>
    </button>
  );
};
