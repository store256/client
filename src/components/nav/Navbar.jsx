import React, { useContext, useEffect, useState } from 'react';
import './nav.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import { Context } from "../../../utils/Context";
import { fetchDataFromApi } from "../../../utils/api";
import { logout } from "../../redux/userSlice";
import { useDispatch, useSelector } from 'react-redux';

const Navbar = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { vendors, setVendors } = useContext(Context);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.user);

  useEffect(() => {
    getVendors();
    setIsOpenNav(props.openNav);
  }, [props.openNav]);

  const getVendors = () => {
    fetchDataFromApi('/vendors?populate=*').then(res => {
      setVendors(res.data);
    });
  };

  return (
    <>
      {isOpenNav && <div className='navbarOverlay' onClick={props.closeNav}></div>}
      <div className='nav d-flex align-items-center'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 part1 d-flex align-items-center">
              <Button className='bg-g text-white catTab res-hide'>
                <GridViewOutlinedIcon /> &nbsp; Get All items from here 
                {/* <KeyboardArrowDownIcon /> */}
              </Button>
            </div>
            <div className="col-sm-7 part2">
              <nav className={isOpenNav ? 'open' : ''}>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <Link to={'/'}>
                      <Button onClick={props.closeNav}>
                        Home
                      </Button>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to='/products'>
                      <Button onClick={props.closeNav}>
                        Shop
                      </Button>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link>
                      <Button>
                        Brands <KeyboardArrowDownIcon />
                      </Button>
                    </Link>
                    <div className="dropdown_menu">
                      <ul>
                        {vendors.map((item) => (
                          <li key={item.id}>
                            <Link to={`/vendor/${item.attributes.title}`}>
                              <Button onClick={props.closeNav}>
                                {item.attributes.title}
                              </Button>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <Link to={'/about-us'}>
                      <Button onClick={props.closeNav}>
                        About us
                      </Button>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to={'/contact-us'}>
                      <Button onClick={props.closeNav}>
                        Contacts
                      </Button>
                    </Link>
                  </li>
                </ul>
                {windowWidth < 992 && (
                  <div className="pl-3 pr-3 login-sm">
                    <Link to={'/signin'}>
                      {!token ? (
                          <Button className="btn-g text-capitalize w-100" onClick={props.closeNav}>
                          Sign in <LoginIcon fontSize="small"/>
                      </Button>
                      ) : (
                        <span></span>
                      )}
                    </Link>
                  </div>
                )}
              </nav>
            </div>
            <div className="col-sm-2 part3 d-flex align-items-center">
              <div className="phNo d-flex align-items-center ml-auto">
                <span><HeadphonesOutlinedIcon /> </span>
                <div className="info ml-3">
                  <h4 className="text-g mb-0">1900-888</h4>
                  <p className='mb-0'>24/7 support center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
