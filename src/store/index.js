import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';
import favoriteReducer from '../features/favoriteSlice';

export default configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
  },
});
