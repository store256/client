import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  products: [],
  totalItems: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.products.findIndex(item => item.id === action.payload.id);
    
      if (itemIndex !== -1) {
        // Item already exists in the cart
        state.products[itemIndex].quantity += action.payload.quantity || 1;
        toast.error("Item already exists in cart", {
          hideProgressBar: true,
          position: 'bottom-right',
        });
      } else {
        // Item doesn't exist in the cart
        state.products.push({ ...action.payload, quantity: action.payload.quantity || 1 });
        state.totalItems++;
        toast.success("One item added to cart", {
          hideProgressBar: true,
          position: 'bottom-right',
        });
      }
    },
    
    increaseItem: (state, action) => {
      const item = state.products.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseItem: (state, action) => {
      const item = state.products.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      const removedItemId = action.payload;
      state.products = state.products.filter(item => item.id !== removedItemId);
      state.totalItems--;
      toast.success("Item deleted successfully", {
        hideProgressBar: true,
        position: 'bottom-right',
      });
    },
    resetCart: (state) => {
      state.products = [];
      state.totalItems = 0;
      toast.success("Cart reset successfully", {
        hideProgressBar: true,
        position: 'bottom-right',
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateQuantity, removeItem, increaseItem, decreaseItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
