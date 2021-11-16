import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  loading: true,
  error: null,
};

export const getUserByUserId = createAsyncThunk(
  "user/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}users/${userId}`
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data, { rejectWithValue }) => {
    const { formData, userId } = data;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}users/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserByUserId = createAsyncThunk(
  "user/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const { form, userId } = data;

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("image", form.image);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}users/${userId}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            "x-auth-token": token,
          },
        }
      );

      return response.json();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserByUserId.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    [getUserByUserId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUserByUserId.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    [updateUserByUserId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [changePassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
