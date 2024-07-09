import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import Slider from "react-slick";
import Banners from "../../components/banners/Banners";
import SlidersBanner from "./slider/Index";
import Promo from "../../components/promo/Promo";
import Catslider from "../../components/catSlider/Index";
import Product from "../../components/products/Product";
import bannerp from "../../assets/images/bans.png";
import TopProducts from "./TopProducts/TopProducts";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { Link, useNavigate } from "react-router-dom";
import head from "../../assets/images/head.svg";
import { Context } from "../../../utils/Context";
import { fetchDataFromApi } from "../../../utils/api";
import { Button, Pagination } from "@mui/material";
import PopUp from "../../components/popup/PopUp";

const Index = ({ title }) => {
  const [activeIndexTab, setActiveIndexTab] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Adjust the number of products per page
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [flashSaleData, setFlashSaleData] = useState({
    duration: 0,
    products: []
});
const [open, setOpen] = useState(false);

  const {
    banner,
    setBanner,
    categories,
    setCategories,
    products,
    setProducts,
    smallBanner,
    setSmallBanner,
    section,
    setSection,
    sec,
    setSec,
    promo,
    setPromo,
  } = useContext(Context);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getCategories();
    getBanners();
    getProducts();
    getPromos();
    getProductSection();
    getProductBySection();
  }, []);

  const getBanners = () => {
    fetchDataFromApi("/banners?populate=*").then((res) => {
      setBanner(res.data);
    });
  };

  const getCategories = () => {
    fetchDataFromApi("/categories?populate=*").then((res) => {
      setCategories(res.data);
    });
  };

  const getPromos = () => {
    fetchDataFromApi("/promos?populate=*").then((res) => {
      setPromo(res.data);
    });
  };

  // fetching product by section
  const getProductSection = async () => {
    try {
      const res = await fetchDataFromApi("/products?populate=*");
      const filteredProducts = res.data.filter((product) =>
        product.attributes.sections.data.some((section) =>
          ["featured", "popular", "trending"].includes(
            section.attributes.name.toLowerCase()
          )
        )
      );
      setSection(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductBySection = async () => {
    try {
      const res = await fetchDataFromApi("/products?populate=*");
      const filteredProducts = res.data.filter((product) =>
        product.attributes.sections.data.some((section) =>
          ["trending", "top_selling", "recent", "top_rated"].includes(
            section.attributes.name.toLowerCase()
          )
        )
      );
      setSec(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveIndexTab(categoryId);

    if (categoryId === "all") {
      getProducts();
    } else {
      getProducts(categoryId);
    }
    setCurrentPage(1);
  };

  const navigateToProduct = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  const getProducts = async (categoryId) => {
    let apiUrl = "/products?populate=*";
    if (categoryId) {
      apiUrl += `&categories.id=${categoryId}`;
    }

    try {
      const res = await fetchDataFromApi(apiUrl);

      const filteredProducts = categoryId
        ? res.data.filter((product) => {
            const categories = product.attributes.categories.data;
            return (
              categories &&
              categories.length > 0 &&
              categories[0].id === categoryId
            );
          })
        : res.data;

      setProducts(shuffleArray(filteredProducts));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );


  useEffect(() => {
    const fetchFlashSaleData = async () => {
        fetchDataFromApi('/flashes?populate[product][populate]=img').then(res => {
            const flashSale = res.data[0];
            console.log('Flash Sale Data:', flashSale);

            const startTime = new Date(flashSale.attributes.createdAt).getTime();
            const duration = flashSale.attributes.duration * 1000; // convert to milliseconds
            const endTime = startTime + duration;
            const currentTime = new Date().getTime();
            const timeLeft = Math.max(0, endTime - currentTime);
          

            const products = flashSale.attributes.product.data ? [flashSale.attributes.product.data].map(product => ({
                id: product.id,
                title: product.attributes.title,
                price: product.attributes.price,
                imageUrl: product.attributes.img?.data[0]?.attributes?.url || '' 
            })) : [];

            setFlashSaleData({
                duration: timeLeft / 1000, // convert back to seconds
                desc: flashSale.attributes.desc,
                products: products
            });

            if (timeLeft > 0) {
                setOpen(true); // Open the popup if the flash sale is still ongoing
            }
        }).catch(error => {
            console.error('Error fetching flash sale data:', error);
        });
    };

    fetchFlashSaleData();
}, []);

const handleClose = () => {
    setOpen(false);
};

  return (
    <div>
      <SlidersBanner banners={banner} />
      <Catslider categories={categories} />
      <Banners smallBanner={smallBanner} />

            <PopUp
                open={open}
                handleClose={handleClose}
                duration={flashSaleData.duration}
                description={flashSaleData.desc}
                products={flashSaleData.products}
            />
      <div className="homeProducts homeProductsTitleWrapper">
        <div className="container-fluid">
          <div className="d-flex align-items-center homeProductsTitleWrap">
            <h4 className="cd-hd mb-0 mt-0 res-full">Popular Products</h4>
            <ul className="list list-inline ml-auto filterTab mb-0 res-full">
              <li
                className={`list-inline-item ${
                  activeIndexTab === "all" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("all")}
              >
                <a className="cursor text-capitalize">All</a>
              </li>
              {categories.map((item) => (
                <li
                  key={item.id}
                  className={`list-inline-item ${
                    activeIndexTab === item.id ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(item.id)}
                >
                  <a className="cursor text-capitalize">
                    {item.attributes.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="productRow">
            {currentProducts.length === 0 ? (
              <div className="no-products-found">
                <h5>No products found</h5>
              </div>
            ) : (
              currentProducts.map((item) => (
                <div
                  className="item cursor"
                  key={item.id}
                  onClick={() => navigateToProduct(item.id)}
                >
                  <Product
                    tag={
                      item.attributes.product_states.data[0].attributes.title
                    }
                    image={
                      import.meta.env.VITE_REACT_UPLOAD_URL +
                      item.attributes.img.data[0].attributes.url
                    }
                    category={
                      item.attributes.categories.data[0].attributes.title
                    }
                    title={
                      item.attributes.title.length > 20
                        ? item.attributes.title.substring(0, 18) + "..."
                        : item.attributes.title
                    }
                    rating={item.attributes.rating}
                    brand={
                      item.attributes.vendor?.data?.attributes?.title || ""
                    }
                    price={`GH₵ ${new Intl.NumberFormat().format(
                      item.attributes.price
                    )}`}
                    oldPrice={`GH₵ ${new Intl.NumberFormat().format(
                      item.attributes.old_price || 0
                    )}`}
                  />
                </div>
              ))
            )}
          </div>
          <div className="pagination">
            <Pagination
              count={Math.ceil(products.length / productsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              variant="outlined"
              color="primary"
            />
          </div>
        </div>
      </div>
    

      <Promo promo={promo} />

      {/* best salses */}
      <div className="homeProducts homeProductsRow2 pt-0 mb-3">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <h4 className="cd-hd mb-0 mt-0">Daily Best Sales</h4>

            <ul className="list list-inline ml-auto filterTab mb-0 res-hide">
              <li className="list-inline-item">
                <a href="#" className="">
                  Featured
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="">
                  Popular
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="">
                  New Arival
                </a>
              </li>
            </ul>
          </div>

          <div className="row">
            <div className="col-md-3 pr-3 res-hide slid-banner">
              <img src={bannerp} alt="" className="w-100" />
            </div>

            <div className="col-md-9">
            <Slider {...settings} className="prodSlider">
                {section.map((product) => (
                  <div
                    className="item cursor"
                    key={product.id}
                    onClick={() => navigateToProduct(product.id)}
                  >
                    <Product
                      tag={product.attributes.tag}
                      image={import.meta.env.VITE_REACT_UPLOAD_URL + product.attributes.img.data[0].attributes.url}
                      category={product.attributes.categories.data[0].attributes.title}
                      title={product.attributes.title.length > 20 ? product.attributes.title.substring(0, 15) + '...' : product.attributes.title}
                      rating={product.attributes.rating}
                      brand={
                        product.attributes.vendor?.data?.attributes?.title || ""
                      }
                      price={`GH₵ ${new Intl.NumberFormat().format(product.attributes.price)}`}

                      oldPrice={`GH₵ ${new Intl.NumberFormat().format(product.attributes.old_price || 0)}`}
                    />
                  </div>
                ))}
           </Slider>
            </div>
          </div>
        </div>
      </div>

      {/* banner display... */}
      <div className="banner-lasts">
        <div className="container-fluid">
          <img src={head} alt="" className="w-100" />

          <div className="info">
            <h3 className="banner-head">Turn Up the Volume</h3>
            <p>Discover Quality Audio Products Today</p>
            <Button className="btn-g">Shop Now</Button>
          </div>
        </div>
      </div>

      {/* top products */}
      <div className="topProductsSection">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <TopProducts title="Top Selling" products={sec.filter(product => product.attributes.sections.data.some(section => section.attributes.name.toLowerCase() === "top_selling"))} />
          </div>
          <div className="col">
            <TopProducts title="Trending Products" products={sec.filter(product => product.attributes.sections.data.some(section => section.attributes.name.toLowerCase() === "trending"))} />
          </div>
          <div className="col">
            <TopProducts title="Recently added" products={sec.filter(product => product.attributes.sections.data.some(section => section.attributes.name.toLowerCase() === "recent"))} />
          </div>
          <div className="col">
            <TopProducts title="Top Rated" products={sec.filter(product => product.attributes.sections.data.some(section => section.attributes.name.toLowerCase() === "top_rated"))} />
          </div>
        </div>
      </div>
    </div>

      <FloatingWhatsApp />

      <div className="footer"></div>
    </div>
  );
};

export default Index;
