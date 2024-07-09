
import React from 'react'
import './footer.css'
import Vendors from './vendors/Vendors'
import Logo from "../../assets/images/store268.png";
import BankLogo from '../../assets/bnk.jpg'
import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { Instagram, YouTube,Twitter, X } from '@mui/icons-material';


const Footer = () => {
  return (
    <div className='footerWrapper'>
        <div className="footerBox"> 
        <Vendors/>
        
          <footer >
            
            <div className="container-fluid">
              <div className="row">
              <hr className='text-secondary'/>
              <div className="row lastStrip services">
                <div className="col-md-3 d-flex part_2">
                  
                  <div className="phNo  d-flex align-items-center mx-2 service">
                            <span><HelpOutlineOutlinedIcon className='text-g '/> </span>
                            <div className="info ml-3">
                                <h4 className=" mb-0">CUSTOMER SUPPORT</h4>
                                <p className='mb-0'>Outstanding Customer Support</p>
                            </div>
                         </div>
                  </div>
                  <div className="col-md-3 d-flex part_2">
                  
                  <div className="phNo  d-flex align-items-center mx-2 service">
                            <span><TouchAppOutlinedIcon className='text-g '/> </span>
                            <div className="info ml-3">
                                <h4 className="mb-0">QUALITY PRODUCTS</h4>
                                <p className='mb-0'>3 days return policy</p>
                            </div>
                         </div>
                  </div>
                  <div className="col-md-3 d-flex part_2">
                  
                  <div className="phNo  d-flex align-items-center mx-2 service">
                            <span><LocalShippingOutlinedIcon className='text-g '/> </span>
                            <div className="info ml-3">
                                <h4 className="mb-0">FAST DELIVERY</h4>
                                <p className='mb-0'>Item delivered within 24hrs</p>
                            </div>
                         </div>
                  </div>
                  <div className="col-md-3 d-flex part_2">
                  
                  <div className="phNo  d-flex align-items-center mx-2 service">
                            <span><QuestionAnswerOutlinedIcon className='text-g '/> </span>
                            <div className="info ml-3">
                                <h4 className="mb-0">ONLINE SUPPORT</h4>
                                <p className='mb-0'>24/7 dedicated support</p>
                            </div>
                         </div>
                  </div>
              </div>
              
                <div className="col-md-3 part1">
                  <Link to='/'>
                    <img src={Logo} alt="Store logo" className='w-50'/>
                  </Link>
                  <p>Buy free for now and Pay latter</p>
                  <br />
                  <p><LocationOnOutlinedIcon/> <strong>Address: </strong> Accra, spintex</p>
                  <p><CallOutlinedIcon/><strong>Call Us:</strong> (+233)-530-564-8000</p>
                  <p><EmailOutlinedIcon/><strong> Email:</strong> info@store268.com</p>
                  <p><AccessTimeOutlinedIcon/><strong>Hours:</strong> 24/7</p>
                </div> 

                <div className="col-md-6 part2">
                  <div className="row">
                    <div className="col">
                      <h4>Company</h4>
                      <ul className="footer-list mb-sm-5 mb-md-0">
                        <li><Link to="">About Us</Link></li>
                        <li><Link to="">Privacy Policy</Link></li>
                        <li><Link to="">Terms &amp; Conditions</Link></li>
                        <li><Link to="">Contact Us</Link></li>
                        <li><Link to="">Support Center</Link></li>
                        
                      </ul>

                    </div>
                    <div className="col">
                      <h4>Account</h4>
                      <ul className="footer-list mb-sm-5 mb-md-0">
                        <li><Link to="">Sign In</Link></li>
                        <li><Link to="">View Cart</Link></li>
                        <li><Link to="">My Wishlist</Link></li>
                        <li><Link to="">Help Ticket</Link></li>
                        <li><Link to="">Shipping Details</Link></li>
                        
                      </ul>

                    </div>
                    <div className="col">
                      <h4>Cooperate</h4>
                      <ul className="footer-list mb-sm-5 mb-md-0">
                        <li><Link to="">Become a Vendor</Link></li>
                        <li><Link to="">Affiliate Program</Link></li>
                        <li><Link to="">Our Suppliers</Link></li>
                        <li><Link to="">Accessibility</Link></li>
                        <li><Link to="">Promotion</Link></li>
                       
                      </ul>

                    </div>
                    <div className="col">
                      <h4>Popular</h4>
                      <ul className="footer-list mb-sm-5 mb-md-0">
                        <li><Link to="">Iphones  13</Link></li>
                        <li><Link to="">Samsung Flip</Link></li>
                        <li><Link to="">Comfee AC</Link></li>
                        <li><Link to="">Nasco TV</Link></li>
                        <li><Link to="">Men Shoes</Link></li>
                        <li><Link to="">LenovoLaptop</Link></li>
                      </ul>

                    </div>
                  </div>

                  </div>

                  <div className="col-md-3 part3">
                    <h4>Payment Methods</h4>
                    <img src={BankLogo} alt=""  className='w-100'/>
                  </div>
              </div>

              <hr />

              <div className="row lastStrip">
                <div className="col-md-3 part_1">
                  <p>&copy;Copyright 2024. Develop by MegaWebTek Inc. All rights reserved.</p>
                </div>

                <div className="col-md-6 d-flex part_2">
                  <div className="m-auto d-flex align-items-center phWrap">
                  <div className="phNo  d-flex align-items-center mx-2">
                            <span><CallOutlinedIcon /> </span>
                            <div className="info ml-3">
                                <h4 className="text-g mb-0">1900-888</h4>
                                <p className='mb-0'>24/7 support center</p>
                            </div>
                         </div>

                         <div className="phNo  d-flex align-items-center mx-5 ">
                            <span><CallOutlinedIcon/> </span>
                            <div className="info ml-5">
                                <h4 className="text-g mb-0">1900-888</h4>
                                <p className='mb-0'>24/7 support center</p>
                            </div>
                         </div>
                  </div>
                
                </div>
                <div className="col-md-3 part3 part_3">
                  <div className="d-flex align-items-centerq">
                    <h5>Follow Us</h5>
                    <ul className="list list-inline">
                      <li className="list-inline-item">
                        <Link to={''}><Instagram/></Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to={''}><FacebookOutlinedIcon/></Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to={''}><YouTube/></Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to={''}><X/></Link>
                      </li>
                      
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
    </div>
  )
}

export default Footer