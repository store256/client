import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import './responsive.css'
import Header from './components/header/Header'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/Index'
import List from "./pages/lisit/List";
import About from "./pages/about/About";
import Footer from "./components/footer/Footer";
import PageNotFound from "./pages/Notfound/PageNotFound";
import SingleProduct from "./pages/details/SingleProduct";
import Cart from "./pages/cart/Cart";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/signin/Signin";
import Checkout from "./pages/checkout/Checkout";
import loader from './assets/images/S268.gif'
import { useEffect, useState } from "react";
import AppContext from "../utils/Context";
import Wishlist from "./pages/wishlist/Wishlist";
import CatPage from "./pages/catPage/CatPage";
import Logout from "../utils/logout";
import { ToastContainer} from 'react-toastify';
import UserProfile from "./pages/profile/UserProfile";
import Under from "./pages/under/Under";
import VendorProducts from "./pages/vendorProducts/VendorProducts";
import PaymentDone from "./pages/donepayment/PaymentDone"
import Contact from "./pages/contact/Contact";
import ForgotPass from "./pages/signin/forgotten-password";

function App() {


   
    const [isLoading, setIsLoading] = useState(true);

  

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        
        <BrowserRouter>
        
        <AppContext>
        
            {isLoading && (
                <div className="loader">
                    <img src={loader} alt="Loading..." />
                    <p>Loading...</p>
                </div>
            )}

            {!isLoading && (
                
                <>
                  <ToastContainer/>
                    <Header />
                    <Routes>
                        <Route exact={true} path="/" element={<Home />} />
                        <Route exact={true} path="/about-us" element={<About />} />
                        <Route exact={true} path="/contact-us" element={<Contact />} />
                        <Route exact={true} path="/products" element={<List />} />
                        <Route exact={true} path="/product/:id" element={<SingleProduct />} />
                        <Route exact={true} path="/vendor/:title" element={<VendorProducts />} />
                        <Route exact={true} path="/under-300" element={<Under />} />
                        <Route exact={true} path="/category/:id" element={<CatPage />} />
                        <Route exact={true} path="/cart" element={<Cart />} />
                        <Route exact={true} path="/wishlist" element={<Wishlist />} />
                        <Route exact={true} path="/signin" element={<Signin />} />
                        <Route exact={true} path="/user-profile" element={<UserProfile />} />
                        <Route exact={true} path="/logout" element={<Logout />} />
                        <Route exact={true} path="/success-payment" element={<PaymentDone />} />
                        <Route exact={true} path="/signup" element={<Signup />} />
                        <Route exact={true} path="/checkout" element={<Checkout />} />
                        <Route exact={true} path="/forgotten-password" element={<ForgotPass />} />
                        <Route exact={true} path="*" element={<PageNotFound />} />
                    </Routes>
                    <Footer />
                </>
            )}
            </AppContext>
           
        </BrowserRouter>
      
    );
}

export default App;
