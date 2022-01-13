import React,{useEffect} from 'react'
import '../stylesheet/redirect-page.css'
import {useNavigate} from 'react-router-dom';
import Loader from '../components/Loader';
import { useAuth0 } from "@auth0/auth0-react";

export default function NotFound() {
    const loadingImg = "https://cdn.iconscout.com/icon/free/png-256/page-not-found-5-530376.png";
    let navigate = useNavigate()
    const { isLoading } = useAuth0();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000)
      }, [navigate])

      if (isLoading) {
        return <Loader />;
      }

    return (
        <div className="redirect-page-wrapper">
            <img src={loadingImg} alt="request" className='resize'/>
            <h2 style={{marginLeft:"5%"}}>Page not found</h2>
            <p style={{marginLeft:"10%"}}>Redirect to homepage</p>
        </div>
    )
}
