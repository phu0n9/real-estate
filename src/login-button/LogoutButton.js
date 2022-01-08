import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import '../stylesheet/Navbar.css'

export default function LogoutButton() {
    const { logout } = useAuth0();

    return (
      <li><button className="scrollto login-button" onClick={() =>
        logout({
          returnTo: window.location.origin,
        })}>Log out</button></li>
    )
}
