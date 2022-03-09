//Imports Components---------------------------------------------------------------------
import React , {useContext} from 'react';
import { PokemonContext } from '../../../contexts/PokemonContext';
import Select from 'react-select';
//Imports Components---------------------------------------------------------------------

//Export Component Pagination-------------------------------------------------------------
export const Pagination = ()=>{

    const [{pokemos},{setpokemos,onClickRegresar,handleChangeFilter}] = useContext(PokemonContext);
    const maxCount = 1126;
    
    // Botón Regresar---------------------------------------------------------------------
    const BtnRegresar = () => {

        if (pokemos.offsett > 0) {
            return (
                <div className="col-md-5">
                    <button
                        type="button"
                        class="btn btn-dark"
                        onClick={() => onClickRegresar()}
                    >⬅️</button>
                </div>
            )
        }
        else {
            return (
                <div className="col-md-5">

                </div>
            )
        }
    };
    // Fin Botón Regresar---------------------------------------------------------------------

    //Filtro de cuantos pokemon Mostrar------------------------------------------------
    const FiltroNpokemon = () => {

        const options = [
            { value: 6, label: '6' },
            { value: 30, label: '30' },
            { value: 120, label: '120' }
        ];

        return (
            <div className="col-md-2">
                <Select
                    placeholder={pokemos.limit}
                    defaultValue={pokemos.limit}
                    options={options}
                    onChange={handleChangeFilter}
                />
            </div>

        )
    };

    //Fin Filtro de cuantos pokemon Mostrar------------------------------------------------

    // Botón Avanzar---------------------------------------------------------------------

    const BtnAvanzar = () => {

        const onClickAvanzar = () => {
            setpokemos({
                ...pokemos,
                status: "Noloaded",
                offsett: pokemos.offsett + pokemos.limit,
                paginador: parseInt(pokemos.paginador) + 1,
                searchtext: ""
            });
        };

        if (pokemos.offsett < 1126) {
            return (
                <div className="col-md-5">
                    <button
                        type="button"
                        class="btn btn-dark"
                        onClick={() => onClickAvanzar()}
                    >➡️</button>
                </div>
            )
        }
        else {
            return (
                <div className="col-md-5">

                </div>
            )
        }
    };

  // Fin Botón Avanzar---------------------------------------------------------------------


  //Boton Groups-------------------------------------------------------------------
  const BtnGroups = ()=>{
        let limitGroups = Math.round(pokemos.count / pokemos.limit);

        let contador = [];

        contador.length = limitGroups;

        const handleChange = (e) => {
          let page = parseInt(e.target.firstChild.data);
          console.log(page);
          setpokemos({
              ...pokemos,
              paginador: page,
              offsett: page * 6,
              status: "Noloaded"
          })
        
        }

        return(
            <div>
                {
                    contador.map(
                        (contador) => {
                            return(
                                <button>{pokemos.contador}</button>
                            )
                        }
                    )
                }   
            </div>
        )

        
    }

  return(
      <div className='row'>
          <BtnRegresar />
          <FiltroNpokemon />
          <BtnAvanzar />
          <br />
          <BtnGroups />
      </div>
    )

}
//Export Component Pagination-------------------------------------------------------------