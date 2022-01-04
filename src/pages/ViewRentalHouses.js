import React from 'react';
import AdminSidebarNav from '../components/AdminSidebarNav';
import Loader from '../components/Loader'
import { withAuthenticationRequired} from "@auth0/auth0-react"

const ViewRentalHouses = () => {
    return (
        <div>
            <AdminSidebarNav />
        </div>
    );
};

export default withAuthenticationRequired(ViewRentalHouses, {
    onRedirecting: () => <Loader />,
})