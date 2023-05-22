import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    activeCategory: null,
    allCategories: ['Electronics', 'Food'],
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setCategories: (state, action) => {
      state.allCategories = action.payload;
    },
    default: state => state,
  },
});

export const { setActiveCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;

