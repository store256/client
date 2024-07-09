import axios from 'axios';
import { toast } from "react-toastify";
const API_URL =import.meta.env.VITE_REACT_APP_API_URL

// Define the headers object
const params = {
  headers:{
    Authorization: "bearer " + import.meta.env.VITE_REACT_APP_API_TOKEN,

  },
};

export const fetchDataFromApi = async (url) => {
    try {
        // Use the headers object directly in the axios request
        const { data } = await axios.get(import.meta.env.VITE_REACT_APP_API_URL + url, params);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};



export const signupToApi = async (endpoint, user) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, user);
    console.log(response)
    return response.data;
  } catch (error) {
    // Handle error
    console.log(error.response?.data?.message || 'Signup failed');
    toast.error('Incorrect email or password');
    throw error;
  }
};


export const loginToApi = async (endpoint, user) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, user);
    return response.data;
  } catch (error) {
    // Handle error

    toast.error('Incorrect email or password');
    throw error;
  }
};



export const updateUserProfile = async (token, userId, formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await axios.put(`http://195.200.14.170/api/users/${userId}`, formData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// src/utils/api.js

