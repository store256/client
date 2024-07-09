import React, {useState, useEffect} from "react";
import '../cart/cart.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Quantitybox  from "../../components/quantityBox/Quantitybox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {resetWishlist, removeFromWishlist} from '../../redux/wishlistReducer'
import wishlist from '../../assets/images/wish.svg'



const Wishlist = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch =useDispatch()
    const navigate = useNavigate()
    const products = useSelector(state=>state.wishlist.wishlist)
    const totalItems = useSelector(state => state.wishlist.totalItems);

    console.log(products)
    return (
        <>
        {
            windowWidth < 992 &&
            <div class="breadCrumbWrapper mb-4">
            <div class="container-fluid">
                <ul class="breadcrumb breadcrumb2">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">shop</Link>
                    </li>
                    <li>Wishlist</li>
                </ul>
            </div>
        </div>
        }


<section className="cartSection mb-4">
     <div className="container-fluid">
       <div className="row">
        <div className="col-md">
        <div className="d-flex align-items-center w-100">
            <div className="left">
            <h3 className="cat-hd">Your wishlist</h3>

              <p>There are <span className="text-g">({totalItems})</span> products in your wishlist</p>
            </div>
        </div>

        <div className="cartWrapper mt-4">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Unit Price</th>

                         
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                    {products.length > 0 ? (
                    products.map((item) => (
            <tr key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
              <td className="cursor">
                <div className="d-flex align-items-center ">
                  <div className="img">
                    <img src={item.img} alt="" className="w-100" />
                  </div>
                  <div className="info pl-4">
                    <Link to={''}>
                      <h6>{item.title.length > 30 ? `${item.title.substring(0, 20)}...` : item.title}</h6>
                    </Link>
                    <Rating 
                      name="half-rating-read" 
                      value={item.rating} 
                      precision={0.5} 
                      readOnly 
                      style={{ fontSize: '14px' }} 
                    />
                    <span className="text-secondary">({item.rating})</span> <br />
                    <h6 className="badge badge-sec">{item.size}</h6>
                    <p
                      className={`badge badge-danger ${item.color === 'white' ? 'text-dark' : 'text-white'}`}
                      style={{ backgroundColor: item.color }}
                    >
                      {item.color}
                    </p>
                  </div>
                </div>
              </td>
              <td><span>{item.inputValue} x GHS {item.price}</span></td>
             
              <td><span>GHS {item.inputValue * item.price}</span></td>
              <td>
                <DeleteOutlineOutlinedIcon 
                  fontSize="medium" 
                  className="text-danger cursor" 
                  onClick={() => dispatch(removeFromWishlist(item.id))} 
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center  pt-5">
            <img src={wishlist} alt="" style={{width:'250px'}}/>
              <h4 className="text-success " style={{fontSize:'15px'}}>Unfortunately, your wishlist is Empty</h4>
              <p style={{fontSize:'12px'}}>Please add something to your cart</p>
            </td>
          </tr>
        )}
                    

                        <tr>
                            <td>
                                <Link to={'/'}>
                                <Button className="btn-g text-capitalize"><KeyboardBackspaceIcon/>  Continue Shopping</Button>
                                </Link>
                              
                            </td>

                            <td>
                         <Button className="btn bg-danger text-white text-capitalize" onClick={()=>dispatch(resetWishlist())}>  <DeleteOutlinedIcon className="trash" /> Clear Cart</Button>
                         </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        </div>

        
       </div>
     </div>
</section>

</>
    );
};

export default Wishlist
