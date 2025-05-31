/* eslint-disable curly */
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, { payload }) => {
      const found = state.find((item) => item.id === payload.id);
      if (found) {
        found.quantity += 1;
      } else {
        state.push({ ...payload, quantity: 1 });
      };
    },
    removeFromCart: (state, { payload }) => {
      return state.filter((item) => item.id !== payload);
    },
    updateQuantity: (state, { payload }) => {
      const item = state.find((p) => p.id === payload.id);
      if (item) item.quantity = payload.quantity;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
