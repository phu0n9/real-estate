import React from 'react'
import '../../stylesheet/homepage/Contact.css'

export default function Contact() {
    return (
    <section id="contact" className="contact">

      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>Contact</h2>
          <p>Contact Us</p>
        </header>

        <div className="row gy-4">
            <div className="row gy-4">

              <div className="col-md-6">
                <div className="info-box">
                  <i className="bi bi-geo-alt"></i>
                  <h3>Address</h3>
                  <p>
                  RMIT University <br/>
                  702 Nguyen Van Linh, District 7<br/>
                  Ho Chi Minh City, Viet Nam <br/><br/>
                </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="info-box">
                  <i className="bi bi-telephone"></i>
                  <h3>Call Us</h3>
                  <p>
                    Long: (+84) 063-881-2763
                  <br/>
                    Trang: (+84) 029-266-9621
                  <br/>
                    Phuong: (+84) 024-612-4518
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="info-box">
                  <i className="bi bi-envelope"></i>
                  <h3>Email Us</h3>
                  <p>Real Estate Agency<br/>eeet2582.realestatemgt@gmail.com</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="info-box">
                  <i className="bi bi-clock"></i>
                  <h3>Open Hours</h3>
                  <p>Monday - Friday<br/>9:00AM - 05:00PM</p>
                </div>
              </div>

            </div>

        </div>

      </div>

    </section>
    )
}
