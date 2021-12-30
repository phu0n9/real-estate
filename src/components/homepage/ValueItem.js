import React from 'react'
import '../../stylesheet/ValueSection.css'
import img1 from '../../img/value/values-1.png'
import img2 from '../../img/value/values-2.png'
import img3 from '../../img/value/values-3.png'

export default function ValueItem() {
    var valueList = [{
        'image':img1,
        'title':'Ad cupiditate sed est odio',
        'description':'Eum ad dolor et. Autem aut fugiat debitis voluptatem consequuntur sit. Et veritatis id.'},
        {'image':img2,
        'title':'Voluptatem voluptatum alias',
        'description':'Repudiandae amet nihil natus in distinctio suscipit id. Doloremque ducimus ea sit non.'},
        {'image':img3,
        'title':'Fugit cupiditate alias nobis.',
        'description':'Quam rem vitae est autem molestias explicabo debitis sint. Vero aliquid quidem commodi.'
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
