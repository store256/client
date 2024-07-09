// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const { token} = useSelector(state => state.user);
     const navigate = useNavigate()
     useEffect(() => {
        if (!token) {
          navigate('/signin');
        }
      }, [token, navigate]);

    }

export default useAuth;
