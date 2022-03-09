//Imports Components---------------------------------------------------------------------
import React, { useContext } from 'react';
import { PokemonContext } from '../../../contexts/PokemonContext';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
//Imports Components---------------------------------------------------------------------

//Export Component Pagination-------------------------------------------------------------
export const Pagination = () => {

    const [{ pokemos, currentPage}, { setpokemos, setcurrentPage, onClickRegresar, handleChangeFilter, onClickCurrentPage }] = useContext(PokemonContext);
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
    const BtnGroups = () => {
        let limitGroups = Math.round(pokemos.count / pokemos.limit);

        let contador = [];

        contador.length = limitGroups;
        let contLenght = contador.length;

        let paginador = pokemos.paginador;
        
        console.log(paginador);
        console.log(contador);
        console.log(contLenght);

        /*         console.log(contador);
         */
        

        /* while (paginador<=limitGroups) {
            console.log(contador);
            <button>{paginador}</button>;
            paginador ++;
        } */

        
            /* contador.map( (contLenght) => {
                contLenght ++;
                return <button>1</button>
            }) */

            let forFunc = () =>{
                for (let i = 0; i <= contLenght; i++) {
                    contador.push(i)
                }
            }

            
        


        /* const handleChange = (e) => {
            let page = parseInt(e.target.firstChild.data);
            console.log(page);
            setpokemos({
                ...pokemos,
                paginador: page,
                offsett: page * 6,
                status: "Noloaded"
            })

        } */

        forFunc();
        console.log(contador);

        let contPage = contador.map((num)=>{
            setcurrentPage({...currentPage,
            paginador: num})
            return <button onClick={()=> onClickCurrentPage()}>{num}</button>
        })

        return (
            <div>
                {contPage}
                
            </div>
        )


    }

    return (
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