import React from 'react';
import ViewAllUsersTable from '../components/Table/ViewAllUsersTable';
import Loader from '../components/Loader'
import AdminSidebarNav from '../components/AdminSidebarNav';

import { Navigate } from 'react-router-dom';
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

const ViewAllUsers = () => {

    const { user } = useAuth0()
    const { audience } = useEnv()
    const role = `${audience}/roles`

    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/" />
            </>
        )
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <ViewAllUsersTable />
        </div>
    );
};

export default withAuthenticationRequired(ViewAllUsers, {
    onRedirecting: () => <Loader />,
})