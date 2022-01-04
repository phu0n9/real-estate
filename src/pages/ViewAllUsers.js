import React from 'react';
import AdminSidebarNav from '../components/AdminSidebarNav';
import ViewAllUsersTable from '../components/Table/ViewAllUsersTable';
import Loader from '../components/Loader'
import { withAuthenticationRequired} from "@auth0/auth0-react"

const ViewAllUsers = () => {
    return (
        <div>
            <AdminSidebarNav />
            <ViewAllUsersTable />
        </div>
    );
};

export default withAuthenticationRequired(ViewAllUsers, {
    onRedirecting: () => <Loader />,
})