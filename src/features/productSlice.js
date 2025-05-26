import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async ({ skip }) => {
    const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    return response.data.products;
  },
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async (query) => {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
    return response.data.products;
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    status: 'idle',
    skip: 0,
    query: '',
    loading: false,
    error: null,
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
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.status = 'success';
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
        state.loading = false;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetProducts, incrementSkip, setQuery } = productSlice.actions;
export default productSlice.reducer;
