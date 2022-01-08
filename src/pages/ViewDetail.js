import React, { useEffect, useState } from 'react';
import axios from 'axios'
import MapSection from '../components/map/Map'
import Button from 'react-bootstrap/Button'
import '../App.css'
import '../stylesheet/Details.css'
import { useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Badge from 'react-bootstrap/Badge'

const ViewDetail = () => {
    let slider = []
    const { id } = useParams();
    const [house, setHouse] = useState([]);
    const [location, setLocation] = useState({});
    const [images,setImages] = useState([])
    const [status, setStatus] = useState('')
    const [type, setType] = useState('')

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };

    const bookMeeting = () => {
        navigate("/BookMeeting/" + house.houseId)
    }    

    const navigate = useNavigate();
    useEffect(() => {
        const getData = async() => {
            await axios.get(`http://localhost:8080/api/v1/houses/${id}`)
                .then((res) => {
                    setHouse(res.data);
                    setLocation({
                        address: res.data.address,
                        lat: res.data.latitude,
                        lng: res.data.longitude
                    })
                    setImages(res.data.image)
                    setStatus(res.data.status)
                    setType(res.data.type)
                })
                .catch((error)=>{console.error(error)})
        }
        getData();
    }, [id]);
    
    return (
    <div>
        <section id="portfolio-details" className="portfolio-details">
        <div className="container">
            <div className="row gy-4">
            <div className="col-lg-8">
                <Slider {...settings}>
                    {images.map((image,index)=>{
                        return <div key={index}>
                            <img className="d-inline-block w-100 h-100" src={image} alt="house" />
                    </div>
                    })}
                </Slider>
                <div className="portfolio-description">
                    <h2>House Description</h2>
                    <p>
                        {house.description}
                    </p>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="portfolio-info">
                    <h3>{house.name}</h3>
                    <ul>
                        <li><strong>House Price</strong>: {house.price}</li>
                        <li><strong>Address</strong>: {house.address}</li>
                        <li><strong>Number of Beds</strong>: {house.numberOfBeds}</li>
                        <li><strong>Type</strong>: 
                            <Badge pill bg={type === 'street' ? "warning" : type === 'apartment' ? "info" : "success"}>
                                {house.type}
                            </Badge>{' '}
                        </li>
                        <li><strong>Status</strong>: 
                            <Badge pill bg={status === 'reserved' ? "info" : status === 'available' ? "success" : "warning"}>
                                {house.status}
                            </Badge>{' '}
                        </li>
                    </ul>
                </div>
                <div className="portfolio-description" style={{paddingLeft: 50}}>
                    <Button variant="primary" onClick={bookMeeting} style={{ height: '3rem' }}>Book A Meeting</Button>{' '}
                    <Button variant="success" style={{ height: '3rem' }}>Deposit Money</Button>{' '}
                </div>
                
                <div className="portfolio-description">
                    <h2>Map Information</h2>
                    <MapSection location={location} zoomLevel={3}/>
                </div>
            </div>
            </div>
        </div>
        </section>
    </div>
    );
};

export default ViewDetail;