import React from 'react'
import '../../stylesheet/homepage/FAQ.css'
import FAQItem from './FAQItem'

export default function FAQ() {
    var firstColumn = [
        {"Non consectetur a erat nam at lectus urna duis?":"Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non."},
        {"Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?":"Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui."},
        {"Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi?":"Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis"}
    ]

    var secondColumn = [
        {"Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?":"Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui."},
        {"Tempus quam pellentesque nec nam aliquam sem et tortor consequat?":"Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in"},
        {"Varius vel pharetra vel turpis nunc eget lorem dolor?":"Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Nibh tellus molestie nunc non blandit massa enim nec."}
    ]
    
    return (
    <section className="faq">

      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>F.A.Q</h2>
          <p>Frequently Asked Questions</p>
        </header>

        <div className="row">
          <div className="col-lg-6">
            <div className="accordion accordion-flush">
                {
                    firstColumn.map((questions,index)=>{
                        return <FAQItem question={Object.keys(questions)} answer={Object.values(questions)} index={index} key={index}/>
                    })
                }
            </div>
          </div>

          <div className="col-lg-6">
            <div className="accordion accordion-flush">
                {
                    secondColumn.map((questions,index)=>{
                        return <FAQItem question={Object.keys(questions)} answer={Object.values(questions)} key={index}/>
                    })
                }
            </div>
          </div>

        </div>

      </div>

    </section>
    )
}
