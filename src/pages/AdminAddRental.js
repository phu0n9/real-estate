import React from 'react';
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import AddRentalForm from '../components/AddRentalForm';

const AdminAddRental = () => {
    const { user, getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()
    const role = `${audience}/roles`

    // if logged in user is not admin
    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/unauthorized" />
            </>
        )
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <AddRentalForm />
        </div>
    );
};

export default withAuthenticationRequired(AdminAddRental, {
    onRedirecting: () => <Loader />,
})
