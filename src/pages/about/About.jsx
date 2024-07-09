import React from 'react'
import './style.css'
import about from '../../assets/images/abt.svg'
const About = () => {
  return (
    <section class="about-section">
    <div class="container">
        <div class="row">                
            <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                <div class="inner-column">
                    <div class="sec-title">
                        <h3 class="title">About Store268</h3>
                        <span>We are Creative Tech Enthusiast working since 2015</span>
                    </div>
                    <div class="text">I am Rahul Yaduvanshi works at Css3 Transition since last 3 years. We are here to provide touch notch solution for your website or web application that helps you to make your website look attractive & efficient in handling by creating usefull plugins thats you need.</div>
                  <div class="text">
                    We are here to serve you next level tutorial that currently in trend to match you with your expertise. Css3 transition is a learning website. where you can find many good quality content related to web development and tutorials about plugins. here we are using html, html5, css, css3, jquery & javascript along with inspirational UI design layout by professionals by using Photoshop and adobe allustrator.
                  </div>
                    <div class="btn-box">
                        <a href="#" class="theme-btn btn-style-one">Contact Us</a>
                    </div>
                </div>
            </div>

            <div class="image-column col-lg-6 col-md-12 col-sm-12">
                <div class="inner-column wow fadeInLeft">
                  
                    <figure class="image-1"><a href="#" class="lightbox-image" data-fancybox="images">
                      <img title="Rahul Kumar Yadav" src={about} alt=""/></a></figure>
                 
                </div>
            </div>
          
        </div>
      
        <div className="sec-title pt-3">
          <span className="title">Our Future Goal</span>
          <h2>Leading the Way in E-commerce Innovation & Technology</h2>
        </div>
        <div className="text">
          We strive to push the boundaries of e-commerce by integrating cutting-edge technology and innovative solutions into our platform. Our goal is to enhance your shopping experience with a user-friendly interface, fast and reliable service, and a diverse range of products.
        </div>
        <div className="text">
          Our commitment to excellence means we focus on both functionality and design, ensuring that our website and app are not only visually appealing but also highly efficient.
        </div>
        <div className="text">
          We are dedicated to providing valuable content, from product reviews and shopping tips to the latest trends and technological advancements in e-commerce. Our blog features contributions from our team of experts as well as guest posts from our community.
        </div>
        <div className="text">
          We invite you to explore our store, enjoy our curated content, and share your own experiences and insights with us. Together, we can continue to innovate and elevate the e-commerce experience for everyone.
        </div>
        <div className="text">
          Thank you for visiting Store268. We look forward to serving you and making your shopping journey exceptional.
        </div>
      </div>
  
</section>
  )
}

export default About