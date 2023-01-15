import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    address: {},
    payment: {},
  },
  reducers: {
    updateAddress(state, action) {
      const { payload } = action;
      state.address = { ...state.address, ...payload };
    },
    updatePayments(state, action) {
      const { payload } = action;
      state.payment = { ...state.payment, ...payload };
    },
    clearCheckoutInformation(state, action) {
      state.address = {};
      state.payment = {};
    },
  },
});

export const { updateAddress, updatePayments, clearCheckoutInformation } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
