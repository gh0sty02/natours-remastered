import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: null,
  loading: true,
};

export const getReviewByTourId = createAsyncThunk(
  "review/getTours",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}reviews/${id}`
      );

      return response.data.reviews;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    [getReviewByTourId.fulfilled]: (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
    },
    [getReviewByTourId.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
