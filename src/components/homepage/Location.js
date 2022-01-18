import React from 'react'
import '../../stylesheet/homepage/Location.css'
import AdsCategoryCard from '../AdsCategoryCard'

export default function Location() {
  return (
    <section className="location">

      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>Locations</h2>
          <p>Check our location</p>
        </header>

        <div className="row gy-4" data-aos="fade-left">
          <AdsCategoryCard url={"https://t1.daumcdn.net/cfile/tistory/99E8CD465C36DCB21E"} city={"Ho Chi Minh"} color={"#07d5c0"} />
          <AdsCategoryCard url={"https://a.cdn-hotels.com/gdcs/production15/d285/b90976f4-c7fd-4935-b697-d1801234452e.jpg"} city={"Ha Noi"} color={"#65c600"} />
        </div>
      </div>
    </section>
  )
}
