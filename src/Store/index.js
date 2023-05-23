import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';

export default configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
  },
});
