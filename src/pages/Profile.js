import React from 'react';
import UserSidebarNav from '../components/UserSidebarNav';
import ProfileForm from '../components/ProfileForm';
import Loader from '../components/Loader'
import { withAuthenticationRequired} from "@auth0/auth0-react";

const Profile = () => {

    return (
        <>
            <UserSidebarNav />
            <ProfileForm />
        </>
    );
};

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Loader />,
})