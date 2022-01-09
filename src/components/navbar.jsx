import React from 'react'
import '/Users/antoinecoppens/Documents/6_Vrije Tijd/digi-jump/node_modules/bootstrap/dist/css/bootstrap.css'

const NavBar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand m-auto justify-content-center" href="#home">
                    <img src="/horse.png" width="20" height="20" className="d-inline-block align-top m-2" alt=""/>
                    Hop Paardje Hop
                </a>
            </div>
        </nav>
    );   
};

export default NavBar;