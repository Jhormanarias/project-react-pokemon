import React from 'react'
import { useContext } from 'react';
import { PokemonContext } from '../../contexts/PokemonContext';

export const Items = () => {
    const [{},{getBlog}] = useContext(PokemonContext);
    return (
        <div>
            <h1>Items</h1>
            <br /><br />

        </div>
    )
}
