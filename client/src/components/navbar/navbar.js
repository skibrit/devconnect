import React from "react";
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import './navbar.scss';

const NavBar = ({location})=>{

    const {pathname} = location;
    return(
            <nav className={pathname==='/'?"navbar navbar-expand-lg navbar-dark fixed-top nav-transparent":
                "navbar navbar-expand-lg navbar-dark nav-fill"}  id='mainNav'>
                <Link to="/" className="navbar-brand" href="#">
                    <img className='nav-logo' src={require('../../assets/images/connect.png')} alt="logo"/>
                    DevConnect
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarColor01">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Developer</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
    )
};

export default withRouter(NavBar);