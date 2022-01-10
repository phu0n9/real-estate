import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import Loader from '../components/Loader'
import { Navigate,useNavigate } from 'react-router-dom';
import { useEnv } from '../context/env.context'

const UpdateHouse = () =>{

    const { user, getAccessTokenSilently } = useAuth0()
    const { audience } = useEnv()
    const role = `${audience}/roles`

    // checking for if users is admin or not
    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/" />
            </>
        )
    }

    return (
        <div>update house</div>
    )
}

export default withAuthenticationRequired(UpdateHouse, {
    onRedirecting: () => <Loader />,
})