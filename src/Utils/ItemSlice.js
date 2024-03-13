import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: {
    cartItems: [],
    theme: false,
    login: true,
    isLogin: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.unshift(action.payload);
    },
    deleteToCart: (state, action) => {
      const filterItems = state.cartItems.filter((item) => {
        return item.card.info.id != action.payload.card.info.id;
      });

      state.cartItems = [];
      state.cartItems = [...filterItems];
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
    setTheme: (state) => {
      state.theme = !state.theme;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const {
  addToCart,
  deleteToCart,
  clearCart,
  setTheme,
  setLogin,
  setIsLogin,
} = itemSlice.actions;

export default itemSlice.reducer;
