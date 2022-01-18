import React from 'react';
import '../stylesheet/Footer.css'

const Footer = () => {
return (
  <footer className="footer">

    <div className="footer-top">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-info">
            <a href="/" className="logo d-flex align-items-center">
              <img src="logo.png" alt="logo"/>
              <span>Reado</span>
            </a>
            <p>We are team of talented designers making websites with Bootstrap.</p>            
            <p>Team Project - Software Architecture and Design</p>
            <div className="social-links mt-3">
              <a href="/" className="twitter"><i className="bi bi-twitter"></i></a>
              <a href="/" className="facebook"><i className="bi bi-facebook"></i></a>
              <a href="/" className="instagram"><i className="bi bi-instagram"></i></a>
              <a href="/" className="linkedin"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

         
          <div className="col-lg-2 col-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i className="bi bi-chevron-right"></i> <a href="/rental">Rent a house</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="/myPage">View Calendar</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="/auth/ViewRentalHouses">View Rentals</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="/auth/admin/viewAllDeposits">View Deposits</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Our Team Members</h4>
            <p>
              Trang Nguyen - s3751450 <br/>
              Anh Phuong - s3695662 <br/>
              Nguyen Le - s3777242 <br/>
              Sung Jin - s3695340 <br/>
              Long Tran - s3755614 <br/>
            </p>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>
              RMIT University <br/>
              702 Nguyen Van Linh, District 7<br/>
              Ho Chi Minh City, Viet Nam <br/><br/>
            </p>

          </div>

        </div>
      </div>
    </div>

    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong><span>Reado</span></strong>. All Rights Reserved
      </div>
      
    </div>
  </footer>
    );
};

export default Footer;