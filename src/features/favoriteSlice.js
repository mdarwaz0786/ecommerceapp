import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [],
  reducers: {
    toggleFavorite: (state, { payload }) => {
      const index = state.findIndex(item => item.id === payload.id);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(payload);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
