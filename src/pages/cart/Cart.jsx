import React, { useState, useEffect } from "react";
import './cart.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from "react-redux";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { removeItem, resetCart, increaseItem, decreaseItem } from "../../redux/CartReducer";
import cart from '../../assets/images/cart.jpg';

import PaystackPop from '@paystack/inline-js'
import { PaystackButton } from 'react-paystack';
import { toast } from "react-toastify";
import axios from "axios";
const Cart = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);
    const totalItems = useSelector(state => state.cart.totalItems);
    const { user, token } = useSelector(state => state.user);
    const [showInfo, setShowInfo] = useState(false);

    const navigate =  useNavigate()
    const total = () => {
        let total = 0;
        
        products.forEach(item => {
            total += item.quantity * item.price;
        });
        return total.toFixed(2);
    };

    const plus = (itemId) => {
        dispatch(increaseItem(itemId));
    };

    const minus = (itemId) => {
        dispatch(decreaseItem(itemId));
    };



    const initPayment =async ()=>{
        if (!token) {
            navigate('/signin');
            return;
        }
    
        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: `${import.meta.env.VITE_PAYSTACK_KEY}`,
            amount: total() * 100, // Convert amount to kobo
            email: user.email,
            onSuccess: async (transaction) => {
                navigate('/success-payment')
                const message = `Payment complete. Reference: ${transaction.reference}`;
                dispatch(resetCart());
                toast.success(message, {
                    hideProgressBar: true,
                    position: 'bottom-right'
                });
    
                // Verify payment and store order details in Strapi
                await verifyPayment(transaction.reference);
            },
            onCancel() {
                toast.error("Couldn't complete payment", {
                    hideProgressBar: true,
                    position: 'bottom-right'
                });
            }
        });
    
      }


      const verifyPayment = async (paystackId) => {
        try {
            
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/orders`, {
                email: user.email,
                products, // Ensure products are defined and formatted correctly
                paystackId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
    
            console.log(response.data);
        } catch (error) {
            console.error('Error verifying payment:', error);
          
        }
    };
    

    const handleIconClick = () => {
        setShowInfo(!showInfo);
      };
      
    return (
        <>
            {
                windowWidth < 992 &&
                <div className="breadCrumbWrapper mb-4">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2">
                            <li>
                                <Link to="/" className="text-dark">Home</Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-dark">shop</Link>
                            </li>
                            <li>cart</li>
                        </ul>
                    </div>
                </div>
            }

            <section className="cartSection mb-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="d-flex align-items-center w-100">
                                <div className="left">
                                    <h3 className="cat-hd">Your Cart</h3>
                                    <p>There are <span className="text-g">({totalItems})</span> products in your cart</p>
                                </div>
                            </div>

                            <div className="cartWrapper mt-4">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {products.length > 0 ? (
                                                products.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="img">
                                                                    <img src={item.img} alt="" className="w-100" />
                                                                </div>
                                                                <div className="info pl-4">
                                                                    <Link to={''}>
                                                                        <h6>{item.title.length > 30 ? item.title.substring(0, 20) + '...' : item.title}</h6>
                                                                    </Link>
                                                                    <Rating name="half-rating-read" value={item.rating} precision={0.5} readOnly style={{ fontSize: '14px' }} />
                                                                    <span className="text-secondary">({item.rating})</span> <br />
                                                                    <h6 className="badge badge-sec">{item.size}</h6>
                                                                    <p className={`badge badge-danger ${item.color === 'white' ? 'text-dark' : 'text-white'}`} style={{ backgroundColor: item.color }}>
                                                                        {item.color}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span>{item.quantity} x GHS {new Intl.NumberFormat().format(item.price)}</span></td>
                                                        <td>
                                                            <div className="addCartSection pt-2 pb-4 d-flex align-items-center">
                                                                <div className="counterSec mr-3">
                                                                    <input type="number" value={item.quantity} readOnly />
                                                                    <span className="arrow plus" onClick={() => plus(item.id)}>
                                                                        <KeyboardArrowUpIcon />
                                                                    </span>
                                                                    <span className="arrow minus" onClick={() => minus(item.id)}>
                                                                        <KeyboardArrowDownIcon />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span>GHS {new Intl.NumberFormat().format(item.quantity * item.price)}</span></td>
                                                        <td><DeleteOutlineOutlinedIcon fontSize="medium" className="text-danger cursor" onClick={() => dispatch(removeItem(item.id))} /></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">
                                                        <img src={cart} alt="" style={{ width: '250px' }} />
                                                        <h4 style={{ fontSize: '15px' }} className="text-success">Unfortunately your Cart is Empty</h4>
                                                        <p style={{ fontSize: '12px' }}>Please Add something in your cart</p>
                                                    </td>
                                                </tr>
                                            )}

                                            <tr>
                                                <td>
                                                    <Link to={'/'}>
                                                        <Button className="btn-g text-capitalize"><KeyboardBackspaceIcon /> Continue Shopping</Button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button className="btn bg-danger text-white text-capitalize" onClick={() => dispatch(resetCart())}><DeleteOutlinedIcon className="trash" /> Clear Cart</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card p-4 cartRightBox">
                                <div className="d-flex align-items-center mb-4">
                                    <h4 className="mb-0 Subtotal">Subtotal</h4>
                                    <h5 className="subtotal-ml-auto mb-0"><span className="text-g">GHS {new Intl.NumberFormat().format(total())}</span></h5>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <h4 className="mb-0 Subtotal">Delivery</h4>
                                    <h5 className="subtotal-ml-auto mb-0"><span className="text-g">depends <InfoOutlinedIcon onClick={handleIconClick} style={{ cursor: 'pointer', color:'red' }}/></span></h5>
                                </div>
                                {showInfo && (
                                    <div className="info-box">
                                        <p>Delivery fee depends on your location and the shipping method chosen.</p>
                                    </div>
                                    )}

                                <div className="d-flex align-items-center mb-4">
                                    <h4 className="mb-0 Subtotal">Total</h4>
                                    <h5 className="subtotal-ml-auto mb-0"><span className="text-g">GHS {new Intl.NumberFormat().format(total())}</span></h5>
                                </div>
                                <Button className="btn-g text-capitalize" onClick={initPayment} ><ShoppingCartOutlinedIcon fontSize="small" /> Proceed to checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
