import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [],
  reducers: {
    toggleFavorite: (state, { payload }) => {
      const exists = state.find(item => item.id === payload.id);
      if (exists) {
        return state.filter(item => item.id !== payload.id);
      } else {
        state.push(payload);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
