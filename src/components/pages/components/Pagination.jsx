//Imports Components---------------------------------------------------------------------
import React, { useContext } from 'react';
import { PokemonContext } from '../../../contexts/PokemonContext';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
//Imports Components---------------------------------------------------------------------

//Export Component Pagination-------------------------------------------------------------
export const Pagination = () => {

    const [{ pokemos, currentPage }, { setpokemos, setcurrentPage, onClickRegresar, handleChangeFilter, onClickCurrentPage }] = useContext(PokemonContext);
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

        if (pokemos.offsett + pokemos.limit <= 1126) {
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
    const BtnGroups = () => {
        return (
            <div className='btn-toolbar justify-content-center mt-4'>
                {
                Array(Math.round(pokemos.count / pokemos.limit)).fill(1)
                    .map((num, i) => {
                        return <button id={'btnSelect'+i} className='btn btn-outline-secondary' onClick={(e) => onClickCurrentPage(i,e)}>{i + 1}</button>
                    })
            }
            </div>
        )
    }

    return (
        <div className='row'>

            <BtnRegresar />
            <FiltroNpokemon />
            <BtnAvanzar />
            <BtnGroups />
        </div>
    )

}
//Export Component Pagination-------------------------------------------------------------