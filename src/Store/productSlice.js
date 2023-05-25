import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setActiveCategory } from './categorySlice';


// const initialProducts = [
//   {
//     category: 'Electronics',
//     name: 'iPhone 24',
//     description: 'Newest generation iPhone for cheap, cheap, cheep.',
//     price: 10000000,
//     inStock: 10,
//   },
//   {
//     category: 'Electronics',
//     name: 'Samsung Galaxy 52',
//     description: 'Newest generation Samsung Galaxy phone for cheap, cheap, cheep.',
//     price: 1000,
//     inStock: 15,
//   },
//   {
//     category: 'Food',
//     name: 'Kirk\'s Cabbage Roll',
//     description: 'Gourmet dish made by a software developer.',
//     price: 50,
//     inStock: 30,
//   },
//   {
//     category: 'Electronics',
//     name: 'Razer Mouse',
//     description: 'Newest gaming mouse.',
//     price: 80,
//     inStock: 25,
//   }
// ];

export const fetchProducts = createAsyncThunk(
  'products/fetch', 
  async (thunkAPI) => {
    const response = await fetch('https://api-js401.herokuapp.com/api/v1/products');
    let data = await response.json();
    return data.results;
  }
)

export const removeProductStock = createAsyncThunk(
  'products/update', async(item, { dispatch }) => {
    const response = await fetch(`https://api-js401.herokuapp.com/api/v1/products/${item.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({inStock: item.product.inStock}),
    });
    let data = await response.json();
    await dispatch(fetchProducts());
    dispatch(setActiveCategory());
  }
)

export const returnProductStock = createAsyncThunk(
  'products/update', async(item, { dispatch }) => {
    const response = await fetch(`https://api-js401.herokuapp.com/api/v1/products/${item.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({inStock: item.product.inStock + item.count}),
    });
    let data = await response.json();
    await dispatch(fetchProducts());
    dispatch(setActiveCategory());
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    visibleProducts: [],
    loading: true,
  },
  reducers: {
    decrementProduct: (state, action) => {
      let index = state.visibleProducts.findIndex(ele => ele.name === action.payload.product.name);
      state.visibleProducts[index].inStock = state.visibleProducts[index].inStock - 1;
    },
    incrementProduct: (state, action) => {
      let index = state.visibleProducts.findIndex(ele => ele.name === action.payload.product.name);
      state.visibleProducts[index].inStock = state.visibleProducts[index].inStock + action.payload.count;
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
    default: state => state,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
    })
    .addMatcher(
      (action) => action.type.endsWith('/setActiveCategory'),
      (state, action) => {
        state.visibleProducts = action.payload ? state.allProducts.filter(product => product.category === action.payload) : state.allProducts;
      }
    );
  },
});

export const { decrementProduct, incrementProduct, toggleLoading } = productSlice.actions;
export default productSlice.reducer;