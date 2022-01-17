<<<<<<< HEAD
import React from 'react';
import Loader from '../components/Loader'
import AdminViewAllRentalsTable from '../components/Table/AdminViewAllRentalsTable';
import { Navigate } from 'react-router-dom';
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

const AdminViewRentalHouses = () => {

    const { user } = useAuth0()
    const { audience } = useEnv()
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
        <div>
            <br />
            <br />
            <br />
            <AdminViewAllRentalsTable />
        </div>
    );
};

export default withAuthenticationRequired(AdminViewRentalHouses, {
    onRedirecting: () => <Loader />,
=======
import React from 'react';
import Loader from '../components/Loader'
import AdminViewAllRentalsTable from '../components/Table/AdminViewAllRentalsTable';
import { Navigate } from 'react-router-dom';
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

const AdminViewRentalHouses = () => {

    const { user } = useAuth0()
    const { audience } = useEnv()
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
        <div>
            <br />
            <br />
            <br />
            <AdminViewAllRentalsTable />
        </div>
    );
};

export default withAuthenticationRequired(AdminViewRentalHouses, {
    onRedirecting: () => <Loader />,
>>>>>>> dc52a23 (add)
})