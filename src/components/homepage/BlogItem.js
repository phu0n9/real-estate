import React from 'react'
import '../../stylesheet/BlogRow.css'
import img1 from '../../img/blog/blog-1.jpg'
import img2 from '../../img/blog/blog-2.jpg'
import img3 from '../../img/blog/blog-3.jpg'

export default function BlogItem() {
    var blogPosts = [
        {'image':img1,
        'date':'Tue, September 15',
        'title':'Eum ad dolor et. Autem aut fugiat debitis voluptatem consequuntur sit'},
        {'image':img2,
        'date':'Fri, August 28',
        'title':'Et repellendus molestiae qui est sed omnis voluptates magnam'},
        {'image':img3,
        'date':'Mon, July 11',
        'title':'Quia assumenda est et veritatis aut quae'}
    ]

    return (
        blogPosts.map((posts,index)=>{
            return <div className="col-lg-4" key={index}>
            <div className="post-box">
              <div className="post-img"><img src={posts.image} className="img-fluid" alt="blog-pic"/></div>
              <span className="post-date">{posts.date}</span>
              <h3 className="post-title">{posts.title}</h3>
              <a href="blog-single.html" className="readmore stretched-link mt-auto"><span>Read More</span></a>
            </div>
          </div>
        })
    )
}
