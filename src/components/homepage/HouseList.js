import React from 'react'
import '../../stylesheet/HouseItem.css'
import HouseItem from './HouseItem'

export default function HouseList() {
    return (
        <section className="item">
            <div className="container" data-aos="fade-up">
                <header className="section-header">
                    <a href="/rental" title="Rental"><h2>House Item</h2></a>
                    <p>See anything you like?</p>
                </header>
        
                <div className="row gy-4 item-container" data-aos="fade-up" data-aos-delay="200">
                    <HouseItem/>
                </div>

            </div>

        </section>
    )
}
