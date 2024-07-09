import React, { useState, useEffect } from "react";
import "./product.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const Product = (props) => {
  const { tag, image, category, title, rating, brand, price, oldPrice } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        // Skeleton Loader
        <div className="productThumb">
          {/* Tag */}
          <Skeleton
            variant="rectangular"
            width={50}
            height={20}
            sx={{ borderRadius: 4, marginBottom: 1 }}
          />

          {/* Product Image */}
          <Skeleton
            variant="rectangular"
            width={210}
            height={200}
            sx={{ borderRadius: 8, marginBottom: 1 }}
          />

          {/* Category */}
          <Skeleton variant="text" width={100} sx={{ marginBottom: 1 }} />

          {/* Title */}
          <Skeleton variant="text" width={180} sx={{ marginBottom: 1 }} />

          {/* Rating */}
          <Skeleton variant="text" width={100} sx={{ marginBottom: 1 }} />

          {/* Brand */}
          <Skeleton variant="text" width={100} sx={{ marginBottom: 1 }} />

          {/* Price */}
          <Skeleton variant="text" width={100} sx={{ marginBottom: 1 }} />
        </div>
      ) : (
        // Actual Product Content
        <div className="productThumb">
          {tag && <span className={`badge ${tag}`}>{tag}</span>}
          <div className="imgWrapper">
            <img src={image} alt="" className="w-100 h-100" />
          </div>
          <div className="info">
            <div className="d-block catName">{category}</div>
            <h5 className="title">
              <Link to="">{title}</Link>
            </h5>
            <Rating
              name="half-rating-read"
              value={rating}
              precision={0.5}
              readOnly
            />
            <span className="brand d-block text-g">
              Brand: <Link className="text-g">{brand}</Link>
            </span>
            <div className="d-flex align-items-center mt-2">
              <div className="d-flex align-items-center">
                <span className="price text-g font-weight-bold">{price}</span>{" "}
                <span className="OldPrice">{oldPrice} </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
