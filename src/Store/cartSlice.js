import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalCount: 0,
    totalPrice: 0,
    cartPending: false,
  },
  reducers: {
    addItem: (state, action) => {
      let index = state.cartItems.findIndex(ele => ele.id === action.payload.id);
      if (index > -1) {
        action.payload.count = state.cartItems[index].count + 1;
        state.cartItems[index] = action.payload;
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
    toggleCartPending: (state, action) => {
      state.cartPending = action.payload;
    },
    default: state => state,
  },
});

export const { addItem, removeItem, toggleCartPending } = cartSlice.actions;
export default cartSlice.reducer;