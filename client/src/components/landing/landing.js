import React from "react";
import { Link } from 'react-router-dom'
import './landing.scss';

const Landing = ()=>{
    return(
        <div id='landing-page' className='container-fluid'>
            <header className='masthead'>
                <div className='masthead-content'>
                    <h2>Developer Connecter</h2>
                    <h3>Create a developer profile/portfolio. share and get help from other developers</h3>
                    <div className='masthead-btn-wrapper'>
                        <div className='masthead-btn'>
                            <Link to="/login" className="btn btn-primary">Sign In</Link>
                        </div>
                        <div className='masthead-btn'>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
};

export default Landing;