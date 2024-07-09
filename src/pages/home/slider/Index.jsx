import React, { useState, useEffect } from "react";
import "./index.css";
import Slider from "react-slick";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Sliders = ({ banners }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const settings = {
        dots: windowWidth < 992 ? false : true,
        lazyLoad: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        arrows: true,
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="homeSlider mb-2 ">
                        <div className="position-relative">
                            <Slider {...settings} className="home_slider_main">
                                {banners?.map((banner) => (
                                    <div className="item" key={banner.id}>
                                        <img
                                            src={`${import.meta.env.VITE_REACT_UPLOAD_URL}${banner.attributes.img.data[0].attributes.url}`}
                                            alt=""
                                            className="w-100"
                                        />
                                        <div className="info">
                                            <h2 className="mb-3">{banner.attributes.desc}</h2>
                                            <p style={{ width: windowWidth < 992 ? '220px' : 'auto' }}>
                                                {banner.attributes.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>

                            <div className="orderBtn">
                                <Link to="/products">
                                    <Button className="bg-g text-white">
                                        <ShoppingCartOutlinedIcon fontSize="small" className="m-1" />
                                        Order Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sliders;
