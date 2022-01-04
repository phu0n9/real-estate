import React from 'react';
import '../stylesheet/Navbar.css'
import { HashLink as Link } from 'react-router-hash-link'   
import { AuthenticationButton } from '../login-button/AuthenticationButton';

export default function NavBar() {
    return (
        <>
        <header className="header fixed-top">
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

                <a href="/" className="logo d-flex align-items-center">
                    <img src="./logo.png" alt="logo"/>
                    <span>Reado</span>
                </a>

                <nav className="navbar">
                    <ul>
                    <li><a className="nav-link scrollto active" href="/">Home</a></li>
                    <li><a className="nav-link scrollto" href="/rental">Rental</a></li>
                    <li className="dropdown"><a href="/blog"><span>Blog</span> <i className="bi bi-chevron-down"></i></a>
                        <ul>
                        <li><a href="/">Drop Down 1</a></li>
                        <li><a href="/">Drop Down 2</a></li>
                        <li><a href="/">Drop Down 3</a></li>
                        <li><a href="/">Drop Down 4</a></li>
                        </ul>
                    </li>
                    <li className="dropdown"><a href="/auth/profile"><span>Profile</span> <i className="bi bi-chevron-down"></i></a>
                        <ul>
                        <li><a href="/myPage">My Page</a></li>
                        <li><AuthenticationButton /></li>
                        <li><a href="/">Drop Down 3</a></li>
                        <li><a href="/">Drop Down 4</a></li>
                        </ul>
                    </li>
                    <li><Link smooth className="nav-link scrollto" to="#contact">Contact</Link></li>
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
        </header>
        </>
    )
}
