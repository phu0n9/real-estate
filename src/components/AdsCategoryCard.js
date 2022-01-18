import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import '../stylesheet/homepage/Location.css'

const AdsCategoryCard = ({ url, city, color }) => {

    const viewHouse = () => {
        Navigate("/rental")
    }

    return (
        <div className="col-lg-6 col-md-6" data-aos="zoom-in" data-aos-delay="100">
            <div className="box">
                <h3 style={{ color: color }}>{city}</h3>
                <img src={url} className="img-fluid" style={{ height: "350px", width: "400px" }} alt="" />
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <Link to='/rental' state={{ data: "hello" }}>
                    Explore
                </Link>

                {/* <a href="/rental" city={city} className="btn-buy">Explore</a> */}
            </div>
        </div>
    );
};

export default AdsCategoryCard;