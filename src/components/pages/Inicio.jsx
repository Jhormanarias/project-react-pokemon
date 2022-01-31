import React, { useState, useEffect } from "react";

export const Inicio = () => {
  const [pokemos, setpokemos] = useState([]);
  useEffect(() => {
    //peticion
    let pokemosApi = ["1", "2", "3"];

    setpokemos(pokemosApi);
  }, []);

  const cambiarpokemon = () => {
    let pokemosApi = ["4", "5"];
    setpokemos(pokemosApi);
  };

  return (
    <div>
      <h1>
        {" "}
        Esta es la pagina Pokemon
        {JSON.stringify(pokemos)}
        {console.log(pokemos)}
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
