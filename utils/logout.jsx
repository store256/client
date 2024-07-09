import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const logout = () => {
const navigate =useNavigate()

useEffect(()=>{
    localStorage.setItem("user", "")
    navigate("/")
},[navigate])
  return null
}

export default logout