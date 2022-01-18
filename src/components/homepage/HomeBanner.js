import React from 'react';
import '../../stylesheet/homepage/Banner.css'
import AdsBanner from './AdsBanner';


const HomeBanner = () => {
    return (
    <section className="hero d-flex align-items-center">

        <div className="container">
            <div className="row">
                <div className="col-lg-6 d-flex flex-column justify-content-center">
                    <h1 data-aos="fade-up">We help you find your new home</h1>
                    <h2 data-aos="fade-up" data-aos-delay="400">We offer the best selection of rental properties to suit whatever you need</h2>
                </div>
                    <div className="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
                        <AdsBanner/>
                    </div>
            </div>
        </div>

    </section>
    );
};

export default HomeBanner;