import React from 'react';
import '../stylesheet/Navbar.css'
import { HashLink as Link } from 'react-router-hash-link'
import { AuthenticationButton } from '../login-button/AuthenticationButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useEnv } from '../context/env.context';

export default function NavBar() {
    const { user, getAccessTokenSilently } = useAuth0()
    const { audience } = useEnv()
    const role = `${audience}/roles`

    return (
        <>
            <header className="header fixed-top">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

                    <a href="/" className="logo d-flex align-items-center">
                        <img src="./logo.png" alt="logo" />
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

                            {user && user[role].length !== 0 ? (
                                <li className="dropdown"><a href="/auth/admin/calendar"><span>My Page</span> <i className="bi bi-chevron-down"></i></a>
                                    <ul>
                                        <li><a><AuthenticationButton /></a></li>
                                        <li><a href="/auth/admin/calendar">Calendar</a></li>
                                        <li><a href="/auth/admin/addHouse">Add House</a></li>
                                        <li><a href="/auth/admin/viewRentalHouses">View Rental House</a></li>
                                        <li><a href="/auth/admin/viewUsers">View users</a></li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="dropdown"><a href="/auth/profile"><span>My Page</span> <i className="bi bi-chevron-down"></i></a>
                                    <ul>
                                        <li><a><AuthenticationButton /></a></li>
                                        <li><a href="/auth/profile">Profile</a></li>
                                        <li><a href="/auth/calendar">Calendar</a></li>
                                    </ul>
                                </li>
                            )}



                            {/* <li className="dropdown"><a href="/auth/profile"><span>My Page</span> <i className="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li><a><AuthenticationButton /></a></li>
                                    <li><a href="/auth/profile">Profile</a></li>
                                    <li><a href="/auth/calendar">Calendar</a></li>
                                </ul>
                            </li> */}

                            <li><Link smooth className="nav-link scrollto" to="#contact">Contact</Link></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                </div>
            </header>
        </>
    )
}
