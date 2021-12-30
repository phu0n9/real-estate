import React from 'react';
import { Navigate } from 'react-router';
import '../stylesheet/Location.css'

const AdsCategoryCard = ({ url, city, color}) => {

    const viewHouse = () => {
        Navigate("/rental/" + city)
    }

    return (
        <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="100">
            <div className="box">
                <h3 style={{color: color}}>{city}</h3>
                <img src={url} className="img-fluid" style={{height: "350px",width:"400px"}} alt=""/>
                <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                </ul>
                <a href="/" className="btn-buy">Explore</a>
            </div>
        </div>
    );
};

export default AdsCategoryCard;