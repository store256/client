import React from 'react';
import styled from 'styled-components';
import check from '../../assets/images/check.svg'
import { Link } from 'react-router-dom';
// Styled components for enhanced styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 150px; /* Adjust the width as needed */
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const PaymentDone = () => {
  return (
    <Container>
      <Title>Payment Successful!</Title>
      <Image src={check} alt="Success Image" />
      <p>Thank you for your purchase.</p>
      <div>
        <Link to={'/'}>
        <Button className='btn-g'>Continue Shopping</Button>
        </Link>
        <Link to={'/user-profile'}>
        <Button className='btn-g'>Track Order</Button>
        </Link>
      </div>
    </Container>
  );
};


export default PaymentDone;
