import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  user: null,
  token: null,
  loading: true,
  error: null,
  isLoggedIn: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    const { email, password } = formData;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/login",
  async (form, { rejectWithValue }) => {
    const { name, email, password, passwordConfirm, image } = form;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);
    formData.append("image", image);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}users/signup`,
        {
          method: "POST",
          body: formData,
        }
      );

      return response.json();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    tokenLogin: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.error = null;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
      state.isLoggedIn = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // builder.addCase(login.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.token = action.payload.token;
    //   state.message = action.payload.message;
    //   state.error = null;
    // });
    // builder.addCase(login.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
    // builder.addCase(register.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.token = action.payload.token;
    //   state.user = action.payload;
  },
});

export const { tokenLogin, logout } = authSlice.actions;
