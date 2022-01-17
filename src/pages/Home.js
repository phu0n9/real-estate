import React from 'react';
import Footer from "../components/Footer";
import HomeBanner from '../components/homepage/HomeBanner';
import ValueSection from '../components/homepage/ValueSection'
import Location from '../components/homepage/Location';
import FAQ from '../components/homepage/FAQ';
import HouseList from '../components/homepage/HouseList';
import Contact from '../components/homepage/Contact';

const Home = () => {


    return (
        <div>
            <HomeBanner />
            <ValueSection />
            <br />
            <Location />
            <br />
            <FAQ />
            <br />
            <HouseList />
            <br />
            <Contact />
            <br />
            <Footer />
        </div>
    );
};

export default Home;