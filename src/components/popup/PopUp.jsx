import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid } from '@mui/material';

const PopUp = ({ open, handleClose, duration, description, products }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (open) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [open]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const navigateToProduct = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', backgroundColor: '#ff5722', color: 'white' }}>
        Flash Sale!
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" sx={{ textAlign: 'center', margin: '10px 0' }}>
          {description}
        </Typography>
        <Typography variant="h5" sx={{ textAlign: 'center', margin: '10px 0', color: '#ff5722',fontWeight:'700' }}>
          {formatTime(timeLeft)}
        </Typography>
        <Grid container spacing={2} justifyContent="center ">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}   onClick={() => navigateToProduct(product.id)} className='cursor'>
              <Box sx={{ textAlign: 'center', margin: '10px 0' }}>
                <img
                  src={import.meta.env.VITE_REACT_UPLOAD_URL +product.imageUrl}
                  alt={product.title}
                  style={{ width: '100%', height: 'auto' }}
                />
                <Typography variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  GH₵ {`${new Intl.NumberFormat().format(product.price || 0)}`}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
