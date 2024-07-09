import React, { useState,useSelector } from 'react'
import PaystackPop from '@paystack/inline-js'


const Paystack = () => {
  const [email, setEmail] =useState("")
  const products = useSelector(state => state.cart.products);
 
  
  return (
    <div>Paystack</div>
  )
}

export default Paystack