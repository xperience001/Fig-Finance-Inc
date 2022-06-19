import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryServices from "./categoryServices";

const initialState = {
  categories: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllCategories = createAsyncThunk(
  "/categories",
  async (thunkAPI) => {
    try {
      return await categoryServices.getAllCategories();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.categories = null;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
