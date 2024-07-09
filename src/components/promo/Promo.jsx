import React from 'react'
import Slider from "react-slick";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './promo.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Promo = ({promo}) => {

    var settings = {
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade:true,
        arrows:false,
        
    };
  return (
    <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="promos mb-2">
                        <div className="position-relative">
                        <Slider {...settings} className="home_promo">
                        {promo.map((item) => (
                        <div className="banner-last" key={item.id}>
                        
                            <img src={import.meta.env.VITE_REACT_UPLOAD_URL + item.attributes.img.data[0].attributes.url} alt="" className="w-100"/>

                            <div className="info">
                                <h3 className="banner-head">
                                  {item.attributes.title}
                                </h3>
                                <p>{item.attributes.short_text}</p>
                            <Button className="btn-g shop">Shop Now</Button>
                            </div>
                        
                       </div>
                         ))}
                        </Slider>

                       
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Promo