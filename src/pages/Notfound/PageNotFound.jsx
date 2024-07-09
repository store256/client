import React from 'react'
import './notfound.css'
import _404 from '../../assets/images/404.png'
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
 
   <section className='notFound'>
    <div className="container-fluid">
           <div className="box">
             <h1><span className='left_4'>4</span> 0 <span className='right_4'>4</span></h1>
             <h2>Page Not Found</h2>
             <p>The link you clicked may be broken or the page may have been removed.
                  Visit the Homepage or Contact us about the problem </p>

            
            <div className="d-flex"> 
         
            <Button className='btn-g btn-lg text-capitalize m-auto'><Link to={'/'}>Back to home page  </Link></Button>
          
            </div>
           </div>
    </div>

   </section>
  
  )
}

export default PageNotFound