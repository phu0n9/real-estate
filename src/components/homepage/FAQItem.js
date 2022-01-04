import React,{useState} from 'react'
import '../../stylesheet/homepage/FAQ.css'

export default function FAQItem({ question,answer,index}) {

    const [buttonClick, setButtonClicked] = useState(false)

    return (
        <div className="accordion-item" key={index}>
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" onClick={() => setButtonClicked(!buttonClick)}>
            {question}
          </button>
        </h2>
        <div className={buttonClick ? "accordion-collapse": "accordion-collapse collapse"} >
          <div className="accordion-body">
              {answer}
          </div>
        </div>
      </div>
    )
}
