import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  wishlist: [],
  totalItems: 0,
  totalPrice: 0
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemIndex = state.wishlist.findIndex(item => item.id === action.payload.id);
      if (itemIndex === -1) {
        state.wishlist.push(action.payload);
        state.totalItems++;
        state.totalPrice += action.payload.price; // Update total price
        toast.success('Item added to wishlist',{
          hideProgressBar:true,
          position: 'bottom-right',
        });
      } else {
        toast.error('Item already in wishlist', {
          hideProgressBar:true,
          position: 'bottom-right',
        });
      }
    },
    removeFromWishlist: (state, action) => {
      const removedItemId = action.payload;
      const itemToRemove = state.wishlist.find(item => item.id === removedItemId);
      if (itemToRemove) {
        state.wishlist = state.wishlist.filter(item => item.id !== removedItemId);
        state.totalItems--; 
        state.totalPrice -= itemToRemove.price; // Update total price
        toast.success('Item removed from wishlist',{
          hideProgressBar:true,
          position: 'bottom-right',
        });
      }
    },
    resetWishlist: (state) => {
      state.wishlist = [];
      state.totalItems = 0;
      state.totalPrice = 0; // Reset total price
      toast.success('Wishlist reset successfully',{
        hideProgressBar:true,
        position: 'bottom-right',
      });
    },
  },
});

export const { addToWishlist, removeFromWishlist, resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
