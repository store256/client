import React, { useEffect, useRef, useState, useContext } from "react";
import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../../assets/images/store268.png";
import Select from "../selectDrop/Select";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import avatar from '../../assets/images/img_avatar.png';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { Button, ClickAwayListener } from "@mui/material";

import Navbar from "../nav/Navbar";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../redux/userSlice";
import { Country, State, City } from 'country-state-city';
import axios from "axios";
import { Context } from "../../../utils/Context";
import { fetchDataFromApi } from "../../../utils/api";
import Rating from "@mui/material/Rating";

const Header = (props) => {

    const headerRef = useRef();
    const searchInput = useRef();
    const totalItems = useSelector(state => state.cart.totalItems);
    const totalwishlist = useSelector(state => state.wishlist.totalItems);
    const [isopenNav, setIsOpenNav] = useState(false);
    const [isOpenDropDown, setisOpenDropDown] = useState(false);
    const [isOpenAccDropDown, setisOpenAccDropDown] = useState(false);
    const [isopenSearch, setOpenSearch] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [userDetails, setUserDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.user);
    const [region, setRegion] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] =useState(false)

    useEffect(() => {
        fetchUserDetails();
        Regions();
        getCategories();
        localStorage.setItem("selectedRegion", JSON.stringify(region));
    }, [token]);

    useEffect(() => {
        if (searchQuery) {
            fetchSearchResults(searchQuery);
        }
    }, [searchQuery]);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/users/me?populate=*`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserDetails(response.data);
        } catch (error) {
            console.log({ error });
        }
    };

    // Regions ====================================
    const Regions = () => {
        const ghanaRegions = State.getStatesOfCountry('GH');
        const formattedRegions = ghanaRegions.map(region => region.name);
        setRegion(formattedRegions);
    };

    // categories==============================

    const getCategories = () => {
        fetchDataFromApi("/categories?populate=*")
            .then((res) => {
                // console.log("API Response:", res);
                const formattedCategories = res.data.map((category) => category.attributes.title);
                setCategories(formattedCategories);
                
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    };

    // logout=============================

    const handleLogout = () => {
        dispatch(logout());
        toast.success('You are logged out', {
            hideProgressBar: true,
            position: 'bottom-right',
        });
    };


    // search result============================
    const fetchSearchResults = async (query) => {
        setLoading(true)
        try {
            const response = await fetchDataFromApi(`/products?filters[title][$contains]=${query}&populate=*`);
            setSearchResults(response.data);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching search results:", error);
            setLoading(false)
        }
    };


  


    useEffect(() => {
        window.addEventListener("scroll", () => {
            let position = window.scrollY;
            if (position > 100) {
                headerRef.current.classList.add("fixed");
            } else {
                headerRef.current.classList.remove("fixed");
            }
        });
    }, []);

    const openSearch = () => {
        setOpenSearch(true);
        searchInput.current.focus();
    };

    const closeSearch = () => {
        setOpenSearch(false);
        searchInput.current.blur();
        searchInput.current.value = "";
        setSearchQuery("");
        setSearchResults([]);
    };

    const openNav = () => {
        setIsOpenNav(true);
    };

    const closeNav = () => {
        setIsOpenNav(false);
        setisOpenAccDropDown(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearInput = () => {
        setSearchResults([]);
        setSearchQuery("");
      };


      const handleClickAway = () => {
        closeSearch();
    };

    const navigateToProduct = (productId) => {
        window.location.href = `/product/${productId}`;
      };
    return (
        <>
            <div className="headerWrapper fixed" ref={headerRef}>
                <header>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-2 part1 d-flex align-items-center">
                                <Link to={"/"}>
                                    <img src={Logo} alt="" width={140} className="logo" />
                                </Link>
                                {windowWidth < 992 && (
                                    <div className="search-toggle d-flex align-items-center">
                                        <div className="search-sm" onClick={openSearch}>
                                            <SearchIcon fontSize="large" />
                                        </div>
                                        <ul className="list list-inline mb-0 headerTab">
                                            <li className="list-inline-item search-sm">
                                                <Link to={"/cart"} className="text-decoration-none text-dark">
                                                    <span>
                                                        <ShoppingCartIcon fontSize="small" className="compare-icon" />
                                                        <span className="badge bg-g rounded-circle">{totalItems}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="navbarToggle" onClick={openNav}>
                                            <MenuIcon />
                                        </div>
                                        {!!token && (
                                            <div className="myAccDrop" onClick={() => setisOpenAccDropDown(!isOpenAccDropDown)}>
                                                <PersonOutlineOutlinedIcon fontSize="small" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="col-sm-5 part2">
                                <div className={`headerSearch d-flex align-items-center ${isopenSearch ? "open" : ""}`}>
                                    {windowWidth < 992 && (
                                        <div className="closeSearch" onClick={closeSearch}>
                                            <ArrowBackIosNewOutlinedIcon />
                                        </div>
                                    )}
                                    <Select
                                        data={categories}
                                        placeholder={"All Categories"}
                                        icon={false}
                                        link={`category`}
                                    />
                                    <div className="search">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Search for products..."
                                            ref={searchInput}
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                      

                                        {searchResults.length === 0 ? (
                                        <SearchIcon className="searchIcon cursor" />
                                                 ) : (
                                        <CloseIcon id="clearBtn" onClick={clearInput} className="searchIcon cursor"/>
                                     )}
                                    </div>

                                    {windowWidth < 992 && (
                                    searchResults && searchResults.length !== 0 && (
                                        <ClickAwayListener onClickAway={handleClickAway}>
                                        <div className="search-results result-sm pt-1">
                                            {searchResults.map((result) => (
                                            <div className="search-card" key={result.id} onClick={handleClickAway}>
                                                
                                                <div className="search-info"  onClick={() => navigateToProduct(result.id)}>
                                                    <img
                                                    src={`${import.meta.env.VITE_REACT_UPLOAD_URL}${result.attributes.img.data[0].attributes.url}`}
                                                    alt=""
                                                    className="w-100"
                                                    />
                                                    <div className="info">
                                                    <p>{result.attributes.title}</p>
                                                    <Rating
                                                        name="half-rating-read"
                                                        defaultValue={result.attributes.rating}
                                                        precision={0.5}
                                                        readOnly
                                                    />
                                                    <div className="price d-flex align-items-center">
                                                        <span className="text-g font-weight-bold">
                                                        GH₵ {result.attributes.price}
                                                        </span>
                                                        {result.attributes.oldPrice && (
                                                        <span className="OldPrice">
                                                            GH₵ {result.attributes.oldPrice}
                                                        </span>
                                                        )}
                                                    </div>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                            ))}
                                        </div>
                                        </ClickAwayListener>
                                    )
                                    )}

                                </div>
                               
                                {searchResults && searchResults.length !== 0 && (
                                     <ClickAwayListener
                                     onClickAway={handleClickAway} >
                                        
                                    <div className="search-results main pt-1">
                                        {searchResults.map((result) => (
                                            <div className="search-card" key={result.id} onClick={handleClickAway}>
                                       
                                                <div className="search-info" onClick={() => navigateToProduct(result.id)}>
                                                    <img src={import.meta.env.VITE_REACT_UPLOAD_URL + result.attributes.img.data[0].attributes.url} alt="" className="w-100" />
                                                    <div className="info ">
                                                        <p >{result.attributes.title}</p>
                                                        <Rating name="half-rating-read" defaultValue={result.attributes.rating} precision={0.5} readOnly />
                                                        <div className="price d-flex align-items-center">
                                                            <span className="text-g font-weight-bold">
                                                                GH₵ {result.attributes.price}
                                                            </span>
                                                            {result.attributes.oldPrice && (
                                                                <span className="OldPrice">
                                                                    GH₵ {result.attributes.oldPrice}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                              
                                            </div>
                                        ))}
                                        
                                    </div>
                                    
                                    </ClickAwayListener>
                                )}
                             
                            </div>

                            {/* header search bar */}

                            <div className="col-sm-5 d-flex align-items-center part3 res-hide">
                                <div className="ml-auto d-flex align-center">
                                    <div className="regionWrapper">
                                        <Select
                                            data={region}
                                            placeholder={"Your Region"}
                                            icon={
                                                <LocationOnIcon
                                                    style={{
                                                        opacity: "0.5",
                                                        fontSize: "14px",
                                                    }}
                                                />
                                            }
                                        />
                                    </div>
                                    {/* Nav items */}
                                    <ClickAwayListener
                                        onClickAway={() =>
                                            setisOpenDropDown(false)
                                        }
                                    >
                                        <ul className="list list-inline mb-0 headerTab">
                                      
                                            
                                                 
                                            <li className="list-inline-item">
                                                <Link to={'/wishlist'} className="text-dark text-decoration-none">
                                                <span>
                                                    <FavoriteBorderIcon
                                                        fontSize="small"
                                                        className="compare-icon text-warning"
                                                    />
                                                    <span className="badge bg-g  rounded-circle">
                                                    {totalwishlist}
                                                    </span>
                                                    Wishlist
                                                </span>
                                                </Link>
                                            </li>
                                           
                                        <li className="list-inline-item">
                                                <Link
                                                    to={"/cart"}
                                                    className="text-decoration-none text-dark"
                                                >
                                                    <span>
                                                        <ShoppingCartIcon
                                                            fontSize="small"
                                                            className="compare-icon text-danger"
                                                        />
                                                        <span className="badge bg-g rounded-circle">
                                                        {totalItems}
                                                        </span>
                                                        Cart
                                                    </span>
                                                </Link>
                                            </li>
                                            {!token ? (
                                            <li className="list-inline-item pl-4">
                                                <Link to={"/signin"}>
                                                    <Button className="btn-g text-capitalize" >
                                                        Sign in
                                                        <LoginIcon fontSize="small" />
                                                    </Button>
                                                </Link>
                                            </li>
                                        ) : (
                                            <li className="list-inline-item">
                                                <span
                                                    onClick={() =>
                                                        setisOpenDropDown(
                                                            !isOpenDropDown
                                                        )
                                                    }
                                                >
                                                   {
                                                 userDetails.avatarUrl ? (
                                                <img src={import.meta.env.VITE_REACT_UPLOAD_URL + userDetails.avatarUrl} alt="Profile" className="avatar" />
                                                 ) : (
                                                    <img src={avatar} alt="Avatar" class="avatar"/>  
                                                 )
                                                 }
                                                                                              
                                                    Account
                                                </span>

                                                {isOpenDropDown !== false && (
                                                    <ul className="dropdownMenu">
                                                        <li>
                                                            <Link to='/user-profile'>
                                                            <Button
                                                                className="align-item-center"
                                                                onClick={() =>
                                                                    setisOpenDropDown(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                <PersonOutlineOutlinedIcon />{" "}
                                                                My Account
                                                            </Button>{" "}
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Button
                                                                className="align-item-center"
                                                                onClick={() =>
                                                                    setisOpenDropDown(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                {" "}
                                                                <RoomOutlinedIcon />{" "}
                                                                Order Tracking
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Link to={'/wishlist'}>
                                                            <Button
                                                                className="align-item-center"
                                                                onClick={() =>
                                                                    setisOpenDropDown(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                <FavoriteBorderIcon />{" "}
                                                                WishList
                                                            </Button>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            {" "}
                                                            <Button
                                                                className="align-item-center"
                                                                onClick={() =>
                                                                    setisOpenDropDown(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                {" "}
                                                                <SettingsOutlinedIcon />{" "}
                                                                Settings
                                                            </Button>
                                                        </li>
                                                        <li onClick={() =>setisOpenDropDown(false) }>
                                                        <Link to={''}>
                                                            <Button className="align-item-center" onClick={handleLogout}>
                                                                <LogoutOutlinedIcon />
                                                                Sign Out
                                                            </Button>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                )}
                                            </li>

                                            )}
                                        </ul>
                                    </ClickAwayListener>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Navbar openNav={isopenNav} closeNav={closeNav} />
            </div>

            {/* <div className="afterheader"></div> */}

            {/* Mobile screen Account settings dropdown */}

       

            {isOpenAccDropDown !== false && 
            <>
            <div className='navbarOverlayAcc' onClick={closeNav}></div>
            <ClickAwayListener onClickAway={() => setisOpenDropDown(false)}>
                <ul className="dropdownMenuAcc dropdownMenu">
                    <li>
                        <Button
                            className="align-item-center"
                            onClick={() => setisOpenDropDown(false)}
                        >
                            <PersonOutlineOutlinedIcon />
                            
                            <Link to={'/user-profile'}> My Account</Link>
                        </Button>
                        
                    </li>
                 
                    <li>
                        <Button
                            className="align-item-center"
                            onClick={() => setisOpenDropDown(false)}
                        >
                            <ShoppingCartIcon /><Link to={'/cart'}> Cart <span className="text-danger"> ({totalItems})</span></Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            className="align-item-center"
                            onClick={() => setisOpenDropDown(false)}
                        >
                    
                            <RoomOutlinedIcon /> <Link to={'/user-profile'}>Order Tracking</Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            className="align-item-center"
                            onClick={() => setisOpenDropDown(false)}
                        >
                            <FavoriteBorderIcon /> <Link to={'/wishlist'}>WishList   <span className="text-success"> ({totalwishlist})</span></Link>
                        </Button>
                    </li>
                    <li>
                        {" "}
                        <Button
                            className="align-item-center"
                            onClick={() => setisOpenDropDown(false)}
                        >
                            {" "}
                            <SettingsOutlinedIcon /> <Link to={''}>Settings</Link>
                        </Button>
                    </li>
                    <li   onClick={() => setisOpenDropDown(false)}>

                        <Button
                            className="align-item-center"
                          onClick={handleLogout}
                          
                        >
                            <LogoutOutlinedIcon /> Sign Out
                        </Button>
                       
                    </li>
                </ul>
                </ClickAwayListener>
                </>
            }

          

            {/* Mobile screen Account settings dropdown */}
        </>
    );
};

export default Header;
