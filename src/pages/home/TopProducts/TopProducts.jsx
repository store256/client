import React, { useState, useEffect } from "react";
import "./topProduct.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
const TopProducts = (props) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
   const navigate = useNavigate()
  useEffect(() => {
    
    const shuffledProducts = shuffleArray(props.products).slice(0, 2);
    setDisplayedProducts(shuffledProducts);
  }, [props.products]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="topSelling_box">
      <h4>{props.title}</h4>
      {displayedProducts.map((product) => (
        <div className="items d-flex align-items-center" key={product.id} onClick={() => navigate(`product/${product.id}`)}>
          <div className="img">
            <Link to="">
              <img src={import.meta.env.VITE_REACT_UPLOAD_URL + product.attributes.img.data[0].attributes.url} alt="" className="w-100" style={{ height: '100px' }} />
            </Link>
          </div>
          <div className="info px-3">
            <Link to="">
              <h5>{product.attributes.title}</h5>
            </Link>
            <Rating
              name="half-rating-read"
              defaultValue={product.attributes.rating}
              precision={0.5}
              readOnly
            />
            <div className="d-flex align-items-center">
              <span className="price text-g font-weight-bold">
                {`GH₵ ${new Intl.NumberFormat().format(product.attributes.price)}`}
              </span>{" "}
              <span className="OldPrice">
                {`GH₵ ${new Intl.NumberFormat().format(product.attributes.old_price) || 0}`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopProducts;
