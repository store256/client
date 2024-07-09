import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import './cat.css';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

const Catslider = ({ categories }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Simulate loading for 2 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    var settings = {
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: windowWidth > 992 ? 5 : 10,
        slidesToScroll: 1,
        fade: false,
        arrows: windowWidth > 992 ? true : false,
        autoplay: windowWidth > 992 ? 2000 : false,
        centerMode: windowWidth > 992 ? true : false
    };

    return (
        <div className='catSliderSection'>
            <div className="container-fluid">
                <h3 className="cat-hd mb-3">Featured Categories</h3>
                {loading ? (
                    // Skeleton Loader
                    <Slider {...settings} className="cat_slider_main">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="item">
                                <div className="info">
                                    <Skeleton variant="circular" width={60} height={60} />
                                    <Skeleton variant="text" width={150} />
                                    <Skeleton variant="text" width={80} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    // Actual Slider Content
                    <Slider {...settings} className="cat_slider_main">
                        {categories.map((item) => (
                            <div key={item.id} className="item">
                                <Link to={`category/${item.id}`} className='text-decoration-none text-dark'>
                                    <div className="info">
                                        <img src={import.meta.env.VITE_REACT_UPLOAD_URL + item.attributes.img.data.attributes.url} 
                                            alt={item.attributes.title} />
                                        <h5>{item.attributes.title.length > 15 ?  item.attributes.title.substring(0, 10)  + '...' : item.attributes.title}</h5>
                                        <p>{item.attributes.products.data.length} items</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    );
};

export default Catslider;
