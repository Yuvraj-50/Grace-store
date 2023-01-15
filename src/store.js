import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart-slice";
import categoriesReducer from "./features/category-slice";
import productReducer from "./features/product-slice";
import checkoutReducer from "./features/checkout-slice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    categories: categoriesReducer,
    checkout: checkoutReducer,
  },
});
