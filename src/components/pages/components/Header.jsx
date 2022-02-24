import React from 'react';
import { Link } from 'react-router-dom';


const Header = ()=>{

    return(
        <div>
            {/* Titulo en imagen */}
            <Link className="nav-link" to="/pokemon">
                <img
                    style={{ cursor: "pointer" }}
                    src="./logoPokemon.png"
                    width="500"
                />
            </Link>
        </div>
    )
}


export default Header;