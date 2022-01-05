import React from 'react';

import HomeBanner from '../components/homepage/HomeBanner';
import ValueSection from '../components/homepage/ValueSection'
import Location from '../components/homepage/Location';
import FAQ from '../components/homepage/FAQ';
import HouseList from '../components/homepage/HouseList';
import BlogRow from '../components/homepage/BlogRow';
import Contact from '../components/homepage/Contact';

const Home = () => {


    return (
        <div>
            <HomeBanner />
            <ValueSection/>
            <br />
            <Location/>
            <br />
            <FAQ/>
            <br />
            <HouseList/>
            <br />
            <BlogRow/>
            <br />
            <Contact/>

        </div>
    );
};

export default Home;