import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import '../stylesheet/Navbar.css'

export default function LoginButton() {
    const { loginWithRedirect } = useAuth0()

    return (
      <li>
        <button
        className='login-button'
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
      </li>
    )
}
