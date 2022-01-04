import React from 'react'
import BlogItem from './BlogItem'
import '../../stylesheet/homepage/BlogRow.css'

export default function BlogRow() {
    return (
    <section className="recent-blog-posts">

      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>Blog</h2>
          <p>Recent posts form our Blog</p>
        </header>

        <div className="row">
          <BlogItem/>
        </div>

      </div>

    </section>
    )
}
