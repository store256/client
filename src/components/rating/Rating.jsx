import React, { useState } from 'react';
import { Rating, Stack } from '@mui/material';

const Ratings = () => {
  const [rating, setRating] = useState(null);

  const handleRating = (event, newValue) => {
    setRating(newValue);
    console.log(newValue);
  };

  return (
    <>
      <Stack spacing={1}>
        <Rating
          value={rating}
          onChange={handleRating}
          precision={0.5} // Allow half stars if needed
          size='large'
        />
        <p>Your Rating: {rating}</p>
      </Stack>
    </>
  );
}

export default Ratings;
