import React from 'react'
import '../../stylesheet/ValueSection.css'
import ValueItem from './ValueItem'

export default function ValueSection() {
    return (
    <section className="values">

      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>Our Values</h2>
          <p>Odit est perspiciatis laborum et dicta</p>
        </header>

        <div className="row">
          <ValueItem/>
        </div>
      </div>
    </section>
    )
}
