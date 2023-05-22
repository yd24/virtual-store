import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    activeCategory: null,
    categories: [],
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  }
});

export const { setActiveCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducers;

