import React from 'react';
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom';
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import ViewAllRentalsTable from '../components/Table/ViewAllRentalsTable';

const ViewRentalHouses = () => {

    const { user } = useAuth0()
    const { audience } = useEnv()
    const role = `${audience}/roles`

    // if logged in user is admin
    if (user[role].length !== 0) {
        return (
            <>
                <Navigate replace to="/auth/admin/viewRentalHouses" />
            </>
        )
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <ViewAllRentalsTable />
        </div>
    );
};


export default withAuthenticationRequired(ViewRentalHouses, {
    onRedirecting: () => <Loader />,
})