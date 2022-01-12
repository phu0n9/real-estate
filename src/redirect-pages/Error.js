import React, { useEffect } from 'react'
import '../stylesheet/redirect-page.css'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAuth0 } from "@auth0/auth0-react";

export default function Error() {
    const loadingImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Feedbin-Icon-error.svg/1280px-Feedbin-Icon-error.svg.png";
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
            <img src={loadingImg} alt="request" className='resize' />
            <h2 style={{ marginLeft: "5%" }}>Try again later</h2>
            <p style={{ marginLeft: "10%" }}>Redirect to homepage</p>
        </div>
    )
}
