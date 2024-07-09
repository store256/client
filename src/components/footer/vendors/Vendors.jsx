import React from 'react'

import Slider from "react-slick";
import './vendors.css'
import sam from '../../../assets/images/cat/sam.png';
import med from '../../../assets/images/cat/med.png'
import ip from '../../../assets/images/cat/ip.png'

import nas from '../../../assets/images/cat/nas.png'

import com from '../../../assets/images/cat/com.png'
import lg from '../../../assets/images/cat/lg.jpeg'
import tcl from '../../../assets/images/cat/tcl.jpeg'
import bag from '../../../assets/images/cat/bag.png'
import bed from '../../../assets/images/cat/bed.png'
import sh from '../../../assets/images/cat/sh.png'
const Vendors = () => {

    var settings = {
        dots:false,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade:false,
        arrows:false,
        autoplay:true,
    };
  return (
    <>
    <div className='brandsSliderSection'>
        <div className="container-fluid">
            <h3 className=" mb-3">Brands</h3>
            <Slider {...settings} className="brand_slider_main">
               <div className="item">
                <div className="info">
                    <img src={sam} alt="" />
                    
                </div>
               </div>
               <div className="item">
                <div className="info">
                    <img src={med} alt="" />
                  
                </div>
               </div>
               <div className="item">
                <div className="info">
                    <img src={ip} alt="" />
                   
                </div>
               </div>
               <div className="item">
                <div className="info">
                    <img src={com} alt="" />
                   
                </div>
               </div>
               <div className="item">
                <div className="info">
                    <img src={nas} alt="" />
                   
                </div>
               </div>
                <div className="item">
                <div className="info">
                    <img src={lg} alt="" />
                   
                </div>
               </div>
               <div className="item">
                <div className="info">
                    <img src={tcl} alt="" />
                   
                </div>
               </div>
             
            </Slider>
        </div>

    </div>
    </>
  )
}

export default Vendors