import React,{useEffect} from 'react'
import '../stylesheet/redirect-page.css'
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../components/Loader';

export default function Processing() {
    const loadingImg = "https://st3.depositphotos.com/1432405/12835/v/450/depositphotos_128353394-stock-illustration-hourglass-icon-cartoon-style.jpg";
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
            <img src={loadingImg} alt="processing-request" className='resize' style={{marginLeft:"10%"}}/>
            <h2>Proccesing your request</h2>
            <p style={{marginLeft:"15%"}}>Redirect to homepage</p>
        </div>
    )
}
