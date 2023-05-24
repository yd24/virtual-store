import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalCount: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      let index = state.cartItems.findIndex(ele => ele.id === action.payload.id);
      if (index > -1) {
        state.cartItems[index].count = state.cartItems[index].count + 1;
      } else {
        state.cartItems.push(action.payload);
      }
      state.totalCount = state.totalCount + 1;
      state.totalPrice = state.totalPrice + action.payload.product.price;
    },
    removeItem: (state, action) => {
      let index = state.cartItems.findIndex(ele => ele.id === action.payload.id);
      let count = state.cartItems[index].count;
      state.cartItems.splice(index, 1);
      state.totalCount = state.totalCount - count;
      state.totalPrice = state.totalPrice - (count * action.payload.product.price);
    },
    default: state => state,
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;