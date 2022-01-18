import React from 'react'
import '../../stylesheet/homepage/ValueSection.css'
import img1 from '../../img/value/values-1.png'
import img2 from '../../img/value/values-2.png'
import img3 from '../../img/value/values-3.png'

export default function ValueItem() {
    var valueList = [{
        'image':img1,
        'title':'PROPERTY MANAGEMENT',
        'description':'Looking out for your best interest and we relive you of all the stress.'},
        {'image':img2,
        'title':'MORTGAGES & FINANCIAL SERVICES',
        'description':'Looking for a mortgage? Refinancing, loans. We have accuss to over 30 banks & lenders.'},
        {'image':img3,
        'title':'TENANTS',
        'description':'Download our application for a rental unit. Get your Equifax full Credit Report.'
        }]
    return (
        valueList.map((values,index)=>{
            return  <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200" key={index}>
            <div className="box">
              <img src={values.image} className="img-fluid" alt="value"/>
              <h3>{values.title}</h3>
              <p>{values.description}</p>
            </div>
          </div>
        })
       
    )
}
