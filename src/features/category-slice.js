import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    return await response.json();
  }
);

const categoriesSlice = createSlice({
  name: "caterogires",
  initialState: {
    value: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default categoriesSlice.reducer;
