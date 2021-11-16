import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tours: null,
  tour: null,
  loading: true,
  error: null,
};

export const getAllTours = createAsyncThunk("tour/getAllTours", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}tours/`
  );
  return response.data.tours;
});
export const getTourById = createAsyncThunk("tour/getTourById", async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}tours/${id}`
  );
  return response.data.tour;
});

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllTours.fulfilled]: (state, action) => {
      state.tours = action.payload;
      state.loading = false;
    },
    [getAllTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Something went wrong";
    },
    [getTourById.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
  },
});
