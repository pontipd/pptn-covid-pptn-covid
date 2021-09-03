import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import loGoPPTN from '../assets/images/logopptn.svg'

const Header = () => {
    return (
        <header id="header" className="px-sm-5 px-1">
            <div className="d-flex justify-content-between align-items-center mx-auto w-100">
                <div className="logo">
                    <img src={loGoPPTN} alt="Logo Plearnpattana School" />
                </div>
                <nav id="navbar">
                    <ul>
                        <li><NavLink exact activeClassName="active" to="/" >Dashboard</NavLink></li>
                        <li className="dropdown"><NavLink activeClassName="active" to="/account" >My account</NavLink>
                            <ul>
                                <li><Link to="#">Sign out</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header