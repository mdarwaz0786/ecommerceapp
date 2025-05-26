import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetch', async ({ skip }) => {
  const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
  return response.data.products;
});

export const searchProducts = createAsyncThunk('products/search', async (query) => {
  const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
  return response.data.products;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    skip: 0,
    query: '',
  },
  reducers: {
    resetProducts(state) {
      state.items = [];
      state.skip = 0;
      state.query = '';
    },
    incrementSkip(state) {
      state.skip += 10;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })

      // searchProducts
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(searchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { resetProducts, incrementSkip, setQuery } = productSlice.actions;
export default productSlice.reducer;
