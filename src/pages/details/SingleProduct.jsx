import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Slider from "react-slick";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Product from "../../components/products/Product";
import tv1 from "../../assets/images/cat/tv1.png";
import fr from "../../assets/images/cat/fr.png";
import { Context } from "../../../utils/Context";
import { fetchDataFromApi } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartReducer";
import { addToWishlist } from "../../redux/wishlistReducer";
import { removeFromWishlist } from "../../redux/wishlistReducer";
import { toast } from "react-toastify";
import bnk from '../../assets/bnk.jpg'
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.user);
  const { singleProduct, setSingleProduct } = useContext(Context);
  const dispatch = useDispatch();
  const [zoomImage, setZoomImage] = useState(tv1);
  const [inputValue, setInputValue] = useState(1);
  const zoomSlider = useRef();
  const zoomSliderBig = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isActiveTabs, setIsActiveTabs] = useState(0);
  const [selectColor, setSelectColor] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [activeSizes, setActiveSizes] = useState([]);
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getProduct();
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (singleProduct && singleProduct.length > 0 && singleProduct[0].attributes.size_weight) {
        setActiveSizes(
            new Array(singleProduct[0].attributes.size_weight.length)
                .fill(false)
                .map((value, index) => (index === 0 ? true : value))
        );
    }
}, [singleProduct]);

  const getProduct = async () => {
    const res = await fetchDataFromApi(
      `/products?populate=*&[filters][id]=${id}`
    );
    setSingleProduct(res.data);
    console.log(res.data);
    getReviews(res.data[0].id);

    getRelatedProducts(res.data[0].attributes.categories.data[0].id);
  };

  const getReviews = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/reviews?populate=*&[filters][product]=${id}`,
        {
          headers: headers,
        }
      );

      const sortedReviews = response.data.data.sort(
        (a, b) =>
          new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
      );
      setReviews(sortedReviews);
      console.log("Review data:", sortedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const getRelatedProducts = async (category) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/products?populate=*&[filters][categories][id]=${category}`
      );

      setRelatedProducts(response.data.data);
      console.log("Related products:", response.data.data);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const navigateToProduct = (productId) => {
    isLoading(true);
    window.location.href = `/product/${productId}`;
  };

  const handleColorChange = (colorName) => {
    setSelectColor(colorName);
  };

  const plus = () => {
    setInputValue(inputValue + 1);
  };

  const minus = () => {
    if (inputValue !== 1) {
      setInputValue(inputValue - 1);
    }
  };

  const isActive = (index) => {
    const newActiveSizes = new Array(activeSizes.length).fill(false);
    newActiveSizes[index] = true;
    setActiveSizes(newActiveSizes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !user?.id) {
      console.error("Token or user ID is missing");
      return;
    }

    const reviewData = {
      data: {
        reviewText,
        rating,
        product: id,
        user: user ? [{ name: user.username, img: user.avatarUrl }] : null,
      },
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/reviews`,
        reviewData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReviewText("");
      setRating(0);
      getReviews();
      toast.success("Thank you very much for the review.", {
        hideProgressBar: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response ? error.response.data : error
      );
    }
  };

  const totalReviews = reviews ? reviews.length : 0;

  let totalRating = 0;
  reviews.forEach((review) => {
    totalRating += review.attributes.rating;
  });

  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const countByRating = {};
  reviews.forEach((review) => {
    const rating = review.attributes.rating;
    countByRating[rating] = countByRating[rating]
      ? countByRating[rating] + 1
      : 1;
  });

  var settings2 = {
    dots: false,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  var settings = {
    dots: false,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    fade: false,
    arrows: windowWidth > 992 ? true : false,
  };

  console.log("Related products length:", relatedProducts.length); // Check the length here
  var related = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: relatedProducts.length === 1 ? 1 : 4,
    slidesToScroll: 1,
    autoplay: 3000,
    fade: false,
    arrows: false,
  };

  const goto = (url, index) => {
    setTimeout(() => {
      setZoomImage(url);
    }, 500);
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  return (
    <section className="detailsPage mb-1">
      {windowWidth < 992 && (
        <div className="breadCrumbWrapper mb-2">
          <div className="container-fluid">
            <ul className="breadcrumb breadcrumb2">
              <li>
                <Link to={"/"} style={{ color: "#000" }}>
                  Home
                </Link>
              </li>

              <li>
                {singleProduct.map((item) => {
                  return <span key={item.id}>{item.attributes.title.length > 30 ? item.attributes.title.substring(0, 15) + '...' : item.attributes.title}</span>;
                })}
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="container detailsContainer pt-3 my-3">
        <div className="row">
          <div className="col-md-6">
            <div className="productZoom">
              {singleProduct.map((item) => (
                <Slider
                  {...settings2}
                  className="zoomSliderBig"
                  ref={zoomSliderBig}
                  key={item.id}
                >
                  {item.attributes.gallery.data.map((image, index) => (
                    <div className="item" key={index}>
                      <InnerImageZoom
                        src={
                          import.meta.env.VITE_REACT_UPLOAD_URL +
                          image.attributes.url
                        }
                        zoomType="hover"
                        zoomSrc={
                          import.meta.env.VITE_REACT_UPLOAD_URL +
                          image.attributes.url
                        }
                        zoomScale={1.3}
                      />
                    </div>
                  ))}
                </Slider>
              ))}
            </div>
            {singleProduct.map((item) => (
          <Slider
            {...settings}
            className="zoomSlider"
            ref={zoomSlider}
            key={item.id}
          >
            {item.attributes.gallery.data.map((image, index) => (
              <div className="item" key={index}>
                <img
                  src={
                    import.meta.env.VITE_REACT_UPLOAD_URL +
                    image.attributes.url
                  }
                  alt=""
                  className="w-100 small-img"
                  onClick={() =>
                    goto(
                      import.meta.env.VITE_REACT_UPLOAD_URL +
                        image.attributes.url,
                      index
                    )
                  }
                />
              </div>
            ))}
          </Slider>
            ))}

          </div>

          {/* Product Zoom  end*/}
          {/* Product info */}

          {singleProduct.map((item) => (
            <div className="col-md-6 productInfo mb-3" key={item.id}>
              <h2>{item.attributes.title}</h2>
              <div className="d-flex align-items-center">
                <Rating
                  name="half-rating-read"
                  value={3.5}
                  precision={0.5}
                  readOnly
                />
                <span className="text-secondary ">
                  ({item.attributes.rating} Reviews)
                </span>
              </div>

              <div className="priceSec d-flex align-items-center mb-4">
                <span className="text-g priceLarge">
                  GH₵{new Intl.NumberFormat().format(item.attributes.price)}
                </span>
                <div className="ml-2 d-flex flex-column">
                  {item.attributes.discount ? (
                    <div className="ml-2 d-flex flex-column">
                      <span className="text-org">
                        {item.attributes.discount} off
                      </span>{" "}
                      {/* Change this to '0% off' */}
                    </div>
                  ) : (
                    <div className="ml-2 d-flex flex-column">
                      <span className="text-org">0% off</span>{" "}
                      {/* Display '0% off' */}
                    </div>
                  )}
                  <span className="text-secondary oldprice">
                    <strike>GH₵{new Intl.NumberFormat().format(item.attributes.old_price)}</strike>
                  </span>
                </div>
              </div>
              <h5 className="fw-600">Product Features:</h5>
              {item.attributes.features && item.attributes.features.length > 0 ? (
              item.attributes.features.map((feature, index) => (
                <li key={index}>
                  {feature.children.map((child, idx) => (
                    <span key={idx}>{child.text}</span>
                  ))}
                </li>
              ))
            ) : (
              <li>No features available</li>
            )}

              <div className="addCartSection pt-2 pb-4 d-flex align-items-center">
                <div className="counterSec mr-3">
                  <input type="number" value={inputValue} />
                  <span className="arrow plus" onClick={plus}>
                    <KeyboardArrowUpIcon />
                  </span>
                  <span className="arrow minus" onClick={minus}>
                    <KeyboardArrowDownIcon />
                  </span>
                </div>

                <Button
                  className=" text-capitalize addCart"
                  onClick={() => {
                    // const activeSizeIndex = activeSizes.findIndex(size => size);
                    // if (activeSizeIndex !== -1 && selectColor) {
                    dispatch(
                      addToCart({
                        id: item.id,
                        title: item.attributes.title,
                        price: item.attributes.price,
                        rating: item.attributes.rating,
                        length: item.attributes.img.data.length,
                        img:
                          import.meta.env.VITE_REACT_UPLOAD_URL +
                          item.attributes.img.data[0].attributes.url,
                        inputValue,
                        
                      })
                    );
                    
                  }}
                >
                  <ShoppingCartOutlinedIcon fontSize="small" /> Add to cart
                </Button>

                <Button
                  className="text-capitalize ml-3 icons-small btn-border"
                  onClick={() => {
                    const isItemInWishlist = wishlist.some(
                      (wishlistItem) => wishlistItem.id === item.id
                    );
                    if (isItemInWishlist) {
                      dispatch(removeFromWishlist(item.id));
                    } else {
                      dispatch(
                        addToWishlist({
                          id: item.id,
                          title: item.attributes.title,
                          price: item.attributes.price,
                          rating: item.attributes.rating,
                          img:
                            import.meta.env.VITE_REACT_UPLOAD_URL +
                            item.attributes.img.data[0].attributes.url,
                          inputValue, // Assuming this variable is defined elsewhere
                        })
                      );
                    }
                  }}
                >
                  {wishlist.some(
                    (wishlistItem) => wishlistItem.id === item.id
                  ) ? (
                    <FavoriteIcon fontSize="small" style={{ color: "red" }} />
                  ) : (
                    <FavoriteIcon fontSize="small" style={{ color: "blue" }} />
                  )}
                </Button>
              </div>
           <div className="pt-2">
            <h5 className="fw-bold mr-1">Guaranteed Safe Checkout</h5>
           <img src={bnk} alt="" className="w-100" />
           </div>
            </div>
            
          ))}



           
          {/* Product info end */}
        </div>

        <div className="card mt-5 p-5 detailsPageTabs">
          <div className="customTabs">
            <ul className="list list-inline">
              <li className="list-inline-item">
                <Button
                  className={`${isActiveTabs === 0 && "active"}`}
                  onClick={() => setIsActiveTabs(0)}
                >
                  Description
                </Button>
              </li>
              <li className="list-inline-item">
                <Button
                  className={`${isActiveTabs === 1 && "active"}`}
                  onClick={() => setIsActiveTabs(1)}
                >
                  Additional info
                </Button>
              </li>

              <li className="list-inline-item">
                <Button
                  className={`${isActiveTabs === 2 && "active"}`}
                  onClick={() => setIsActiveTabs(2)}
                >
                  Reviews ({totalReviews})
                </Button>
              </li>
            </ul>

            {isActiveTabs === 0 && (
              <div className="tabContent mt-5" >
                {singleProduct.map((item) => 
                item.attributes.desc && item.attributes.desc.length > 0 ? (
                  item.attributes.desc.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph.children.map((child, idx) => (
                        <span key={idx}>{child.text}</span>
                      ))}
                    </p>
                  ))
                ) : (
                  <p>No description available</p>
                )
                
                )}
              </div>
            )}

            {isActiveTabs === 1 && (
              <div className="tabContent mt-5">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    {singleProduct.map((item) => (
                      <tbody key={item.id}>
                        <tr className="item-size">
                          <th>Mode</th>
                          <td>{item.attributes.title}</td>
                        </tr>
                        <tr className="item-size">
                          <th>Item Size</th>
                          {item.attributes.size_weight && item.attributes.size_weight.length > 0 ? (
                            item.attributes.size_weight.map((size, index) => (
                              <td key={index}>{size.name}</td>
                            ))
                          ) : (
                            <td>Unknown</td>
                          )}

                        </tr>
                        <tr className="item-size">
                          <th>Color</th>
                          {item.attributes.color && item.attributes.color.length > 0 ? (
                          item.attributes.color.map((color, index) => (
                            <td key={index}>{color.name}</td>
                          ))
                        ) : (
                          <td>Unknown</td>
                        )}

                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            )}

            {isActiveTabs === 2 && (
              <div className="tabContent pt-3 reviewBox mt-5">
                <div className="row">
                  <div className="col-md-8">
                    <h4>Customer questions & Answers</h4>

                    {reviews && reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div
                          className="card p-3 reviewCard flex-row"
                          key={review.id}
                        >
                          <div className="image">
                            <div className="rounded-circle">
                              <img
                                src={`${import.meta.env.VITE_REACT_UPLOAD_URL}${
                                  review.attributes.user[0].img
                                }`}
                                alt=""
                              />
                            </div>
                            <span className="text-g d-block text-center font-weight-bold">
                              {review.attributes.user[0].name}
                            </span>
                          </div>

                          <div className="info">
                            <div className="d-flex align-items-center">
                              <h6 className="text-secondary">
                                {new Date(
                                  review.attributes.createdAt
                                ).toLocaleString()}
                              </h6>
                              <div className="ml-auto rate-auto">
                                <Rating
                                  name="half-rating-read"
                                  value={review.attributes.rating}
                                  precision={0.5}
                                  readOnly
                                />
                              </div>
                            </div>

                            <p>{review.attributes.reviewText}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>
                        No reviews yet. Be the first to review this product!
                      </p>
                    )}

                    <form className="reviewForm" onSubmit={handleSubmit}>
                      <h4>Add a Review</h4>
                      {token ? (
                        <>
                          <div className="form-group">
                            <textarea
                              className="form-control mb-2"
                              rows="3"
                              placeholder="Write review"
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <Rating
                              name="user-rating"
                              value={rating}
                              onChange={(event, newValue) =>
                                setRating(newValue)
                              }
                              required
                            />
                          </div>
                          <div className="form-group">
                            <Button
                              type="submit"
                              variant="contained"
                              className="btn-g btn-lg text-capitalize mt-1"
                            >
                              Submit Review
                            </Button>
                          </div>
                        </>
                      ) : (
                        <p>Please log in to submit a review.</p>
                      )}
                    </form>
                  </div>

                  {/* review analysis */}
                  <div className="col-md-4">
                    <h5>Customer reviews</h5>

                    <div className="d-flex align-items-center mt-2">
                      <Rating
                        name="half-rating-read"
                        value={averageRating}
                        precision={0.5}
                        readOnly
                      />
                      <strong>{averageRating.toFixed(1)} out of 5</strong>
                    </div>

                    {/* Display progress bars for each rating level */}
                    {[5, 4, 3, 2.5].map((rating) => (
                      <div
                        key={rating}
                        className="progressbarBox d-flex align-items-center"
                      >
                        <strong className="margin-3">{rating} stars</strong>
                        <div className="progress" style={{ width: "80%" }}>
                          <div
                            className="progress-bar"
                            style={{
                              width: `${
                                (countByRating[rating] / totalReviews) * 100
                              }%`,
                            }}
                          >
                            {countByRating[rating]
                              ? Math.round(
                                  (countByRating[rating] / totalReviews) * 100
                                )
                              : 0}
                            %
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relatedProducts homeProductsRow2 pt-5">
          <h3 className="hd  mt-3">Related Products</h3>
          <Slider {...related} className="prodSlider cursor">
            {relatedProducts.map((product) => (
              <div
                className="item"
                key={product.id}
                onClick={() => navigateToProduct(product.id)}
              >
                <Product
                  tag={product.attributes.tag || "best"}
                  image={
                    import.meta.env.VITE_REACT_UPLOAD_URL +
                      product.attributes.img.data[0].attributes.url || fr
                  }
                  category={product.attributes.categories.data[0]?.attributes.title || "Unknown"}
                  title={
                    product.attributes.title.length > 20
                      ? product.attributes.title.substring(0, 15) + "..."
                      : product.attributes.title
                  }
                  rating={product.attributes.rating || 0}
                  brand={product.attributes.vendor.data.attributes.title || "Unknown"}
                  price={`GH₵ ${new Intl.NumberFormat().format(product.attributes.price || 0)}`}
                  oldPrice={`GH₵ ${new Intl.NumberFormat().format(product.attributes.oldPrice || 0)}`}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;


