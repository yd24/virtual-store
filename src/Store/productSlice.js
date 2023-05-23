import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  {
    category: 'Electronics',
    name: 'iPhone 24',
    description: 'Newest generation iPhone for cheap, cheap, cheep.',
    price: 10000000,
    inStock: 10,
  },
  {
    category: 'Electronics',
    name: 'Samsung Galaxy 52',
    description: 'Newest generation Samsung Galaxy phone for cheap, cheap, cheep.',
    price: 1000,
    inStock: 15,
  },
  {
    category: 'Food',
    name: 'Kirk\'s Cabbage Roll',
    description: 'Gourmet dish made by a software developer.',
    price: 50,
    inStock: 30,
  },
  {
    category: 'Electronics',
    name: 'Razer Mouse',
    description: 'Newest gaming mouse.',
    price: 80,
    inStock: 25,
  }
];

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: initialProducts,
    visibleProducts: initialProducts,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.visibleProducts = state.allProducts.filter(product => product.category === action.payload);
    },
    setProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    resetProducts: (state) => {
      state.visible = state.allProducts;
    },
    default: state => state,
  }
});

export const { setActiveCategory, setProducts } = productSlice.actions;
export default productSlice.reducer;