import React, { useEffect } from 'react'
import '../stylesheet/redirect-page.css'
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../components/Loader';

export default function Success() {
    const loadingImg = "https://icons.veryicon.com/png/o/miscellaneous/cloud-call-center/success-24.png";
    let navigate = useNavigate()
    const { isLoading } = useAuth0();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 7000)
    }, [navigate])

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="redirect-page-wrapper">
            <img src={loadingImg} alt="success-request" className='resize' />
            <h2>Request succeed</h2>
            <p style={{ marginLeft: "10%" }}>Redirect to homepage</p>
        </div>
    )
}
