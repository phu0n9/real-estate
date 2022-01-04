import React from 'react';
import Loader from '../components/Loader'
import AdminSidebarNav from '../components/AdminSidebarNav';

import { Navigate } from 'react-router-dom';  
import { useEnv } from '../context/env.context'
import { useAuth0,withAuthenticationRequired } from "@auth0/auth0-react"

const ViewRentalHouses = () => {

    const { user} = useAuth0()
    const { audience } = useEnv()
    const role = `${audience}/roles`

    if(user[role].length === 0){
        return (
            <>
                <Navigate replace to="/" />
            </>
        )
    }

    return (
        <div>
            <AdminSidebarNav />
        </div>
    );
};

export default withAuthenticationRequired(ViewRentalHouses, {
    onRedirecting: () => <Loader />,
})