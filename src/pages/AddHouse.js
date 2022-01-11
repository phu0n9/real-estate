import React from 'react'
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom';
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

import '../stylesheet/addHouse/form-control.css'
import HouseForm from '../components/HouseForm';

const AddHouse = () => {
    const { user} = useAuth0()
    const { audience } = useEnv()
    const role = `${audience}/roles`

    // checking for if users is admin or not
    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/unauthorized" />
            </>
        )
    }

    return (
        <section className="ftco-section">
            <HouseForm pageTitle="Add House"/>
        </section>
    )
}

export default withAuthenticationRequired(AddHouse, {
    onRedirecting: () => <Loader />,
})
