import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'categories/fetch', 
  async (thunkAPI) => {
    const response = await fetch('https://api-js401.herokuapp.com/api/v1/categories');
    let data = await response.json();
    return data.results;
  }
)

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    activeCategory: null,
    allCategories: [],
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
  extraReducers: (builder) => {
    builder
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.allCategories = action.payload;
    })
  }
});

export const { setActiveCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;

