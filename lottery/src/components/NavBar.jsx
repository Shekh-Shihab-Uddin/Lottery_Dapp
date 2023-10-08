import React from "react"

import { NavLink } from "react-router-dom";

const NavBar = ()=>{

    return(
        <>
        <h1 className=" text-center"  >Lottery System</h1>
       <nav className="navbar navbar-expand-lg navbar">
       
                <div className="container-fluid">
                
                <div className="collapse navbar-collapse" id="navbarNav">
                
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink
                        to="/manager"
                        className="nav-link navtext"
                        aria-current="page"
                        >
                        Manger
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/participants" className="nav-link navtext">
                        Participant
                        </NavLink>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            </>
            )
       }

export default NavBar;