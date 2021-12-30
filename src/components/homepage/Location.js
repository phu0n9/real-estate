import React from 'react'
import '../../stylesheet/Location.css'
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
                <AdsCategoryCard url={"https://t1.daumcdn.net/cfile/tistory/99E8CD465C36DCB21E"} city={"Ho Chi Minh"} color={"#07d5c0"}/>
                <AdsCategoryCard url={"https://a.cdn-hotels.com/gdcs/production15/d285/b90976f4-c7fd-4935-b697-d1801234452e.jpg"} city={"Ha Noi"} color={"#65c600"}/>
                <AdsCategoryCard url={"https://ww.namu.la/s/10e70d363ee30b79c6e6328083808305a1b89313b39eec103351c6dfbac8ecb2b8062c08d9577a0fdf63dd291f6e954ebfe037fac44fd69e2e11d033e6bbe1c35dc31f0f3ce446f7a49580d8840b291509b262b4c59e59d87750049f598fc5b3"} city={"Da Nang"} color={"#ff901c"}/>
                <AdsCategoryCard url={"https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/7ab5e6ef-9b4a-49b1-9e91-49a11f9ebe62.jpeg"} city={"Ha Long Bay"} color={"#ff0071"} />
            </div>
          </div>
        </section>
    )
}
