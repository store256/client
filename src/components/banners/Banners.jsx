import React, { useState, useEffect } from "react";
import "./styles.css";
import { Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import banner from "../../assets/images/small.svg";
import banner1 from "../../assets/images/small3.svg";
import banner2 from "../../assets/images/small2.svg";
import { Link } from "react-router-dom";

const Banners = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bannerSection">
      <div className="container-fluid">
        <div className="row">
          {/* Banner 1 */}
          <div className="col">
            <div className="box">
              {loading ? (
                // Skeleton Loader for Banner 1
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={200}
                  className="w-100 transition"
                />
                
              ) : (
                // Actual Banner 1
                <img src={banner} alt="" className="w-100 transition" />
              )}
              <div className="info">
                {loading ? (
                  // Skeleton Loader for Banner 1 Info
                  <Skeleton variant="text" width={200} />
                ) : (
                  // Actual Banner 1 Info
                  <p className=" mb-40">
                    <span className="ease">Ease the </span>
                    <br />
                    <span className="burden">Burden </span>
                    <br />
                    <span className="text">Spread the Cost</span>
                  </p>
                )}
              </div>
              <div className="orderBtn">
              {loading ? (
                  // Skeleton Loader for Banner 3 Info
                  <Skeleton variant="text" width={80} height={40}/>
                ) : (
                <Button
                  variant="contained"
                  className="bg-g text-white"
                  disabled={loading}
                >
                  Order Now
                </Button>
                   )}
              </div>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="col">
            <div className="box">
              {loading ? (
                // Skeleton Loader for Banner 2
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={200}
                  className="w-100 transition"
                />
              ) : (
                // Actual Banner 2
                <img src={banner1} alt="" className="w-100 transition" />
              )}
              <div className="info">
                {loading ? (
                  // Skeleton Loader for Banner 2 Info
                  <Skeleton variant="text" width={200} />
                ) : (
                  // Actual Banner 2 Info
                  <p className=" mb-40">
                    <span className="ease">Buy now </span>
                    <br />{" "}
                    <span className="burden">pay later</span> <br />
                    <span className="text">Promotion!!</span>
                  </p>
                )}
              </div>
              <div className="orderBtn1">
              {loading ? (
                  // Skeleton Loader for Banner 3 Info
                  <Skeleton variant="text" width={80} height={40}/>
                ) : (
                <Button
                  variant="contained"
                  className="bg-g text-white"
                  disabled={loading}
                >
                  Order Now
                </Button>
                   )}
              </div>
            </div>
          </div>

          {/* Banner 3 */}
          <div className="col">
            <div className="box">
              {loading ? (
                // Skeleton Loader for Banner 3
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={200}
                  className="w-100 transition"
                />
              ) : (
                // Actual Banner 3
                <img src={banner2} alt="" className="w-100 transition" />
              )}
              <div className="info">
                {loading ? (
                  // Skeleton Loader for Banner 3 Info
                  <Skeleton variant="text" width={200} />
                ) : (
                  // Actual Banner 3 Info
                  <p className=" mb-40">
                    <span className="ease"> Under </span>{" "}
                    <br />
                    <span className="burden">GHS300</span> <br />
                    <span className="text">Market sales </span>
                  </p>
                )}
              </div>
              <div className="orderBtn2">
              {loading ? (
                  // Skeleton Loader for Banner 3 Info
                  <Skeleton variant="text" width={80} height={40}/>
                ) : (
                  <Link to={'/under-300'}>
                <Button
                  variant="contained"
                  className="bg-g text-white"
                  disabled={loading}
                >
                  Order Now
                </Button>
                </Link>
                   )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
