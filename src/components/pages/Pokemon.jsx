import React from 'react';
import { PokemonContext } from '../../contexts/PokemonContext';
import Busqueda from './components/Search';
import { useContext } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Pagination from './components/Pagination';


export const Pokemon = () => {
    const [{pokemos},{setpokemos}] = useContext(PokemonContext);
    return (
        <div className="container-fluid">
          <Header />
          <br />
          <div>
              <Busqueda />
              <Pagination />
              <Card />
          </div>
            
        </div>
    )
};
//Fin export component Pokemon-------------------------------------------------------------
